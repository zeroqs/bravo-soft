import { MantineProvider } from '@mantine/core';

import type { ProviderProps } from '@/shared/types';

import '@mantine/core/styles.css';

export const MantineWrapper = ({ children }: ProviderProps) => {
  return <MantineProvider>{children}</MantineProvider>;
};
