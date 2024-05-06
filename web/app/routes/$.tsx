import { MetaFunction } from "@remix-run/node";

import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid
} from "@mantine/core";
import classes from "./notfound.module.css";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => [{ title: "404 Not found" }];

export default function NotFoundImage() {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src='/404.svg' className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>This page does not exist...</Title>
          <Text c='dimmed' size='lg'>
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error, feel free to contact support.
          </Text>
          <Link to='/'>
            <Button
              variant='outline'
              size='md'
              mt='xl'
              className={classes.control}
            >
              Get back to home page
            </Button>
          </Link>
        </div>
        <Image src='/404.svg' className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}
