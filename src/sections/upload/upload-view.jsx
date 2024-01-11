import * as React from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { TradeRepublicView , AnalysedFieldsView } from 'src/sections/upload/view';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(10 10 10 10)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UploadView() {
  return (
    <Container>
      <AnalysedFieldsView />
      <TradeRepublicView />
        <Stack direction="row" spacing={2}>
          <Button component="label"  variant="contained" startIcon={<CloudUploadIcon />}>
            Upload files
            <VisuallyHiddenInput type="file" />
          </Button>
          <Button>
            helloo
          </Button>
        </Stack>
    </Container>
  );
}