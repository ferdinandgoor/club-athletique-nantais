import type { PropsWithChildren } from 'react';
import './Container.scss';

export function Container({ children }: PropsWithChildren) {
  return <div className="container">{children}</div>;
}
