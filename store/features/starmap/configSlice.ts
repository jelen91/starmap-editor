import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const FONT = 'Raleway';

// Configuration passed to d3-celestial (https://github.com/ofrohn/d3-celestial)
export const configInitialState = {
  config: {
    container: 'map',
    width: 500,
    projection: 'azimuthalEqualArea',
    transform: 'equatorial',

    form: false,
    advanced: false,
    interactive: false,
    disableAnimations: false,

    zoomlevel: null as number | null,
    zoomextend: 10,
    adaptable: false,

    follow: 'zenith',
    geopos: ['50.0755381', '14.4378005'],

    lines: {
      graticule: { show: false },
      equatorial: { show: false },
      ecliptic: { show: false },
      galactic: { show: false },
      supergalactic: { show: false },
    },
    // star data is served from /public, no external requests
    datapath: '/celestial/data/',
    planets: {
      show: false,
      which: ['mer', 'ven', 'ter', 'lun', 'mar', 'jup', 'sat'],
      symbolType: 'disk',
      names: false,
      nameStyle: {
        fill: '#00ccff',
        font: `14px ${FONT}`,
        align: 'center',
        baseline: 'top',
      },
      namesType: 'en',
    },

    dsos: {
      show: false,
      names: false,
    },
    background: {
      fill: 'rgba(0,0,0,0.5)',
      stroke: 'rgba(255,255,255,1)',
      width: 1,
    },

    constellations: {
      show: false,
      names: false,
      desig: false,
      lines: true,
      linestyle: { stroke: 'rgba(255,255,255,1)', width: 1, opacity: 0.7 },
      bounds: false,
    },

    mw: {
      show: true,
      style: { fill: '#ffffff', opacity: 0.05 },
    },
    stars: {
      colors: false,
      size: 5,
      limit: 15,
      exponent: -0.26,
      designation: false,
      propername: false,
    },
  },
};

export type MapConfig = typeof configInitialState.config;

export const configSlice = createSlice({
  name: 'starconfig',
  initialState: configInitialState,
  reducers: {
    // merges the given fields into the current config
    updateConfig: (state, action: PayloadAction<Partial<MapConfig>>) => {
      state.config = { ...state.config, ...action.payload };
    },
  },
});

export const { updateConfig } = configSlice.actions;

export default configSlice.reducer;
