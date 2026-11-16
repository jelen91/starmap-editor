import { Box, styled } from '@mui/material';
import React from 'react';
import MapSetup from './mapSetup/MapSetup';
import Starmap from './preview/starmap/Starmap';

const Editor: React.FC = () => {
  return (
    <Bg>
      <div style={{ width: '100%' }}>
        <EditorWrapper>
          <MapWrapper>
            <Starmap />
          </MapWrapper>
          <SettingsWrapper>
            <MapSetup />
          </SettingsWrapper>
        </EditorWrapper>
      </div>
    </Bg>
  );
};

export default Editor;

const MapWrapper = styled(Box)(({ theme: $ }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '400px',
  width: '100%',
  height: '100vh',
  [$.breakpoints.down('lg')]: {
    height: 'auto',
    position: 'relative',
    top: 0,
    width: '100%',
  },
}));

const SettingsWrapper = styled(Box)(({ theme: $ }) => ({
  backgroundColor: $.palette.background.paper,
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  top: 0,
  right: 0,
  width: '470px',
  height: '100vh',
  overflowY: 'auto',
  zIndex: '10',
  flexDirection: 'column',
  [$.breakpoints.down('lg')]: {
    overflowY: 'visible',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  [$.breakpoints.up('lg')]: {
    minHeight: '730px',
  },
}));

const EditorWrapper = styled(Box)(({ theme: $ }) => ({
  position: 'relative',
  display: 'flex',
  p: 1,
  borderRadius: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  [$.breakpoints.down('lg')]: {
    flexDirection: 'column',
    width: '100%',
  },
}));

const Bg = styled(Box)(({ theme: $ }) => ({
  backgroundImage: 'url(/img/editor-background4.jpg)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '20% 10%',
  height: '100vh',
  width: '100vw',
  [$.breakpoints.up('md')]: {
    minHeight: '730px',
  },
}));
