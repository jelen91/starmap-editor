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
const TwoCircles: React.FC<ClassicProps> = ({ mapInfo }) => {
  return (
    <Paper
      sx={{
        position: 'relative',
        overflow: 'hidden',
        zIndex: '-1',
        ' &::before': {
          content: '""',
          position: 'absolute',
          width: '145%',
          height: '100%',
          background: mapInfo.background.includes('#')
            ? mapInfo.background
            : `url(/img/exportDesigns/${mapInfo.background}.png) 0 0 repeat`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'rotate(90deg)',
        },

        ' &::after': {
          visibility: mapInfo.frame ? 'visible' : 'hidden',
          borderColor: mapInfo.isWhite
            ? theme.palette.primary.dark
            : theme.palette.primary.light,
        },
      }}
    >
      {mapInfo.isWhite && (
        <WhiteBackground src="/img/whiteLayerTwoCirclesExport.png" />
      )}
      <MapWrapper>
        <Map />
      </MapWrapper>
      <ImgWrapper>
        {mapInfo.imgUrl && <Img src={mapInfo.imgUrl} width="300" />}
      </ImgWrapper>
      <TextWrapper>
        <div>
          {mapInfo.title && (
            <StyledEditorTitle
              sx={{
                fontFamily: mapInfo.font,
                color: mapInfo.isWhite
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
              }}
            >
              {mapInfo.uppercase ? mapInfo.title?.toUpperCase() : mapInfo.title}
            </StyledEditorTitle>
          )}
        </div>
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
          {`${
            mapInfo.showPlace
              ? mapInfo.uppercase
                ? mapInfo.place.toUpperCase()
                : mapInfo.place
              : ''
          } \xa0\  ${
            mapInfo.showDate ? getDate(mapInfo.timeOnMap) : ''
          } \xa0\ ${mapInfo.showTime ? getTime(mapInfo.timeOnMap) : ''} 
          `}
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
            `${String(mapInfo.lat).substring(0, 10)}°N ${'  '} ${String(
              mapInfo.lng
            ).substring(0, 10)}°E`}{' '}
        </StyledBottomText>
      </BottomTextWrapper>
    </Paper>
  );
};

export default TwoCircles;

const Paper = styled('div')(({ theme: $ }) => ({
  margin: 0,
  padding: 0,
  visibility: 'visible',
  '@media print': {
    visibility: 'visible',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100% !important',
    height: '100vh !important',
    margin: 'unset !important',
    ' &::after': {
      position: 'absolute',
      width: '90% !important',
      height: '93vh !important',
      content: '""',
      border: '2px solid white',
      zIndex: 15,
    },
  },
}));

const MapWrapper = styled('div')(({ theme: $ }) => ({
  position: 'relative',
  top: '33px',
  right: '1022px',
  margin: '185px',
  transform: 'rotate(90deg)',
}));

const Img = styled('img')(({ theme: $ }) => ({
  position: 'relative',
  width: '705px',
  height: '705px',
  bottom: '1350px',
  left: '103px',
  border: '1px solid white',
  borderRadius: '50%',
  objectFit: 'cover',
  objectPosition: 'center',
  zIndex: 20,
  margin: '15px',
  transform: 'rotate(90deg)',
}));

const TextWrapper = styled('div')(({ theme: $ }) => ({
  width: '1600px',
  textAlign: 'center',
  position: 'absolute',
  left: '500px',
  '@media print': {
    width: '1380px',
    left: '210px',
    bottom: '48%',
    transform: 'translate(-50%, 0) rotate(90deg)',
    zIndex: 15,
  },
}));

const BottomTextWrapper = styled('div')(({ theme: $ }) => ({
  '@media print': {
    width: '1380px',
    textAlign: 'center',
    position: 'absolute',
    bottom: '48%',
    left: '10%',
    transform: 'translate(-50%, 0) rotate(90deg)',
    zIndex: 15,
  },
}));

const StyledEditorTitle = styled(EditorTitle)(({ theme: $ }) => ({
  fontSize: 28,
  lineHeight: 1.2,
  '@media print': {
    fontSize: '3.3em !important',
    zIndex: 15,
  },
}));

const StyledBottomText = styled(EditorTitle)(({ theme: $ }) => ({
  fontSize: 17,
  lineHeight: 1.2,
  '@media print': {
    fontSize: '1.8em !important',
    zIndex: 15,
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

const ImgWrapper = styled('div')(({ theme: $ }) => ({}));
