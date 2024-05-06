// import { Button, Group, Text } from "@mantine/core";
import { LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { IconHeart, IconShoppingBag } from "@tabler/icons-react";
import { callApi } from "apiconn";
import { Header } from "~/components/Header";
import { protectGetToken } from "~/utils";

import {
  Button,
  Container,
  Flex,
  Grid,
  GridCol,
  Group,
  Image,
  NumberInput,
  Stack,
  Text
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

export const loader: LoaderFunction = async ({ request, params }) => {
  let token = await protectGetToken(request);

  const id = params["id"];

  let res = await callApi(request, {
    url: "/products/" + id
  });

  return res.data.data.data;
};

export default function Products() {
  let product = useLoaderData<typeof loader>();
  const fetcher = useFetcher({ key: "mutate-cart" });

  return (
    <>
      <Header />
      <div className='px-16 pt-10'>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={7}>
            <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 25 }}>
              <Grid.Col span={12}>
                <Image radius='md' src={product.image} />
              </Grid.Col>
              {/* <Grid.Col span={6}>
                <Image
                  radius='md'
                  src='https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg'
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Image
                  radius='md'
                  src='https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg'
                />
              </Grid.Col> */}
            </Grid>
          </Grid.Col>
          <Grid.Col span={5}>
            <Stack gap='lg'>
              <Group justify='space-between' mb='md'>
                <Text className='text-base  md:text-3xl'>{product.name}</Text>
                <Text className='text-base  md:text-3xl'>
                  Rs {product.price}
                </Text>
              </Group>
              <Stack gap='sm'>
                <Text className='text-xl font-medium'>Description</Text>
                <Text className='text-lg' c='gray' mt={10}>
                  {product.Description}
                </Text>
                <Text className='text-lg' c='gray' mt={10}>
                  Looking to stock your closet? The Basic tee also comes in a
                  3-pack or 5-pack at a bundle discount.
                </Text>
              </Stack>
              <NumberInput
                label='Quantity'
                value={1}
                readOnly
                size='lg'
                min={1}
              />
              <fetcher.Form method='POST' action='/api/get-cart'>
                <input type='hidden' name='kind' value='addToCart' />
                <input type='hidden' name='productId' value={product.id} />
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
              {/* <Button color='gray' size='lg'>
                Add to Wishlist
              </Button> */}
            </Stack>
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
}

export function Product() {
  return (
    <div className='px-16 pt-10'>
      <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
        <Grid.Col span={7}>
          <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 25 }}>
            <Grid.Col span={12}>
              <Image
                radius='md'
                src='https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg'
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Image
                radius='md'
                src='https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg'
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Image
                radius='md'
                src='https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg'
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={5}>
          <Stack gap='lg'>
            <Group justify='space-between' mb='md'>
              <Text className='text-base  md:text-3xl'>Basic Tee</Text>
              <Text className='text-base  md:text-3xl'>$35</Text>
            </Group>
            <Stack gap='sm'>
              <Text className='text-xl font-medium'>Description</Text>
              <Text className='text-lg' c='gray' mt={10}>
                The Basic tee is an honest new take on a classic. The tee uses
                super soft, pre-shrunk cotton for true comfort and a dependable
                fit. They are hand cut and sewn locally, with a special dye
                technique that gives each tee it's own look.
              </Text>
              <Text className='text-lg' c='gray' mt={10}>
                Looking to stock your closet? The Basic tee also comes in a
                3-pack or 5-pack at a bundle discount.
              </Text>
            </Stack>
            <NumberInput label='Quantity' placeholder='0' size='lg' min={0} />
            <Button color='cyan' size='lg'>
              Add to Card
            </Button>
            <Button color='gray' size='lg'>
              Add to Wishlist
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </div>
  );
}
