import React, { useRef, useEffect, useState } from 'react';
import Map from '../celestial/Map';
import { styled } from '@mui/material';
import {
  OtherConfig,
  updateMapInfo,
} from '../../../../store/features/starmap/mapInfoSlice';
import { EditorTitle } from '../../../../layout/components/EditorTexts';
import { getDate, getTime } from '../../../../layout/formatDate';
import { theme } from '../../../../layout/theme';
import { useAppDispatch } from '../../../../store/store';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';

interface ClassicProps {
  mapInfo: OtherConfig;
}

const Classic: React.FC<ClassicProps> = ({ mapInfo }) => {
  const ref = useRef<any>(null);
  const dispatch = useAppDispatch();
  const windowSizes = useWindowDimensions();
  const [mapHeightTransform, setMapHeightTransform] = useState(
    windowSizes.height * 0.0012
  );

  const isLastLine = () => {
    if (windowSizes.width > 899 && ref?.current?.clientHeight > 94) {
      return true;
    }
    if (windowSizes.width < 900 && ref?.current?.clientHeight > 54) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(updateMapInfo({ lastLine: isLastLine() }));
  }, [ref?.current?.clientHeight]);

  useEffect(() => {
    if (windowSizes.width > 899) {
      setMapHeightTransform(windowSizes.height * 0.0012);
    }
  }, [windowSizes.height]);

  return (
    <Paper
      sx={{
        transform: `scale(${
          windowSizes.width > 899 ? mapHeightTransform : 0.9
        })`,
        display: 'flex',
        alignSelf: 'center',
        background: mapInfo.background.includes('#')
          ? mapInfo.background
          : `url(/img/editorDesigns/${mapInfo.background}.jpg)`,
        backgroundSize: 'cover',
        ' &::after': {
          visibility: mapInfo.frame ? 'visible' : 'hidden',
          borderColor: mapInfo.isWhite
            ? theme.palette.primary.dark
            : theme.palette.primary.light,
        },
      }}
      id="WholeMapWrapper"
    >
      {mapInfo.isWhite && <BackgroundHelper src="/img/whiteLayer.png" />}
      <MapWrapper>
        <Map />
      </MapWrapper>
      <TextWrapper sx={{ bottom: isLastLine() ? '15.5%' : '' }}>
        <StyledEditorTitle
          ref={ref}
          sx={{
            fontFamily: mapInfo.font,
            whiteSpace: 'pre-line',
            color: mapInfo.isWhite
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
          }}
        >
          {mapInfo.uppercase ? mapInfo.title?.toUpperCase() : mapInfo.title}
        </StyledEditorTitle>
      </TextWrapper>
      <BottomTextWrapper>
        <StyledBottomText
          sx={{
            fontFamily: mapInfo.font,
            color: mapInfo.isWhite
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
          }}
        >
          {mapInfo.showPlace
            ? mapInfo.uppercase
              ? mapInfo.place.toUpperCase()
              : mapInfo.place
            : ''}
        </StyledBottomText>
        <StyledBottomText
          sx={{
            fontFamily: mapInfo.font,
            color: mapInfo.isWhite
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
          }}
        ></StyledBottomText>
        <StyledBottomText
          sx={{
            fontFamily: mapInfo.font,
            color: mapInfo.isWhite
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
          }}
        >
          {`${mapInfo.showDate ? getDate(mapInfo.timeOnMap) : ''} ${
            mapInfo.showTime ? getTime(mapInfo.timeOnMap) : ''
          }`}
        </StyledBottomText>
        <StyledBottomText
          sx={{
            fontFamily: mapInfo.font,
            color: mapInfo.isWhite
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
          }}
        >
          {mapInfo.showCoords &&
            `${String(mapInfo.lat).substring(0, 10)}°N ${"  "} ${String(
              mapInfo.lng
            ).substring(0, 10)}°E`}
        </StyledBottomText>
      </BottomTextWrapper>
    </Paper>
  );
};

export default Classic;

const Paper = styled('div')(({ theme: $ }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '500px',
  height: '700px',
  boxShadow: 'rgb(0, 0, 0) 0px 20px 30px -10px',
  flexDirection: 'column',
  margin: $.spacing(2),
  ' &::after': {
    position: 'absolute',
    width: '450px',
    height: '650px',
    content: '""',
    border: '1px solid white',
  },
  [$.breakpoints.down('md')]: {
    width: '300px',
    height: '420px',
    margin: '10px',
    ' &::after': {
      width: '274px',
      height: '394px',
    },
  },
}));

const MapWrapper = styled('div')(({ theme: $ }) => ({
  position: 'relative',
  bottom: '9.6%',
  margin: '6%',
  [$.breakpoints.down('md')]: {
    top: '14%',
  },
}));

const TextWrapper = styled('div')(({ theme: $ }) => ({
  width: '420px',
  textAlign: 'center',
  position: 'absolute',
  bottom: '19%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  [$.breakpoints.up('lg')]: {},
  [$.breakpoints.down('md')]: {
    width: '230px',
  },
}));

const BottomTextWrapper = styled('div')(({ theme: $ }) => ({
  width: '430px',
  textAlign: 'center',
  position: 'absolute',
  bottom: '5%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  [$.breakpoints.up('lg')]: {},
  [$.breakpoints.down('md')]: {
    width: '230px',
  },
}));

const StyledEditorTitle = styled(EditorTitle)(({ theme: $ }) => ({
  fontSize: 25,
  lineHeight: 1.2,
  [$.breakpoints.down('md')]: {
    fontSize: 15,
  },
}));

const StyledBottomText = styled(EditorTitle)(({ theme: $ }) => ({
  fontSize: 17,
  lineHeight: 1.2,
  [$.breakpoints.down('md')]: {
    fontSize: 9,
  },
}));

const BackgroundHelper = styled('img')(({ theme: $ }) => ({
  position: 'absolute',
  height: '700px',
  width: '500px',
  zIndex: 0,
  [$.breakpoints.down('md')]: {
    width: '300px',
    height: '420px',
  },
}));
