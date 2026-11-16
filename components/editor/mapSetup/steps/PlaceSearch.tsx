import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { StyledTextField } from '../../../../layout/components/Textfield';
import { updateConfig } from '../../../../store/features/starmap/configSlice';
import { updateMapInfo } from '../../../../store/features/starmap/mapInfoSlice';
import { useAppDispatch } from '../../../../store/store';

interface Place {
  label: string;
  name: string;
  lat: number;
  lng: number;
}

// Photon = free OpenStreetMap geocoder, no API key needed (https://photon.komoot.io)
const searchPlaces = async (query: string, signal: AbortSignal) => {
  const res = await fetch(
    `https://photon.komoot.io/api/?limit=6&q=${encodeURIComponent(query)}`,
    { signal }
  );
  const json = await res.json();
  return (json.features as any[]).map(({ properties: p, geometry }): Place => {
    const parts = [p.name, p.city, p.state, p.country].filter(Boolean);
    return {
      label: Array.from(new Set(parts)).join(', '),
      name: p.name ?? p.city ?? query,
      lat: geometry.coordinates[1],
      lng: geometry.coordinates[0],
    };
  });
};

const PlaceSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');
  const [options, setOptions] = useState<Place[]>([]);

  useEffect(() => {
    if (input.trim().length < 2) {
      setOptions([]);
      return;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      searchPlaces(input, controller.signal)
        .then(setOptions)
        .catch(() => {});
    }, 300);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [input]);

  const selectPlace = (place: Place | null) => {
    if (!place) return;
    const lat = place.lat.toString();
    const lng = place.lng.toString();
    dispatch(updateConfig({ geopos: [lat, lng] }));
    dispatch(updateMapInfo({ place: place.name, lat, lng }));
  };

  return (
    <Autocomplete
      options={options}
      filterOptions={(x) => x}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(a, b) => a.label === b.label}
      noOptionsText="Nic nenalezeno"
      onInputChange={(_, value) => setInput(value)}
      onChange={(_, place) => selectPlace(place)}
      renderInput={(params) => (
        <StyledTextField {...params} variant="filled" label="🌐 Zadejte místo" />
      )}
    />
  );
};

export default PlaceSearch;
