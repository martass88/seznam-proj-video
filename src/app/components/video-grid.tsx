
import classes from './video-grid.module.scss';
import { IVideo } from '../store/model';
import VideoItem from './video-item';
import { useVideoStore } from '../store/video-store-context';
import { useEffect } from 'react';
import { useObservable } from '../utils/observable-utils';

export function VideoGrid() {
	
	const { data, state, actions } = useVideoStore();
	const videos = useObservable<IVideo[]>(state.filteredVideos);
	const req = useObservable(data.fetchRequest$);

	useEffect(() => {
		actions.fetchVideos();
	}, [actions])

	if (videos.length) { 
		return (
			<div className={classes.grid}>
				{videos.map(video => <VideoItem video={video} key={video.uid} />)}
			</div>
		);
	}

	return <div className={classes.noData}>No video has been found.</div>;
}

export default VideoGrid;
