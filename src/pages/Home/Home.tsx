import { Container } from '@mantine/core';
import { useAsync } from '@siberiacancode/reactuse';

import { useAuth } from '@/app/providers/auth/hooks';
import type { Applications } from '@/shared/api';
import { fetchUserApplications } from '@/shared/api';
import { Table } from '@/shared/ui/Table/Table';
import { Header } from '@/widgets/Header/Header';

const Home = () => {
  const { user } = useAuth();

  const { data, isError, isLoading } = useAsync<Applications[]>(() =>
    fetchUserApplications(user!.id), []);

  return (
    <Container size={1420}>
      <Header />

      {isError && <div>Произошла ошибка</div>}

      {isLoading && <div>Загрузка...</div>}

      {data && <Table data={data} />}

    </Container>
  );
};

export default Home;
