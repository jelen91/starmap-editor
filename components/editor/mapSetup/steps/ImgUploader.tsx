import { PhotoCamera } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { SettingsItemWrapper } from '../../../../layout/components/SettingsItemWrapper';
import { updateMapInfo } from '../../../../store/features/starmap/mapInfoSlice';
import { useAppDispatch, useMapInfo } from '../../../../store/store';
import ImgCrop from './ImgCrop/ImgCrop';

// The photo never leaves the browser - it is kept as a data URL in the store.
const ImgUploader: React.FC = () => {
  const dispatch = useAppDispatch();
  const { imgUrl } = useMapInfo();
  const [imgToCrop, setImgToCrop] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImgToCrop(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <>
      <SettingsItemWrapper sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button component="label" endIcon={<PhotoCamera />}>
          {imgUrl ? 'Nahradit fotografii' : 'Vložte Vaší fotografii'}
          <input type="file" accept="image/*" hidden onChange={onFileChange} />
        </Button>
      </SettingsItemWrapper>
      {imgToCrop && (
        <ImgCrop
          img={imgToCrop}
          onCropped={(img) => {
            dispatch(updateMapInfo({ imgUrl: img }));
            setImgToCrop(null);
          }}
        />
      )}
    </>
  );
};

export default ImgUploader;
