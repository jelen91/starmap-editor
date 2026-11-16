import React, { useEffect } from 'react';
import { updateConfig } from '../../../../store/features/starmap/configSlice';
import { MapTypes } from '../../../../store/features/starmap/mapInfoSlice';
import {
  useAppDispatch,
  useMapConfig,
  useMapInfo,
} from '../../../../store/store';
import Classic from './Classic';
import TwoCircles from './TwoCircles';

// backgrounds that already contain a drawn circle for the sky
const BACKGROUNDS_WITH_OWN_CIRCLE = [
  'editorBackground4',
  'editorBackground5',
  'editorBackground19',
];

const Starmap: React.FC = () => {
  const mapInfo = useMapInfo();
  const mapConfig = useMapConfig();
  const dispatch = useAppDispatch();
  const { mapType, background, isWhite } = mapInfo;

  useEffect(() => {
    const transparent =
      isWhite || BACKGROUNDS_WITH_OWN_CIRCLE.includes(background);
    dispatch(
      updateConfig({
        background: {
          ...mapConfig.background,
          fill: transparent ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.1)',
          stroke: transparent ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.5)',
        },
      })
    );
  }, [isWhite, background]);

  return mapType === MapTypes.twoCircles ? (
    <TwoCircles mapInfo={mapInfo} />
  ) : (
    <Classic mapInfo={mapInfo} />
  );
};

export default Starmap;
