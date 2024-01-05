import { MiddlewareFn } from "type-graphql";
import { ContextType } from "./auth";

export const emailDisplay: MiddlewareFn<ContextType> = (
  { root, context, info },
  next
) => {
  const user = context || "guest";
  console.log(root);
  return root;
};
