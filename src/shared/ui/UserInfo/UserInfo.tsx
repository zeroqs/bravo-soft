import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core';

import { useAuth } from '@/app/providers/auth/hooks';

import classes from './UserInfo.module.css';

export const UserInfo = () => {
  const { user, logout } = useAuth();

  return (
    <Menu
      transitionProps={{ transition: 'pop-top-right' }}
      position='top-end'
      width={220}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar
              src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png'
              radius='xl'
            />

            <div style={{ flex: 1 }}>
              <Text size='sm' fw={500}>
                {user?.name}
              </Text>

              <Text c='dimmed' size='xs'>
                {user?.email}
              </Text>
            </div>

          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={logout}>
          Выйти
        </Menu.Item>

      </Menu.Dropdown>
    </Menu>
  );
};
