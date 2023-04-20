import classes from './video-item.module.scss';
import { IVideo } from '../store/model';
import { BiPlayCircle } from 'react-icons/bi';
import { useVideoStore } from '../store/video-store-context';

export default function VideoItem({ video }: { video: IVideo }) {
	const { actions } = useVideoStore();

  return (
    <div
			className={classes.item}
			style={{backgroundImage: `url(${video.iconUri})`}}
			onClick={() => actions.setSelectedVideo(video)}>
			<h2>{video.name}</h2>
			<BiPlayCircle className={classes.playIcon} />
		</div>
  );
}
