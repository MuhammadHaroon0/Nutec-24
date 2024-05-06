import {
  Menu,
  Button,
} from "@mantine/core";
import { IconBellFilled } from "@tabler/icons-react";

export function NotificationsButton() {

  return (
    <Menu
      shadow='md'
      styles={{ dropdown: { minWidth: 200 } }}
      position='bottom-end'
      offset={0}
    >
      <Menu.Target>
        <Button variant='subtle' color='yellow' px='sm'>
          <IconBellFilled />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {/* <Menu.Item> */}
          {/* <Notification title='We notify you that'> */}

          {/* </Notification> */}
        {/* </Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  );
}
