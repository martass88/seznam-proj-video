import { Fragment } from 'react';
import classes from './higlight-search.module.scss';

export default function HiglightSearch({ text, searchTerm }: { text: string, searchTerm: string }) {
	const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  return (
		<>
			{parts.map((part, index) => (
				<Fragment key={index}>
					{part.toLowerCase() === searchTerm.toLowerCase() ? (
						<span className={classes.higlight}>{part}</span>
					) : part}
				</Fragment>
			))}
		</>
	);
}
