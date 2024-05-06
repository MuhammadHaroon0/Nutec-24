import { ActionFunction, ActionFunctionArgs, LoaderFunction, json } from "@remix-run/node";
import { commitSessionHeaders, getSession } from "~/session";

export const loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request);
  let cart = session.get("cart") || [];
  return json(cart);
};

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let kind = formData.get('kind');

  if (kind === 'addToCart') {
    let productId = formData.get('productId') as string;
    let session = await getSession(request);

    let cart = session.get('cart') || [];
    let entry = cart.find(entry => entry.productId === productId);
    if (entry) {
      entry.qty += 1;
    }
    else {
      cart.push({
        productId,
        qty: 1
      });
    }

    session.set('cart', cart);

    return json(null, await commitSessionHeaders(session));
  }

  return null;
};
