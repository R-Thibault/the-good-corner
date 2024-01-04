import Cookies from "cookies";
import { AuthChecker } from "type-graphql";
import jwt from "jsonwebtoken";
import { User } from "./entities/User";

export type ContextType = {
  req: any;
  res: any;
  user?: User;
};

export const customAuthChecker: AuthChecker<ContextType> = async (
  { root, args, context, info },
  roles
) => {
  // Read user from context
  // and check the user's permission against the `roles` argument
  // that comes from the '@Authorized' decorator, eg. ["ADMIN", "MODERATOR"]

  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token");
  if (!token) {
    console.error("Can't find token");
    return false;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "secret");
    if (typeof payload === "object" && "userId" in payload) {
      const user = await User.findOneBy({ id: payload.userId });
      if (user !== null) {
        context.user = Object.assign(user, { hashedPassword: undefined });
        return true;
      } else {
        console.error("invalid token");
        return false;
      }
    } else {
      console.error("invalid token");
      return false;
    }
  } catch {
    console.error("invalid token");
    return false;
  }
};
