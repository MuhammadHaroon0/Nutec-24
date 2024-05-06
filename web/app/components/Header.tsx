import clsx from "clsx";
import {
  IconBox,
  IconChevronDown,
  IconHeart,
  IconLayoutDashboard,
  IconListDetails,
  IconMenu2,
  IconSearch,
  IconShoppingCart,
  IconTimeDuration15
} from "@tabler/icons-react";
import { Box, Group, Paper, Stack, Text } from "@mantine/core";
import { Link, useFetcher, useFetchers } from "@remix-run/react";
import { useEffect, useState } from "react";
import { usePrevious } from "@mantine/hooks";
// import { Footer } from "./Footer";

function TopStrip() {
  return (
    <div className='hidden border-b border-x-grey-2 md:block'>
      <div className='app-container flex py-2 text-sm text-x-grey-1'>
        <div className='-mx-2 flex flex-1 items-center divide-x-2 font-semibold [&>*]:px-2'>
          <Link to='/init' className='hover:underline'>
            Login
          </Link>
        </div>

        <p className='flex-1 text-center font-semibold'>100% secure delivery</p>

        <div className='-mx-2 flex flex-1 items-center justify-end divide-x-2 [&>*]:px-2'>
          <Link to='/logout' className='hover:underline'>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

function SearchBox({ className = "" }) {
  return (
    <div
      className={clsx(
        "flex items-center overflow-hidden rounded-md border-2 border-[#BCE3C9] shadow-sm",
        className
      )}
    >
      <input
        className='flex-1 px-4 py-3.5 outline-none'
        size={1}
        placeholder='Search for items...'
      />
      <IconSearch className='mr-3 text-x-grey-1' size={19} />
    </div>
  );
}

function HeaderDesktop({ cartCount }) {
  return (
    <>
      <TopStrip />
      <div className='hidden border-b border-x-grey-2 py-8 md:block'>
        <div className='app-container flex items-center flex-wrap gap-y-2'>
          {/* Logo */}
          {/* <img src='/logo.svg' className='w-52' /> */}
          <Link to='/'>
            <Paper bg='green' py='xs' px='md' radius='lg' shadow='lg'>
              <Group c='white' gap='xs'>
                <IconTimeDuration15 />
                <Text fw='bold' fs='italic'>
                  Artisans Avenue
                </Text>
              </Group>
            </Paper>
          </Link>
          {/* Input */}
          <SearchBox className='ml-4 mr-4 shrink-0 min-w-[18rem] max-w-[36rem] flex-1 wl:ml-10 lg:ml-16' />
          {/*  */}
          <Link to="/cart" className='btn ml-auto px-3 py-2.5 active:scale-95'>
            <IconShoppingCart size={24} />
            <p className='leading-0 font-bold'>Cart ({cartCount})</p>
          </Link>
          <button className='btn ml-3 px-3 py-2.5 active:scale-95'>
            <IconHeart size={24} />
            <p className='leading-0 font-bold'>Wishlist</p>
          </button>
          <button className='btn ml-3 px-3 py-2.5 active:scale-95'>
            <IconBox size={24} />
            <p className='leading-0 font-bold'>Favourites</p>
          </button>
          <button className='btn ml-3 px-3 py-2.5 active:scale-95'>
            <IconListDetails size={24} />
            <p className='leading-0 font-bold'>Listings</p>
          </button>
        </div>
      </div>
      <MenuBar />
    </>
  );
}

function MenuButton({ label, href }) {
  return (
    <Link
      to={href}
      className='tc group flex items-center gap-x-1 whitespace-nowrap py-2 font-semibold hover:text-x-orange-1'
    >
      {label}
    </Link>
  );
}

function MenuBar() {
  return (
    <div className='sticky top-0 z-50 hidden border-b border-x-grey-2 bg-white md:block'>
      <div className='app-container flex flex-wrap'>
        <Link
          to='/products'
          className={clsx(
            "btn btn-scale my-4 mr-6 shrink-0 self-center lg:mr-16 2xl:mr-32"
          )}
        >
          <IconLayoutDashboard className='shrink-0' />
          View All Products
        </Link>

        <div className='flex gap-x-6 lg:gap-x-8'>
          <MenuButton href='/' label='Home' />
          <MenuButton href='/products' label='Shop' />
          <MenuButton href='/products/pottery' label='Pottery' />
          <MenuButton href='/products/jewelry' label='Jewelry' />
          <MenuButton href='/products/paintings' label='Paintings' />
        </div>
      </div>
    </div>
  );
}

function HeaderMobile({ cartCount }) {
  return (
    <>
      <div className='block bg-x-green-1 py-1.5 text-center font-bold text-white shadow-md md:hidden'>
        100% secure delivery
      </div>
      <div className='flex items-center border-b border-x-grey-2 px-4 py-4 md:hidden'>
        <button className='tc rounded p-2 hover:bg-x-green-1/10 active:bg-x-green-1/10'>
          <IconMenu2 />
        </button>
        {/* <img src='/logo.svg' className='ml-4 w-32' /> */}
        <Paper bg='green' py='xs' px='md' radius='lg' shadow='lg'>
          <Group c='white' gap='xs'>
            <IconTimeDuration15 />
            <Text fw='bold' fs='italic'>
              Artisans Avenue
            </Text>
          </Group>
        </Paper>
        <button className='tc group ml-auto flex items-center rounded p-2 hover:bg-x-green-1/10 active:bg-x-green-1/10 '>
          <IconShoppingCart
            size={28}
            className='tc group-hover:text-x-green-1'
          />
          <span className='ml-1 text-lg font-bold text-x-green-1'>(4)</span>
        </button>
      </div>
      <div className='w-full md:hidden block px-4 mt-4'>
        <SearchBox />
      </div>
    </>
  );
}

export function Header() {
  const cartFetcher = useFetcher({ key: "mutate-cart" });
  useEffect(() => {
    if (cartFetcher.state === "idle") {
      cartFetcher.load("/api/get-cart");
    }
  }, [cartFetcher]);

  let cartCountSession = ((cartFetcher.data as any[]) || []).reduce(
    (acc, item) => {
      return acc + item.qty;
    },
    0
  );

  let cartCountPrev = usePrevious(cartCountSession);

  let cartCount =
    cartFetcher.state === "idle" ? cartCountSession : cartCountPrev;

  return (
    <>
      <HeaderDesktop cartCount={cartCount} />
      <HeaderMobile cartCount={cartCount} />
    </>
  );
}
