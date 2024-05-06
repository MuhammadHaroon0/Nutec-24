import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { destroySessionHeaders, getSession } from "~/session";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request);
  return redirect("/", await destroySessionHeaders(session));
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);
  return redirect("/", await destroySessionHeaders(session));
}
