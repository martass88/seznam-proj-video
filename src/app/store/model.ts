export interface IVideo {
  name: string;
  shortName: string;
  iconUri: string;
  manifestUri: string;
  source: string;
  focus: boolean;
  disabled: boolean;
  extraText?: (IExtraTextEntity | null)[] | null;
  certificateUri?: null;
  description?: string | null;
  isFeatured: boolean;
  drm?: string[] | null;
  features?: string[] | null;
  licenseServers: Record<string, string | null>;
  licenseRequestHeaders: Record<string, string | null>;
  requestFilter?: null;
  responseFilter?: null;
  clearKeys: Record<string, string | null>;
  extraConfig?: Record<string, any | null>;
  adTagUri?: string | null;
  imaVideoId?: string | null;
  imaAssetKey?: string | null;
  imaContentSrcId?: number | null;
  mimeType?: null;
  mediaPlaylistFullMimeType?: string | null;
  storedProgress: number;
  storedContent?: IStoredContent | null;
	uid?: string; // UI purposes only
}

export interface IExtraTextEntity {
  uri: string;
  language: string;
  kind: string;
  mime: string;
}

export interface IStoredContent {
  offlineUri: string;
  originalManifestUri: string;
  duration: number;
  size: number;
  expiration?: null;
  tracks?: TracksEntity[] | null;
  appMetadata: IAppMetadata;
  isIncomplete: boolean;
}

export interface TracksEntity {
  id: number;
  active: boolean;
  type: string;
  bandwidth: number;
  language: string;
  label?: string | null;
  kind?: null;
  width: number;
  height: number;
  frameRate?: number | null;
  pixelAspectRatio?: null;
  hdr?: null;
  mimeType: string;
  audioMimeType: string;
  videoMimeType: string;
  codecs: string;
  audioCodec: string;
  videoCodec: string;
  primary: boolean;
  roles?: null[] | null;
  audioRoles?: null[] | null;
  forced: boolean;
  videoId: number;
  audioId: number;
  channelsCount?: null;
  audioSamplingRate?: null;
  spatialAudio: boolean;
  tilesLayout?: null;
  audioBandwidth?: null;
  videoBandwidth?: null;
  originalVideoId?: number | null;
  originalAudioId: string | number;
  originalTextId?: null;
  originalImageId?: null;
}

export interface IAppMetadata {
  identifier: string;
  downloaded: string;
}
