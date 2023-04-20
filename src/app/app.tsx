import { useCreateVideoStore, VideoStoreContext } from './store/video-store-context';
import VideoGrid from './components/video-grid';
import Layout from './components/layout';
import VideoPlayer from './components/video-player';

export default function App() {
	const store = useCreateVideoStore();
	
  return (
		<VideoStoreContext.Provider value={store}>
			<Layout>
        <VideoGrid />
      </Layout>
			<VideoPlayer />
		</VideoStoreContext.Provider>
  );
}
