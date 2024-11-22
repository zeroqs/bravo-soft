import type { FC, ReactNode } from 'react';

import type { ProviderProps } from '@/shared/types';

interface Props {
  wrappers: FC<ProviderProps>[]
  render: () => ReactNode
}

export const WrapperComposer = ({ wrappers, render }: Props) => {
  const composedWrapper = wrappers.reduceRight((acc, Wrapper) => {
    return <Wrapper>{acc}</Wrapper>;
  }, render());

  return <>{composedWrapper}</>;
};
