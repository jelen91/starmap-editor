import * as React from 'react';
import { StyledTextField } from '../../../../layout/components/Textfield';
import { SettingsItemWrapper } from '../../../../layout/components/SettingsItemWrapper';
import Stack from '@mui/material/Stack';
import { Checkbox, Typography, styled } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  Fonts,
  MapTypes,
  updateMapInfo,
} from '../../../../store/features/starmap/mapInfoSlice';
import { useAppDispatch, useMapInfo } from '../../../../store/store';
import { theme as $ } from '../../../../layout/theme';

const MAX_PLACE_LENGTH = 60;

const Texts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { title, font, uppercase, place, lastLine, mapType } = useMapInfo();

  // classic map: once the title fills its last line, allow only a few more characters
  const maxTitleLength =
    mapType === MapTypes.twoCircles ? 120 : lastLine ? title.length + 25 : 300;

  return (
    <SettingsItemWrapper>
      <Typography align="center" variant="subtitle1" sx={{ marginBottom: 2 }}>
        TEXTY NA MAPĚ
      </Typography>
      <Stack spacing={3}>
        <StyledTextField
          onChange={(e) => dispatch(updateMapInfo({ place: e.target.value }))}
          slotProps={{ htmlInput: { maxLength: MAX_PLACE_LENGTH } }}
          value={place}
          variant="filled"
          fullWidth
          label={`🖊️ Upravit text místa: zbývá znaků ${
            MAX_PLACE_LENGTH - place.length
          }`}
        />
        <StyledTextField
          onChange={(e) => dispatch(updateMapInfo({ title: e.target.value }))}
          value={title}
          variant="filled"
          fullWidth
          maxRows={4}
          slotProps={{ htmlInput: { maxLength: maxTitleLength } }}
          label="🖊️ Nadpis: max 4 řádky"
          multiline
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={uppercase}
              onChange={(e) =>
                dispatch(updateMapInfo({ uppercase: e.target.checked }))
              }
            />
          }
          label="Velké písmo"
        />
        <FontsWrapper>
          {Object.values(Fonts).map((value) => (
            <FontCard
              key={value}
              onClick={() => dispatch(updateMapInfo({ font: value }))}
              sx={{
                fontFamily: value,
                background: font === value ? $.palette.background.default : '',
                color: font === value ? $.palette.primary.dark : '',
              }}
            >
              A
            </FontCard>
          ))}
        </FontsWrapper>
      </Stack>
    </SettingsItemWrapper>
  );
};

export default Texts;

const FontCard = styled('div')(({ theme: $ }) => ({
  background: $.palette.primary.dark,
  color: $.palette.background.default,
  margin: $.spacing(1),
  fontSize: '3em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  width: '60px',
  height: '60px',
  cursor: 'pointer',
  '&:hover': {
    background: $.palette.background.default,
    color: $.palette.primary.dark,
  },
}));

const FontsWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});
