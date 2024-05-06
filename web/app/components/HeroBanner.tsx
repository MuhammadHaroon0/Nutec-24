import { Title, Text, Container, Button, Overlay } from "@mantine/core";
import classes from "./HeroBanner.module.css";
import { Link } from "@remix-run/react";

export function HeroBanner() {
  return (
    <div className={classes.wrapper}>
      <Overlay color='#000' opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>Artisans Avenue </Title>

        <Container size={640}>
          <Text size='lg' className={classes.description}>
            Explore a diverse range of artisanal and industry-made products at
            Artisans Avenue, blending tradition with modern convenience.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Link to='/products'>
            <Button
              className={classes.control}
              variant='white'
              color='cyan'
              size='lg'
            >
              Shop now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
