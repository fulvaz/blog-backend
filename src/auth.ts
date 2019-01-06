import passport from "koa-passport";
import { AuthError } from "./middlewares/error-handler";
import { resolve, reject } from "bluebird";

export async function authByToken(ctx, next) {
  const authPaths = [
    { path: "/article", method: "POST" },
    { path: "/article", method: "DELETE" },
    { path: "/article", method: "PUT" }
  ];

  const ifNeedAuth = authPaths.find(e => {
    return e.method === ctx.request.method && e.path === ctx.request.url;
  });

  if (!ifNeedAuth) {
    await next();
  } else {
    await auth(ctx, next);
    await next();
  }
}

function auth(ctx, next) {
  return new Promise((resolve, reject) => {
    passport.authenticate("bearer", (err, userId, info, status) => {
      if (userId) {
        ctx.state.userId = userId;
        resolve();
      } else {
        ctx.body = "";
        // TODO: 应该有多种提示
        reject(new AuthError("invalid user"));
      }
    })(ctx, next);
  });
}
