import { useToggle, upperFirst } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  ButtonProps
} from "@mantine/core";
import { Form, Link, useFetcher } from "@remix-run/react";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect
} from "@remix-run/node";
import { commitSessionHeaders, getSession } from "~/session";
import { callApi } from "apiconn";
import { Header } from "~/components/Header";

async function login(request: Request, email: string, password: string) {
  // email = "sadiqharoon227@gmail.com";
  // password = "Abcd123!";

  try {
    let res = await callApi(request, {
      url: "/users/login",
      method: "POST",
      data: {
        email,
        password
      },
      timeout: 5000
    });

    return res.data?.token;
  } catch (e) {
    return null;
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);

  if (session.has("token")) {
    return redirect("/products");
  }

  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  const token = await login(request, email, password);

  if (!token) {
    return {
      error: "Invalid username or password"
    };
  }

  let session = await getSession(request);
  session.set("token", token);

  return redirect("/products", await commitSessionHeaders(session));
}

export default function Login(props: PaperProps) {
  const fetcher = useFetcher<typeof action>();
  let error = (fetcher.state === "idle" && fetcher.data?.error) || null;

  return (
    <>
      <Header />
      <div className='max-w-lg mx-auto mt-20 mb-32 p-4'>
        <Paper p='xl' shadow='lg' withBorder {...props}>
          <Text size='lg' fw={500}>
            Welcome to App, login with
          </Text>

          <Group grow mb='md' mt='md'>
            <GoogleButton radius='xl'>Google</GoogleButton>
          </Group>

          <Divider
            label='Or continue with email'
            labelPosition='center'
            my='lg'
          />

          <fetcher.Form method='post'>
            <Stack>
              {error && (
                <Text c='red' fw='semibold'>
                  {error}
                </Text>
              )}

              <TextInput
                name='email'
                required
                label='Email'
                placeholder='hello@mantine.dev'
              />

              <PasswordInput
                name='password'
                required
                label='Password'
                placeholder='Your password'
              />

              {/* <Checkbox label='I accept terms and conditions' /> */}
            </Stack>

            <Group justify='space-between' mt='xl'>
              <Anchor component={Link} to='/register' c='dimmed' size='xs'>
                Don't have an account? Register
              </Anchor>
              <Button
                loading={fetcher.state !== "idle"}
                color='green'
                type='submit'
                radius='xl'
              >
                Login
              </Button>
            </Group>
          </fetcher.Form>
        </Paper>
      </div>
    </>
  );
}

/* =============== */

function GoogleIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMidYMid'
      viewBox='0 0 256 262'
      style={{ width: "0.9rem", height: "0.9rem" }}
      {...props}
    >
      <path
        fill='#4285F4'
        d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'
      />
      <path
        fill='#34A853'
        d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'
      />
      <path
        fill='#FBBC05'
        d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782'
      />
      <path
        fill='#EB4335'
        d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'
      />
    </svg>
  );
}

function GoogleButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return <Button leftSection={<GoogleIcon />} variant='default' {...props} />;
}
