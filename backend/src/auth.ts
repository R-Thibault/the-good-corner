import Cookies from "cookies";
import { AuthChecker } from "type-graphql";
import jwt from "jsonwebtoken";
import { User } from "./entities/User";

export type ContextType = {
  req: any;
  res: any;
  user?: User;
  role?: string[];
};

export async function getUserFromReq(req: any, res: any): Promise<User | null> {
  // may be recalled if called on field
  const cookies = new Cookies(req, res);
  const token = cookies.get("token");

  if (!token) {
    console.error("missing token");
    return null;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "supersecret");

    if (typeof payload === "object" && "userId" in payload) {
      const user = await User.findOneBy({ id: payload.userId });

      if (user !== null) {
        return Object.assign(user, { hashedPassword: undefined });
      } else {
        console.error("user not found");
        return null;
      }
    } else {
      console.error("invalid token, msising userid");
      return null;
    }
  } catch {
    console.error("invalid token");
    return null;
  }
}

export const customAuthChecker: AuthChecker<ContextType> = async (
  { root, args, context, info },
  roles: string[]
) => {
  // Read user from context
  // and check the user's permission against the `roles` argument
  // that comes from the '@Authorized' decorator, eg. ["ADMIN", "MODERATOR"]

  const connectedUser = await getUserFromReq(context.req, context.res);

  if (connectedUser) {
    if (roles.length === 0 || roles.includes(connectedUser.role)) {
      context.user = connectedUser;
      return true;
    } else {
      console.error("invalid token");
      return false;
    }
  } else {
    return false;
  }
  // const cookies = new Cookies(context.req, context.res);
  // const token = cookies.get("token");
  // if (!token) {
  //   console.error("Can't find token");
  //   return false;
  // }

  // try {
  //   const payload = jwt.verify(token, process.env.JWT_SECRET || "secret");
  //   if (typeof payload === "object" && "userId" in payload) {
  //     const user = await User.findOneBy({ id: payload.userId });
  //     if (user !== null) {
  //       if (roles.length === 0 || roles.includes(user.role)) {
  //         context.user = Object.assign(user, { hashedPassword: undefined });
  //         return true;
  //       } else {
  //         console.error("invalid token");
  //         return false;
  //       }
  //     } else {
  //       console.error("invalid token");
  //       return false;
  //     }
  //   } else {
  //     console.error("invalid token");
  //     return false;
  //   }
  // } catch {
  //   console.error("invalid token");
  //   return false;
  // }
};
