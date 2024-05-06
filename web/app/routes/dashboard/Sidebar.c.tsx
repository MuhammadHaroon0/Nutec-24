import { Group, rem } from "@mantine/core";
import { IconLock, IconLiveView } from "@tabler/icons-react";

import { Box, ThemeIcon, UnstyledButton } from "@mantine/core";
import classes from "./NavbarLinksGroup.module.css";
import { Link } from "@remix-run/react";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  to: string;
  adminOnly?: boolean;
}

export function LinksGroup({
  icon: Icon,
  adminOnly,
  label,
  to
}: LinksGroupProps) {
  // const role = useRole();
  // const isAdmin = role === "Admin";
  // if (adminOnly && !isAdmin) return null;

  return (
    <Link className='no-underline' to={to}>
      <UnstyledButton className={classes.control}>
        <Group justify='space-between' gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon color='cyan' variant='light' size={48}>
              <Icon style={{ width: rem(24), height: rem(24) }} />
            </ThemeIcon>
            <Box ml='md' fw={600}>
              {label}
            </Box>
          </Box>
        </Group>
      </UnstyledButton>
    </Link>
  );
}

const data = [
  { label: "Analytics", icon: IconLiveView, to: "/dashboard/analytics" },
  {
    label: "Users",
    icon: IconLock,
    to: "/dashboard/users"
  },
  { label: "Products", icon: IconLiveView, to: "/dashboard/users" },
  {
    label: "Orders",
    icon: IconLiveView,
    to: "/dashboard/users"
  }
];

export function Sidebar() {
  return data.map(item => <LinksGroup {...item} key={item.label} />);
}
