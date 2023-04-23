import { BiPlayCircle } from 'react-icons/bi';
import classes from './video-item.module.scss';
import { IVideo } from '../store/model';
import { useVideoStore } from '../store/video-store-context';
import { useObservable } from '../utils/observable-utils';
import HiglightSearch from './higlight-search';

export default function VideoItem({ video }: { video: IVideo }) {
	const { state, actions } = useVideoStore();
	const searchTerm = useObservable(state.searchTerm);

  return (
    <div
			className={classes.item}
			style={{backgroundImage: `url(${video.iconUri})`}}
			onClick={() => actions.setSelectedVideo(video)}>
			<h2>{searchTerm ? <HiglightSearch text={video.name} searchTerm={searchTerm}></HiglightSearch> : video.name}</h2>
			<BiPlayCircle className={classes.playIcon} />
		</div>
  );
}
