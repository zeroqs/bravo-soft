import { Container } from '@mantine/core';
import { useAsync } from '@siberiacancode/reactuse';

import type { Applications } from '@/shared/api';
import { fetchApplications } from '@/shared/api';
import { Table } from '@/shared/ui/Table/Table';
import { Header } from '@/widgets/Header/Header';

const SummaryTable = () => {
  const { data, isError, isLoading } = useAsync<Applications[]>(() =>
    fetchApplications(), []);

  return (
    <Container size={1420}>
      <Header />

      {isError && <>error</>}
      {isLoading && <>loading</>}

      {data && <Table title='Сводная таблица' data={data} />}
    </Container>
  );
};

export default SummaryTable;
