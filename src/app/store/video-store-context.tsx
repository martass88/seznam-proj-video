import { createContext, useContext, useRef } from 'react';
import { createVideoStore } from './video-store';
 
export type VideoStore = ReturnType<typeof createVideoStore>;
 
export const VideoStoreContext = createContext({} as VideoStore);
 
export function useVideoStore() {
  return useContext(VideoStoreContext);
}
 
export function useCreateVideoStore() {
  const storeRef = useRef<VideoStore>();
  if (storeRef.current === undefined) {
    storeRef.current = createVideoStore();
  }

  const store = storeRef.current;
  return store;
}
