import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession } from "./session";

export async function protectGetToken(request: Request) {
  const session = await getSession(request);

  if (!session.has("token")) {
    // Redirect to the home page if they are already signed in.
    throw redirect("/login");
  }

  return session.get("token") as string;
}

export const protectLoader: LoaderFunction = async ({ request }) => await protectGetToken(request);
