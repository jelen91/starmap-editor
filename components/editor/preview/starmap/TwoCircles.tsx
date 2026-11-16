import React from 'react';
import Map from '../celestial/Map';
import { styled } from '@mui/material';
import { OtherConfig } from '../../../../store/features/starmap/mapInfoSlice';
import { EditorTitle } from '../../../../layout/components/EditorTexts';
import { getDate, getTime } from '../../../../layout/formatDate';
import { theme } from '../../../../layout/theme';

interface TwoCirclesProps {
  mapInfo: OtherConfig;
}

const TwoCircles: React.FC<TwoCirclesProps> = ({ mapInfo }) => {
  return (
    <Paper
      sx={{
        background: mapInfo.background.includes('#')
          ? mapInfo.background
          : `url(/img/editorDesigns/${mapInfo.background}.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        ' &::after': {
          visibility: mapInfo.frame ? 'visible' : 'hidden',
          borderColor: mapInfo.isWhite
            ? theme.palette.primary.dark
            : theme.palette.primary.light,
        },
      }}
    >
      {mapInfo.isWhite && (
        <BackgroundHelper src="/img/whiteLayerTwoCircles.png" />
      )}
      <MapWrapper>
        <Map />
      </MapWrapper>
      <ImgWrapper>
        {mapInfo.imgUrl ? (
          <Img src={mapInfo.imgUrl} width="300" />
        ) : (
          <NoImage
            sx={{ border: `1px solid ${mapInfo.isWhite ? 'black' : 'white'}` }}
          >
            Vložte Vaší fotografii
          </NoImage>
        )}
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
            ).substring(0, 10)}°E`}
        </StyledBottomText>
      </BottomTextWrapper>
    </Paper>
  );
};

export default TwoCircles;

const Paper = styled('div')(({ theme: $ }) => ({
  transform: 'scale(1)',
  display: 'flex',
  margin: $.spacing(6, 0),
  width: '700px',
  height: '500px',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: 'rgb(0, 0, 0) 0px 20px 30px -10px',
  ' &::after': {
    position: 'absolute',
    width: '650px',
    height: '450px',
    content: '""',
    border: '1px solid white',
  },
  [$.breakpoints.down('md')]: {
    width: '360px',
    height: '257px',
    margin: $.spacing(6, 0),
    ' &::after': {
      position: 'absolute',
      width: '334px',
      height: '231px',
      content: '""',
      border: '1px solid white',
    },
  },
}));

const MapWrapper = styled('div')(({ theme: $ }) => ({
  top: '37px',
  left: '24px',
  position: 'relative',
  width: '335px',
  [$.breakpoints.down('md')]: {
    margin: '-1px',
    width: '185px',
    top: '142px',
    left: '20px',
  },
}));

const ImgWrapper = styled('div')(({ theme: $ }) => ({}));

const Img = styled('img')(({ theme: $ }) => ({
  position: 'relative',
  width: '314px',
  height: '314px',
  bottom: '45px',
  right: '19px',
  border: '1px solid white',
  borderRadius: '50%',
  objectFit: 'cover',
  objectPosition: 'center',
  zIndex: 20,
  margin: '15px',
  [$.breakpoints.down('md')]: {
    width: '162px',
    height: '162px',
    bottom: '23px',
    right: '7px',
  },
}));

const NoImage = styled('div')(({ theme: $ }) => ({
  display: 'flex',
  position: 'relative',
  width: '314px',
  height: '314px',
  bottom: '46px',
  right: '19px',
  borderRadius: '50%',
  zIndex: 20,
  margin: '15px',
  justifyContent: 'center',
  alignItems: 'center',
  // backgroundColor: $.palette.background.default,
  backgroundColor: 'white',
  [$.breakpoints.down('md')]: {
    width: '162px',
    height: '162px',
    bottom: '24px',
    right: '7px',
  },
}));

const TextWrapper = styled('div')(({ theme: $ }) => ({
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '595px',
  position: 'absolute',
  left: '50%',
  bottom: '16%',
  transform: 'translate(-50%, 0)',
  [$.breakpoints.up('lg')]: {},
  [$.breakpoints.down('md')]: {
    width: '311px',
  },
}));

const StyledEditorTitle = styled(EditorTitle)(({ theme: $ }) => ({
  width: '595px',
  fontSize: 23,
  lineHeight: 1.2,
  [$.breakpoints.down('md')]: {
    fontSize: 12,
  },
}));

const BottomTextWrapper = styled('div')(({ theme: $ }) => ({
  width: '430px',
  textAlign: 'center',
  position: 'absolute',
  bottom: '6%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  [$.breakpoints.up('lg')]: {},
  [$.breakpoints.down('md')]: {
    width: '280px',
  },
}));

const StyledBottomText = styled(EditorTitle)(({ theme: $ }) => ({
  fontSize: 13,
  lineHeight: 1.2,
  [$.breakpoints.down('md')]: {
    fontSize: 8,
  },
}));

const BackgroundHelper = styled('img')(({ theme: $ }) => ({
  position: 'absolute',
  height: '500px',
  width: '700px',
  [$.breakpoints.down('md')]: {
    width: '360px',
    height: '257px',
  },
}));
