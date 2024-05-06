import { Button, Group, Text } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData } from "@remix-run/react";
import { IconHeart, IconShoppingBag } from "@tabler/icons-react";
import { callApi } from "apiconn";
import { Header } from "~/components/Header";
import { commitSessionHeaders, getSession } from "~/session";
import { protectGetToken } from "~/utils";

export const loader: LoaderFunction = async ({ request, params }) => {
  let token = await protectGetToken(request);
  let category = params['category'];

  let res = await callApi(request, {
    url: "/products"
  });

  let data = res.data.data;

  let list = data.products;

  return category ? list.filter(pr => pr.category === category) : list;
};

// export const action: ActionFunction = async ({ request }) => {
//   let formData = await request.formData();
//   let kind = formData.get('kind');

//   if (kind === 'addToCart') {
//     let productId = formData.get('productId') as string;
//     // let qty = +(formData.get('qty') as string);
//     let session = await getSession(request);

//     let cart = session.get('cart') || [];
//     let entry = cart.find(entry => entry.productId === productId);
//     if (entry) {
//       entry.qty += 1;
//     }
//     else {
//       cart.push({
//         productId,
//         qty: 1
//       });
//     }

//     session.set('cart', cart);

//     return json(null, await commitSessionHeaders(session));
//   }

//   return null;
// };

export default function Products() {
  let products = useLoaderData<typeof loader>();
  const fetcher = useFetcher({ key: 'mutate-cart' });

  return (
    <>
      <Header />
      <div className='mx-auto max-w-2xl lg:max-w-7xl !pt-10 px-8'>
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {products.map(product => (
            <div key={product.id} className='relative'>
              <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none hover:opacity-75 lg:h-80'>
                <img
                  // src='https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'
                  src={product.image}
                  className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                />
              </div>
              <div className='mt-4 flex justify-between'>
                <div>
                  <h3 className='text-sm text-gray-700'>
                    <Link to={`/product/${product.id}`}>
                      <span aria-hidden='true' className='absolute inset-0' />
                      {product.name}
                    </Link>
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    {product.category}
                  </p>
                </div>
                <p className='text-sm font-medium text-gray-900'>
                  Rs. {product.price}
                </p>
              </div>
              <fetcher.Form method='POST' action="/api/get-cart">
                <input type="hidden" name="kind" value="addToCart" />
                <input type="hidden" name="productId" value={product.id} />
                <Button
                  type='submit'
                  onClick={() => {
                    notifications.show({ message: "Added to cart" });
                  }}
                  fullWidth
                  mt='md'
                >
                  <IconShoppingBag className='mr-2' />
                  Add to Cart
                </Button>
              </fetcher.Form>
              <Group mt='md'>
                <Button
                  onClick={() => {
                    notifications.show({ message: "Added to wishlist" });
                  }}
                  color='pink'
                  variant='light'
                  fullWidth
                >
                  <IconHeart className='mr-2' />
                  Add to Wishlist
                </Button>
              </Group>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
