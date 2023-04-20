import { useEffect, useMemo, useState } from 'react';
import { BehaviorSubject, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import classes from './search.module.scss';

export function Search({ onSearch }: any) {
  const [search, setSearch] = useState('');
  const search$ = useMemo(() => new BehaviorSubject(''), []);

  useEffect(() => {
    search$.next(search);
  }, [search]);

  useEffect(() => {
    const subscription = search$
			.pipe(
				debounceTime(500),
				distinctUntilChanged(),
				tap((value) => onSearch(value)),
			).subscribe();
    return () => subscription.unsubscribe();
  }, []);

  return (
		<input 
			type="search"
			placeholder="Search..."
			className={classes.searchInput}
			onChange={(event) => setSearch(event.target.value)}
			value={search} />
  );
}

export default Search;
