import { Typography, styled } from '@mui/material';

export const EditorTitle = styled(Typography)(({ theme: $ }) => ({
  color: $.palette.primary.light,
  fontSize: '100%',
}));
