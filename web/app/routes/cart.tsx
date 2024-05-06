// import { useNumberInput } from "@chakra-ui/react";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IconBasket, IconMinus, IconPlus } from "@tabler/icons-react";
import { callApi } from "apiconn";
import clsx from "clsx";
import { Header } from "~/components/Header";
import { getSession } from "~/session";

export const loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request);
  let cart = session.get("cart") || [];

  let loaded = [];
  for (let i = 0; i < cart.length; ++i) {
    let product = cart[i];
    let res = await callApi(request, {
      url: ("/products/" + product.productId) as any
    });

    loaded.push({
      qty: product.qty,
      ...res.data.data.data
    } as any);
  }

  return loaded;
};

function ProductRow({ product }) {
  return (
    <tr>
      <td className='px-4 py-6'>
        <div className='flex w-max items-center gap-6'>
          <div className='w-24 shrink-0'>
            <img
              // src='/product-slider-1.jpg'
              src={product.image}
              className='h-full w-full object-contain'
            />
          </div>
          <div>
            <p className='max-w-[300px] text-wrap text-lg font-bold text-[#333] xl:max-w-[400px]'>
              {/* Seeds of Change Organic Quinoa, Brown */}
              {product.name}
            </p>
            <button
              type='button'
              className='mt-4 text-sm font-semibold text-red-400 hover:underline'
            >
              {/* Remove */}
            </button>
          </div>
        </div>
      </td>
      <td className='px-4 py-6'>
        <div className='flex gap-x-1'>
          {/* <button className='btn yellow aspect-square p-2.5'>
            <IconMinus size={16} stroke={4} />
          </button> */}
          <p
            className={clsx(
              "flex aspect-square w-12 items-center justify-center rounded border-2 font-poppins text-md font-medium"
            )}
          >
            {product.qty}
          </p>
          {/* <button className='btn aspect-square p-2.5'>
            <IconPlus size={16} stroke={4} />
          </button> */}
        </div>
      </td>
      <td className='px-4 py-6'>
        <h4 className='text-lg font-bold text-[#333]'>
          Rs. {product.price * product.qty}
        </h4>
      </td>
    </tr>
  );
}

function CartTable({ products }) {
  return (
    <table className='mt-6 w-full border-collapse divide-y'>
      <thead className='whitespace-nowrap text-left'>
        <tr>
          <th className='tedxt-[#333] p-4 text-base'>Description</th>
          <th className='tedxt-[#333] p-4 text-base'>Quantity</th>
          <th className='texdt-[#333] p-4 text-base'>Price</th>
        </tr>
      </thead>
      <tbody className='divide-y whitespace-nowrap'>
        {products.map(product => (
          <ProductRow key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
}

function CartSummary({ products }) {
  let subtotal = products.reduce((acc, product) => {
    return acc + product.price * product.qty;
  }, 0);

  return (
    <>
      <h3 className='border-b pb-4 text-xl font-extrabold text-[#333]'>
        Order Summary
      </h3>
      <ul className='mt-6 divide-y text-md font-medium text-x-head'>
        <li className='flex flex-wrap gap-4 py-4'>
          <span>Subtotal</span>
          <span className='ml-auto text-lg font-bold'>Rs. {subtotal}</span>
        </li>
        <li className='flex flex-wrap gap-4 py-4'>
          <span>Tax</span>
          <span className='ml-auto text-lg font-bold'>Rs. 100</span>
        </li>
        <li className='flex flex-wrap gap-4 py-4 font-black text-x-green-1'>
          <span>Total</span>
          <span className='ml-auto text-lg'>Rs. {subtotal + 100}</span>
        </li>
      </ul>
      <button className='btn mt-6 w-full'>
        <IconBasket />
        Proceed to Checkout
      </button>
    </>
  );
}

export default function CartView() {
  const products = useLoaderData<typeof loader>();
  return (
    <>
      <Header />
      <div className='app-container mt-12'>
        <h2 className='text-4.5xl font-bold text-x-head'>Your Cart</h2>
        <h2 className='mt-4 font-medium text-x-head'>
          There are <span className='font-bold text-x-green-1'>{products.length}</span> items in
          your cart
        </h2>

        <div className='mb-10 mt-4 grid ll:grid-cols-3'>
          <div className='overflow-x-auto bg-white lg:col-span-2'>
            <CartTable products={products} />
          </div>
          <div className='bg-gray-50 p-10'>
            <CartSummary products={products} />
          </div>
        </div>

        {/* <CartContents /> */}
      </div>
    </>
  );
}
