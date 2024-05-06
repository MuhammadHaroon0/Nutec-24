// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

type SessionData = {
  token: string;
  cart: {
    productId: string;
    qty: number;
  }[]
};

// const { getSession, commitSession, destroySession } =
const cookieSession = createCookieSessionStorage<SessionData, {}>({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: "__session"

    // Expires can also be set (although maxAge overrides it when used in combination).
    // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
    //
    // expires: new Date(Date.now() + 60_000),
    // httpOnly: true,
    // maxAge: 60,
    // path: "/",
    // sameSite: "lax",
    // secrets: ["s3cret1"],
    // secure: true,
  }
});

export type Session = Awaited<ReturnType<typeof cookieSession.getSession>>;

export function getSession(request: Request) {
  return cookieSession.getSession(request.headers.get("Cookie"));
}

export async function commitSessionHeaders(session: Session) {
  return {
    headers: {
      "Set-Cookie": await cookieSession.commitSession(session)
    }
  };
}

export async function destroySessionHeaders(session: Session) {
  return {
    headers: {
      "Set-Cookie": await cookieSession.destroySession(session)
    }
  };
}


// export { getSession, commitSession, destroySession };
