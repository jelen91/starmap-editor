import * as React from 'react';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { cs } from 'date-fns/locale/cs';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import {
  OtherConfig,
  updateMapInfo,
} from '../../../../store/features/starmap/mapInfoSlice';
import { updateConfig } from '../../../../store/features/starmap/configSlice';
import { useAppDispatch, useMapInfo } from '../../../../store/store';
import PlaceSearch from './PlaceSearch';
import { StyledTextField } from '../../../../layout/components/Textfield';
import { SettingsItemWrapper } from '../../../../layout/components/SettingsItemWrapper';

const pickerSlotProps = {
  textField: {
    variant: 'filled' as const,
    sx: { '& label, & svg': { color: 'primary.main' } },
  },
};

const visibilityOptions: [keyof OtherConfig, string][] = [
  ['showDate', 'Datum'],
  ['showTime', 'Čas'],
  ['showPlace', 'Místo'],
  ['showCoords', 'Souřadnice'],
];

const MapData: React.FC = () => {
  const mapInfo = useMapInfo();
  const dispatch = useAppDispatch();

  const handleDateChange = (newValue: Date | null) => {
    if (newValue && !isNaN(newValue.getTime())) {
      dispatch(updateMapInfo({ timeOnMap: newValue }));
    }
  };

  // lets the position be set by hand, without the place search
  const handleCoordChange = (coord: 'lat' | 'lng', value: string) => {
    const coords = { lat: mapInfo.lat, lng: mapInfo.lng, [coord]: value };
    dispatch(updateMapInfo(coords));
    const lat = Number(coords.lat);
    const lng = Number(coords.lng);
    if (
      coords.lat.trim() !== '' &&
      coords.lng.trim() !== '' &&
      Math.abs(lat) <= 90 &&
      Math.abs(lng) <= 180
    ) {
      dispatch(updateConfig({ geopos: [coords.lat, coords.lng] }));
    }
  };

  return (
    <SettingsItemWrapper>
      <Typography align="center" variant="subtitle1" sx={{ marginBottom: 2 }}>
        ÚDAJE PRO HVĚZDNOU MAPU
      </Typography>
      <Stack spacing={3}>
        <PlaceSearch />
        <Stack direction="row" spacing={2}>
          <StyledTextField
            fullWidth
            variant="filled"
            type="number"
            label="Zeměpisná šířka"
            value={mapInfo.lat}
            onChange={(e) => handleCoordChange('lat', e.target.value)}
          />
          <StyledTextField
            fullWidth
            variant="filled"
            type="number"
            label="Zeměpisná délka"
            value={mapInfo.lng}
            onChange={(e) => handleCoordChange('lng', e.target.value)}
          />
        </Stack>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={cs}>
          <DatePicker
            label="📅 Zvolte datum"
            format="dd/MM/yyyy"
            value={mapInfo.timeOnMap}
            onChange={handleDateChange}
            slotProps={pickerSlotProps}
          />
          <TimePicker
            label="⏰ Vyberte čas (alespoň přibližný)"
            ampm={false}
            value={mapInfo.timeOnMap}
            onChange={handleDateChange}
            slotProps={pickerSlotProps}
          />
        </LocalizationProvider>
      </Stack>
      <Typography sx={{ marginTop: 2 }} variant="subtitle2">
        Zobrazit na mapě:
      </Typography>
      {visibilityOptions.map(([key, label]) => (
        <FormControlLabel
          key={key}
          control={
            <Checkbox
              checked={mapInfo[key] as boolean}
              onChange={(e) =>
                dispatch(updateMapInfo({ [key]: e.target.checked }))
              }
            />
          }
          label={label}
        />
      ))}
    </SettingsItemWrapper>
  );
};

export default MapData;
