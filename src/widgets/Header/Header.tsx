import { Link } from 'react-router-dom';
import {
  Box,
  Burger,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { RoutePath } from '@/app/providers/router/config';
import { UserInfo } from '@/shared/ui/UserInfo/UserInfo';

import classes from './Header.module.css';

export const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box pb={20}>
      <header className={classes.header}>
        <Group justify='space-between' h='100%'>
          <Text component={Link} to={`${RoutePath.home}`}>BravoSoft</Text>

          <Group h='100%' gap={0} visibleFrom='sm'>
            <Text component={Link} to={`${RoutePath.applicationForm}`} className={classes.link}>
              Форма для заявки
            </Text>
            <Text component={Link} to={`${RoutePath.summaryTable}`} className={classes.link}>
              Сводная таблица
            </Text>
          </Group>

          <Group visibleFrom='sm'>
            <UserInfo />
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom='sm' />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size='100%'
        padding='md'
        title='Navigation'
        hiddenFrom='sm'
        zIndex={1000000}
      >
        <ScrollArea h='calc(100vh - 80px' mx='-md'>
          <Divider my='sm' />

          <a href='#' className={classes.link}>
            Форма для заявки
          </a>
          <a href='#' className={classes.link}>
            Сводная таблица
          </a>

          <Divider my='sm' />

          <Group justify='center' grow pb='xl' px='md'>
            <UserInfo />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};
