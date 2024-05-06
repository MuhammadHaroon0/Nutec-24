import { LoaderFunctionArgs, redirect, json } from "@remix-run/node";
import { getSession } from "~/session";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);

  if (session.has("token")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/products");
  }

  return redirect("/login");
}
