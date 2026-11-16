import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum MapTypes {
  classic = 'classic',
  twoCircles = 'twoCircles',
}

export enum Fonts {
  Oswald = 'Oswald',
  HandWritting = 'Dancing Script',
  PtSans = 'PT Sans',
  TwinkleStar = 'Twinkle Star',
  Anton = 'Anton',
  Joan = 'Joan',
  Lobster = 'Lobster',
  Roboto = 'Roboto',
  Ubuntu = 'Ubuntu',
}

const DEFAULT_BACKGROUND = '#0d0d18';

const bg = (...numbers: number[]) =>
  numbers.map((n) => `editorBackground${n}`);

export const BackgroundImages: Record<MapTypes, string[]> = {
  [MapTypes.classic]: [
    DEFAULT_BACKGROUND,
    ...bg(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20),
  ],
  [MapTypes.twoCircles]: [
    DEFAULT_BACKGROUND,
    ...bg(1, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20),
  ],
};

export interface OtherConfig {
  timeOnMap: Date;
  mapType: MapTypes;
  imgUrl?: string;
  title: string;
  uppercase: boolean;
  font: Fonts;
  place: string;
  lat: string;
  lng: string;
  showDate: boolean;
  showPlace: boolean;
  showTime: boolean;
  showCoords: boolean;
  background: string;
  frame: boolean;
  isWhite: boolean;
  lastLine: boolean;
}

const otherConfig: OtherConfig = {
  timeOnMap: new Date(),
  mapType: MapTypes.classic,
  imgUrl: undefined,
  title: 'Zadejte váš nadpis',
  uppercase: true,
  font: Fonts.Oswald,
  place: 'Praha',
  lat: '50.0755381',
  lng: '14.4378005',
  showDate: true,
  showPlace: true,
  showTime: true,
  showCoords: true,
  background: DEFAULT_BACKGROUND,
  frame: true,
  isWhite: false,
  lastLine: false,
};

export const mapInfoInitialState = { otherConfig };

export const mapInfoSlice = createSlice({
  name: 'mapInfo',
  initialState: mapInfoInitialState,
  reducers: {
    // merges the given fields into the current map info
    updateMapInfo: (state, action: PayloadAction<Partial<OtherConfig>>) => {
      state.otherConfig = { ...state.otherConfig, ...action.payload };
    },
  },
});

export const { updateMapInfo } = mapInfoSlice.actions;

export default mapInfoSlice.reducer;
