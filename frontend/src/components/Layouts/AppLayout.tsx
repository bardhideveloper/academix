import type { PropsWithChildren } from 'react';
import NavBar from '../Navbar/Navbar';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <NavBar />
      <div className="container">{children}</div>
    </>
  );
}
