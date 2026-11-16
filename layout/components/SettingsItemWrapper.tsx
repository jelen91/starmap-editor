import { styled } from '@mui/material';

export const SettingsItemWrapper = styled('div')(({ theme: $ }) => ({
  color: $.palette.primary.main,
  background: 'rgba(0, 0, 0, 0.07)',
  padding: $.spacing(3),
  borderRadius: '5px',
  width: '90%',
  alignSelf: 'center',
  [$.breakpoints.down('lg')]: {
    width: '90vw',
    margin: $.spacing(3, 0),
  },
}));
