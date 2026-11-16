import * as React from 'react';
import { SettingsItemWrapper } from '../../../../layout/components/SettingsItemWrapper';
import Stack from '@mui/material/Stack';
import { Checkbox, Typography, styled } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  BackgroundImages,
  updateMapInfo,
} from '../../../../store/features/starmap/mapInfoSlice';
import { updateConfig } from '../../../../store/features/starmap/configSlice';
import {
  useAppDispatch,
  useMapConfig,
  useMapInfo,
} from '../../../../store/store';

const Design: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isWhite, frame, mapType, background } = useMapInfo();
  const mapConfig = useMapConfig();

  return (
    <SettingsItemWrapper>
      <Typography align="center" variant="subtitle1" sx={{ marginBottom: 2 }}>
        VZHLED MAPY
      </Typography>
      <Stack spacing={1}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isWhite}
              onChange={(e) =>
                dispatch(updateMapInfo({ isWhite: e.target.checked }))
              }
            />
          }
          label="Bílé pozadí"
        />
        <ImagesWrapper>
          {BackgroundImages[mapType].map((bg) => (
            <ImgCard
              key={bg}
              sx={{
                background: bg.includes('#')
                  ? bg
                  : `url(/img/editorDesigns/${bg}.jpg)`,
                backgroundSize: 'cover',
                outline: bg === background ? '3px solid #00bda5' : 'none',
              }}
              onClick={() => dispatch(updateMapInfo({ background: bg }))}
            />
          ))}
        </ImagesWrapper>
      </Stack>
      <FormControlLabel
        control={
          <Checkbox
            checked={frame}
            onChange={(e) =>
              dispatch(updateMapInfo({ frame: e.target.checked }))
            }
          />
        }
        label="Rámeček"
      />
      <Typography sx={{ marginTop: 2 }} variant="subtitle2">
        Zobrazit na hvězdné mapě:
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={mapConfig.mw.show}
            onChange={(e) =>
              dispatch(
                updateConfig({
                  mw: { ...mapConfig.mw, show: e.target.checked },
                })
              )
            }
          />
        }
        label="Mléčná dráha"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={mapConfig.constellations.lines}
            onChange={(e) =>
              dispatch(
                updateConfig({
                  constellations: {
                    ...mapConfig.constellations,
                    lines: e.target.checked,
                  },
                })
              )
            }
          />
        }
        label="Souhvězdí"
      />
    </SettingsItemWrapper>
  );
};

export default Design;

const ImgCard = styled('div')(({ theme: $ }) => ({
  margin: $.spacing(1),
  width: '70px',
  height: '98px',
  cursor: 'pointer',
  '&:hover': {
    border: `5px solid ${$.palette.background.default}`,
  },
}));

const ImagesWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});
