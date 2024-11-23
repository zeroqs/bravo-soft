import { useState } from 'react';
import { ScrollArea, Table as MantineTable, Text, Title } from '@mantine/core';
import cx from 'clsx';

import type { Applications } from '@/shared/api';

import classes from './Table.module.css';

interface Props {
  data: Applications[]
}

export const Table = ({ data }: Props) => {
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <MantineTable.Tr key={row.documentName}>
      <MantineTable.Td>{row.documentName}</MantineTable.Td>
      <MantineTable.Td>{row.userIds.length}</MantineTable.Td>
    </MantineTable.Tr>
  ));

  return (
    <>
      <Title size='h3' pb={20} pl={10}>Ваши заявки</Title>

      <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <MantineTable miw={700}>
          <MantineTable.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <MantineTable.Tr>
              <MantineTable.Th>Название документа</MantineTable.Th>
              <MantineTable.Th>Количество конструкторов</MantineTable.Th>
            </MantineTable.Tr>
          </MantineTable.Thead>
          <MantineTable.Tbody>{rows}</MantineTable.Tbody>
        </MantineTable>
      </ScrollArea>
    </>
  );
};