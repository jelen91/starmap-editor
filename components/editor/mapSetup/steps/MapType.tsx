import { styled, Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { SettingsItemWrapper } from '../../../../layout/components/SettingsItemWrapper';
import {
  BackgroundImages,
  MapTypes,
  updateMapInfo,
} from '../../../../store/features/starmap/mapInfoSlice';
import { useAppDispatch, useMapInfo } from '../../../../store/store';

const MapType = () => {
  const dispatch = useAppDispatch();
  const { background } = useMapInfo();

  const selectType = (mapType: MapTypes) => {
    const backgrounds = BackgroundImages[mapType];
    dispatch(
      updateMapInfo({
        mapType,
        // not every background exists for every map type
        background: backgrounds.includes(background)
          ? background
          : backgrounds[0],
      })
    );
  };

  return (
    <SettingsItemWrapper>
      <Typography align="center" variant="subtitle1" sx={{ marginBottom: 2 }}>
        VYBERTE TYP MAPY
      </Typography>
      <SettingsWrapper>
        <ImgWrapper onClick={() => selectType(MapTypes.classic)}>
          <Image
            src="/img/classicPreview.jpg"
            alt="Klasická mapa"
            width={130}
            height={196}
          />
        </ImgWrapper>
        <ImgWrapper onClick={() => selectType(MapTypes.twoCircles)}>
          <Image
            src="/img/twoCirclesPreview.jpg"
            alt="Mapa s fotografií"
            width={196}
            height={130}
          />
        </ImgWrapper>
      </SettingsWrapper>
    </SettingsItemWrapper>
  );
};

export default MapType;

const ImgWrapper = styled('div')(({ theme: $ }) => ({
  margin: $.spacing(0, 3, 3, 3),
  cursor: 'pointer',
  transition: ' all .2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const SettingsWrapper = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
