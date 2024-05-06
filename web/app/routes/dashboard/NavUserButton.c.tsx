import { Menu, Button, rem, Avatar, Text, Group, Paper } from "@mantine/core";
import { Form, Link } from "@remix-run/react";
import {
  IconChevronDown,
  IconChevronRight,
  IconSettings
} from "@tabler/icons-react";
import { IconLogout } from "@tabler/icons-react";

export function NavUserButton() {
  // const user = useAppSelector(state => state.auth.user);
  const user: any = null;
  const imagePath = user?.profileImage?.url;

  // const url = imagePath ? imageUrl(imagePath) : null;
  const url = null;
  const initials = user?.userName.substring(0, 2)?.toUpperCase();

  return (
    <Menu
      shadow='md'
      styles={{ dropdown: { minWidth: 200 } }}
      position='bottom-end'
      offset={0}
    >
      <Menu.Target>
        <Button
          variant='subtle'
          // color='purple'
          h='100%'
          px='sm'
          rightSection={<IconChevronDown />}
        >
          <Avatar src={url} radius='xl'>
            {initials}
          </Avatar>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          <Avatar src={url} size={80} radius={120} mx='auto'>
            {initials}
          </Avatar>
          <Text ta='center' fz='lg' fw={500} mt='sm'>
            {user?.userName}
          </Text>
          <Text ta='center' c='dimmed' fz='sm'>
            {user?.email}
          </Text>
        </Menu.Item>
        <Menu.Divider />
        {/* <Menu.Label>Application</Menu.Label> */}
        {/* <Menu.Item
          component={Link}
          to='/dashboard/user-settings'
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Settings
        </Menu.Item> */}

        {/* <Menu.Divider /> */}

        <Menu.Label>Account</Menu.Label>
        <Form action="/logout" method="POST">
          <Menu.Item
            color='red'
            // component={Button}
            // to='/logout'
            type='submit'
            leftSection={
              <IconLogout style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Logout
          </Menu.Item>
        </Form>
      </Menu.Dropdown>
    </Menu>
  );
}
