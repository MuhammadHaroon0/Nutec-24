import {
  AppShell,
  Burger,
  Group,
  ScrollArea,
  Space,
  ActionIcon,
  rem,
  useMantineColorScheme,
  Divider
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { NavUserButton } from "./dashboard/NavUserButton.c";
import { IconMoon } from "@tabler/icons-react";
import { IconSunHigh } from "@tabler/icons-react";
import { useCallback } from "react";
import { Sidebar } from "./dashboard/Sidebar.c";
import { Outlet } from "react-router-dom";
import { protectLoader } from "~/utils";
import { NotificationsButton } from "./dashboard/NotificationsButton.c";

export const loader = protectLoader;

function ThemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const setLight = useCallback(() => setColorScheme("light"), []);
  const setDark = useCallback(() => setColorScheme("dark"), []);

  const onClick =
    colorScheme === "dark" ? setLight : setDark;

  let IconComponent = colorScheme === "dark" ? IconSunHigh : IconMoon;

  return (
    <ActionIcon onClick={onClick} size={42} variant='default' radius='xl'>
      <IconComponent style={{ width: rem(24), height: rem(24) }} />
    </ActionIcon>
  );
}

export default function Dashboard() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: { base: 250, md: 300 },
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }
      }}
      padding='md'
    >
      <AppShell.Header>
        <Group h='100%' px='md'>
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom='sm'
            size='sm'
          />
          <Burger
            opened={false}
            onClick={toggleDesktop}
            visibleFrom='sm'
            size='sm'
          />
          <Space className='grow' />
          <NotificationsButton />
          <Divider orientation="vertical" my="sm" />
          <NavUserButton />
          <Divider orientation="vertical" my="sm" />
          <ThemeToggle />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        {/* <AppShell.Section>Navbar header</AppShell.Section> */}
        <AppShell.Section grow my='md' component={ScrollArea}>
          <Sidebar />
        </AppShell.Section>
        {/* <AppShell.Section> */}
          {/* Navbar footer - always at the bottom */}
        {/* </AppShell.Section> */}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
        {/* Hello */}
      </AppShell.Main>
    </AppShell>
  );
}
