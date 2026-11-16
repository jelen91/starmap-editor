import { Box, Button, styled } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MapTypes } from '../../../store/features/starmap/mapInfoSlice';
import { useMapInfo } from '../../../store/store';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { theme as $ } from '../../../layout/theme';
import Design from './steps/Design';
import ImgUploader from './steps/ImgUploader';
import MapData from './steps/MapData';
import MapType from './steps/MapType';
import Texts from './steps/Texts';

const TypeStep = () => {
  const { mapType } = useMapInfo();
  return (
    <>
      <MapType />
      {mapType === MapTypes.twoCircles && <ImgUploader />}
    </>
  );
};

const steps = [
  { short: 'Typ', title: 'Typ hvězdné mapy', Content: TypeStep },
  { short: 'Údaje', title: 'Údaje pro hvězdnou mapu', Content: MapData },
  { short: 'Text', title: 'Texty na mapě', Content: Texts },
  { short: 'Vzhled', title: 'Vzhled', Content: Design },
];

const MapSetup: React.FC = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number | null>(0);
  const isDesktop = useWindowDimensions().width > 1200;
  const ActiveContent = steps[activeStep ?? 0].Content;

  const exportButton = (
    <ExportButton
      variant="contained"
      size="large"
      onClick={() => router.push('/export')}
    >
      Export do PDF
    </ExportButton>
  );

  if (!isDesktop) {
    return (
      <>
        <MobileMenu>
          {steps.map((step, key) => (
            <MobileMenuItem
              key={step.short}
              onClick={() => setActiveStep(key)}
              sx={
                activeStep === key
                  ? {
                      background: $.palette.background.paper,
                      color: $.palette.primary.dark,
                    }
                  : undefined
              }
            >
              {step.short}
            </MobileMenuItem>
          ))}
        </MobileMenu>
        <ActiveContent />
        {exportButton}
      </>
    );
  }

  return (
    <>
      <Box sx={{ width: '100%', marginBottom: '80px' }}>
        {steps.map(({ title, Content }, key) => (
          <CustomAccordion
            key={title}
            expanded={activeStep === key}
            onChange={(_, expanded) => setActiveStep(expanded ? key : null)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Content />
            </AccordionDetails>
          </CustomAccordion>
        ))}
      </Box>
      {exportButton}
    </>
  );
};

export default MapSetup;

const ExportButton = styled(Button)(({ theme: $ }) => ({
  background: '#00bda5 !important',
  zIndex: 10,
  width: '100%',
  padding: '20px 0',
  [$.breakpoints.up('lg')]: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: '470px',
    padding: '8px 0',
  },
}));

const MobileMenu = styled('div')(({ theme: $ }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  background: $.palette.primary.dark,
}));

const MobileMenuItem = styled('div')(({ theme: $ }) => ({
  padding: $.spacing(2, 1),
  color: $.palette.background.paper,
  '&:hover': {
    background: $.palette.background.paper,
    color: $.palette.primary.dark,
    cursor: 'pointer',
  },
}));

const CustomAccordion = styled(Accordion)(({ theme: $ }) => ({
  backgroundColor: $.palette.primary.main,
  color: $.palette.common.white,
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: 'white',
  },
  '& .MuiAccordionDetails-root': {
    background: $.palette.common.white,
  },
}));
