import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import starconfigReducer from './features/starmap/configSlice';
import mapInfoReducer from './features/starmap/mapInfoSlice';

export const store = configureStore({
  reducer: {
    starconfig: starconfigReducer,
    mapInfo: mapInfoReducer,
  },
  // mapInfo.timeOnMap is a Date object
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useMapInfo = () => useAppSelector((s) => s.mapInfo.otherConfig);
export const useMapConfig = () => useAppSelector((s) => s.starconfig.config);
