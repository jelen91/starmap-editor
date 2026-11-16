import { styled, TextField } from '@mui/material';

export const StyledTextField = styled(TextField)(({ theme: $ }) => ({
  svg: { color: $.palette.primary.main },
  input: { color: $.palette.primary.main },
  label: { color: $.palette.primary.main },
}));
