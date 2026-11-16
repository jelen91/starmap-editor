import { styled, Button } from '@mui/material';
import { useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import getCroppedImg from './cropImage';

interface ImgCropProps {
  onCropped: (img: string) => void;
  img: string;
}

const ImgCrop: React.FC<ImgCropProps> = ({ onCropped, img }) => {
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const onCrop = async () => {
    if (!croppedAreaPixels) return;
    const cropped = await getCroppedImg(img, croppedAreaPixels);
    if (cropped) onCropped(cropped);
  };

  return (
    <CropBox>
      <TopBar />
      <CropWrapper>
        <Cropper
          image={img}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid
          objectFit="contain"
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
        />
      </CropWrapper>
      <Controls>
        <Button variant="contained" size="large" onClick={onCrop}>
          Potvrdit
        </Button>
      </Controls>
    </CropBox>
  );
};

export default ImgCrop;

const CropWrapper = styled('div')({
  height: '70%',
  width: '100%',
});

const Controls = styled('div')(({ theme: $ }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: '10%',
  background: $.palette.background.paper,
}));

const TopBar = styled('div')(({ theme: $ }) => ({
  position: 'fixed',
  top: 0,
  width: '100%',
  height: '15%',
  background: $.palette.background.paper,
  zIndex: 50,
}));

const CropBox = styled('div')(({ theme: $ }) => ({
  zIndex: 50,
  display: 'flex',
  flexDirection: 'column',
  color: 'white',
  position: 'fixed',
  left: 0,
  top: 0,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  background: $.palette.background.paper,
}));
