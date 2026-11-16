import React from 'react';
import Map from '../editor/preview/celestial/Map';
import { styled } from '@mui/material';
import { OtherConfig } from '../../store/features/starmap/mapInfoSlice';
import { EditorTitle } from '../../layout/components/EditorTexts';
import { getDate, getTime } from '../../layout/formatDate';
import { theme } from '../../layout/theme';

interface ClassicProps {
  mapInfo: OtherConfig;
}
const Classic: React.FC<ClassicProps> = ({ mapInfo }) => {
  return (
    <Paper
      sx={{
        background: mapInfo.background.includes('#')
          ? mapInfo.background
          : `url(/img/exportDesigns/${mapInfo.background}.png)!important`,
        ' &::after': {
          zIndex: 15,
          visibility: mapInfo.frame ? 'visible' : 'hidden',
          backgroundSize: 'cover!important',
          borderColor: mapInfo.isWhite
            ? theme.palette.primary.dark
            : theme.palette.primary.light,
        },
      }}
    >
      {mapInfo.isWhite && <WhiteBackground src="/img/whiteLayer.png" />}
      <MapWrapper>
        <Map />
      </MapWrapper>
      <TextWrapper sx={{ bottom: mapInfo.lastLine ? '15.5%' : '' }}>
        <StyledEditorTitle
          sx={{
            fontFamily: mapInfo.font,
            whiteSpace: 'pre-line',
            '@media print': { fontFamily: mapInfo.font },
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
            '@media print': { fontFamily: mapInfo.font },
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
            '@media print': {
              fontFamily: mapInfo.font,
              color: mapInfo.isWhite
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
            },
          }}
        >
          {mapInfo.showCoords &&
            `${String(mapInfo.lat).substring(0, 10)}°N ${'  '} ${String(
              mapInfo.lng
            ).substring(0, 10)}°E`}
        </StyledBottomText>
      </BottomTextWrapper>
    </Paper>
  );
};

export default Classic;

const Paper = styled('div')(({ theme: $ }) => ({
  margin: 0,
  padding: 0,
  '@media print': {
    visibility: 'visible',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundSize: 'cover!important',
    width: '100% !important',
    height: '100vh !important',
    margin: 'unset !important',
    ' &::after': {
      position: 'absolute',
      width: '90% !important',
      height: '93vh !important',
      content: '""',
      border: '2px solid white',
    },
  },
}));

const MapWrapper = styled('div')(({ theme: $ }) => ({
  position: 'relative',
  top: '0%',
  margin: '6%',
  '@media print': {
    position: 'relative',
    top: '0%',
    margin: '6%',
    marginTop: '1630px',
  },
}));

const TextWrapper = styled('div')(({ theme: $ }) => ({
  width: '430px',
  textAlign: 'center',
  position: 'absolute',
  bottom: '300px',
  left: '50%',
  transform: 'translate(-50%, 0)',
  '@media print': {
    width: '80%',
    zIndex: 15,
  },
}));

const BottomTextWrapper = styled('div')(({ theme: $ }) => ({
  '@media print': {
    zIndex: 15,
    width: '800px',
    textAlign: 'center',
    position: 'absolute',
    bottom: '80px',
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
}));

const StyledEditorTitle = styled(EditorTitle)(({ theme: $ }) => ({
  fontSize: 28,
  lineHeight: 1.2,
  '@media print': {
    fontSize: '3.3rem !important',
  },
}));

const StyledBottomText = styled(EditorTitle)(({ theme: $ }) => ({
  fontSize: 17,
  lineHeight: 1.2,
  '@media print': {
    fontSize: '1.8rem !important',
  },
}));

const WhiteBackground = styled('img')(({ theme: $ }) => ({
  '@media print': {
    position: 'absolute',
    height: '100%',
    width: 'auto',
    zIndex: 10,
  },
}));
