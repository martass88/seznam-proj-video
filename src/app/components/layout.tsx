import { ReactNode } from 'react';
import FilterBar from './filter-bar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
			<FilterBar></FilterBar>
      {children}
		</>
  );
}
