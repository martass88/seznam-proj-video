import classes from './video-player.module.scss';
import { RiCloseFill } from 'react-icons/ri';
import { useVideoStore } from '../store/video-store-context';
import { useObservable } from '../utils/observable-utils';
import ReactPlayer from 'react-player';

export default function VideoPlayer() {
	const { state, actions } = useVideoStore();
  const video = useObservable(state.selectedVideo);
	const handleCloseClick = () => actions.setSelectedVideo(null);

  return (
    <div className={classes.videoPortal} style={{ display: video ? 'initial' : 'none' }}>
			{ video?.manifestUri ? 
				<ReactPlayer url={video?.manifestUri} controls={true} playing={true} width="100%" height="100%"/> :
				<div>Video can't be played</div>
			}

			<button onClick={handleCloseClick}>
				<RiCloseFill />
			</button>
		</div>
	)
}
