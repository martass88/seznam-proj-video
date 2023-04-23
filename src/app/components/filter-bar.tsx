
import classes from './filter-bar.module.scss';
import { BiSortAZ, BiSortZA } from 'react-icons/bi';
import Search from './search';
import { useVideoStore } from '../store/video-store-context';
import { useObservable } from '../utils/observable-utils';

export default function FilterBar() {
	const { state, actions } = useVideoStore();
  const sort = useObservable(state.sort);

	const handleSortClick = () => actions.setSort(sort === 'NAME_ASC' ? 'NAME_DESC' : 'NAME_ASC');

  return (
    <header className={classes.bar}>
			<Search onSearch={(term: string) => actions.setsearchTerm(term)} />
			<button onClick={handleSortClick}>
				{sort === 'NAME_ASC' ? <BiSortAZ /> : <BiSortZA />}
			</button>
    </header>
  );
}
