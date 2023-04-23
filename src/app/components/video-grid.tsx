
import classes from './video-grid.module.scss';
import { IVideo } from '../store/model';
import VideoItem from './video-item';
import { useVideoStore } from '../store/video-store-context';
import { useEffect } from 'react';
import { useObservable } from '../utils/observable-utils';
import { FetchStatus } from '../store/video-store';
import { PuffLoader } from 'react-spinners';

export default function VideoGrid() {
	const { state, actions } = useVideoStore();
	const videos = useObservable<IVideo[]>(state.filteredVideos);
	const fetchStatus = useObservable<FetchStatus>(state.fetchVideosStatus);
	const searchTerm = useObservable<string>(state.searchTerm);	

	useEffect(() => {
		actions.fetchVideos();
	}, [actions])

	if (fetchStatus === 'FETCHING') {
		return <PuffLoader className={classes.loader} size="200px" />;
	}

	if (fetchStatus === 'ERROR') {
		return <div className={classes.noData}>Server error has occured. Data can't be loaded from the server now.</div>;
	}

	if (fetchStatus === 'FETCHED' && searchTerm && !videos.length) {
		return <div className={classes.noData}>No video has been found.</div>;
	}

	return (
		<div className={classes.grid}>
			{videos.map(video => <VideoItem video={video} key={video.uid} />)}
		</div>
	);
}
