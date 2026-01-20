import type { PropsWithChildren } from 'react';
import NavBar from '../NavBar/NavBar';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <NavBar />
      <div className="container">{children}</div>
    </>
  );
}
