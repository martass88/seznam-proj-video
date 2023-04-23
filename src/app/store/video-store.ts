import {
  BehaviorSubject,
  combineLatest,
  switchMap,
  map,
  shareReplay,
  Subject,
	catchError,
	EMPTY,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { nanoid } from 'nanoid';
import { IVideo } from './model';
import { withInitialValue } from '../utils/observable-utils';

export type FetchStatus = 'IDLE' | 'FETCHING' | 'FETCHED' | 'ERROR';
export type Sort = 'NAME_ASC' | 'NAME_DESC';

const VIDEO_API_URL =
  'https://gist.githubusercontent.com/nextsux/f6e0327857c88caedd2dab13affb72c1/raw/04441487d90a0a05831835413f5942d58026d321/videos.json';

export function createVideoStore() {
  const allVideos$ = new Subject<IVideo[]>();

  const fetchVideosEvent$ = new Subject<void>();
	const fetchVideosStatus$ = new BehaviorSubject<FetchStatus>('IDLE');

  fetchVideosEvent$.pipe(
		tap(() => fetchVideosStatus$.next('FETCHING')),
    switchMap(() => fromFetch(VIDEO_API_URL)),
    switchMap((response) => {
			if (response.ok) {
				return response.json();
			}

			fetchVideosStatus$.next('ERROR');
			return EMPTY;
		}),
    tap((videos: IVideo[]) => {
      const videosWithIds: IVideo[] = videos.map((video) => ({
        ...video,
        uid: nanoid(),
      }));
			fetchVideosStatus$.next('FETCHED');
      allVideos$.next(videosWithIds);
    }),
		catchError(() => {
			fetchVideosStatus$.next('ERROR');
			return EMPTY;
		}),
  ).subscribe();

  const setSortEvent$ = new BehaviorSubject<Sort>('NAME_ASC');
  const sort$ = setSortEvent$.asObservable();

  const setsearchTermEvent$ = new BehaviorSubject<string>('');
  const searchTerm$ = setsearchTermEvent$.asObservable();

  const setSelectedVideoEvent$ = new BehaviorSubject<IVideo | null>(null);
  const selectedVideo$ = setSelectedVideoEvent$.asObservable();

  const filteredVideos$: Observable<IVideo[]> = combineLatest([
    allVideos$,
    sort$,
    searchTerm$,
  ]).pipe(
    map(([allVideos, sort, searchTerm]) => {
      const filtered: IVideo[] = [...allVideos].filter((video: IVideo) =>
        video.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
      const sorted: IVideo[] = filtered.sort((a, b) =>
        sort === 'NAME_ASC'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
      return sorted;
    }),
    shareReplay(1)
  );

  return {
    state: {
      fetchVideosStatus: withInitialValue(fetchVideosStatus$, 'IDLE'),
      filteredVideos: withInitialValue(filteredVideos$, [] as IVideo[]),
      sort: withInitialValue(sort$, 'NAME_ASC'),
      searchTerm: withInitialValue(searchTerm$, ''),
      selectedVideo: withInitialValue(selectedVideo$, null),
    },
    actions: {
      fetchVideos: () => fetchVideosEvent$.next(),
      setSort: (sort: Sort) => setSortEvent$.next(sort),
      setsearchTerm: (query: string) => setsearchTermEvent$.next(query),
      setSelectedVideo: (video: IVideo | null) => setSelectedVideoEvent$.next(video),
    },
  };
}
