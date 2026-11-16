import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { updateConfig } from '../../store/features/starmap/configSlice';
import { MapTypes } from '../../store/features/starmap/mapInfoSlice';
import { useAppDispatch, useMapConfig, useMapInfo } from '../../store/store';
import Classic from './Classic';
import TwoCircles from './TwoCircles';

const pageStyle = '@page { margin: -10 0 0 -10 !important; }';

/**
 * Renders the map from the store in print resolution and lets the user
 * save it as PDF through the browser print dialog.
 */
const PrintPdf: React.FC = () => {
  const dispatch = useAppDispatch();
  const mapInfo = useMapInfo();
  const currentConfig = useMapConfig();
  // config as it was in the editor - restored when leaving the page
  const editorConfig = useRef(currentConfig).current;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const background =
      mapInfo.background === 'editorBackground2'
        ? { fill: 'rgba(0,0,0,0.2)', stroke: 'rgba(255,255,255,1)' }
        : editorConfig.background;

    dispatch(
      updateConfig({
        width: 3000,
        disableAnimations: true,
        stars: { ...editorConfig.stars, size: 23, exponent: -0.26, limit: 6 },
        constellations: {
          ...editorConfig.constellations,
          names: false,
          linestyle: { opacity: 0.7, stroke: '#cccccc', width: 4 },
        },
        background: { ...background, width: 5 },
      })
    );
    setReady(true);

    return () => {
      dispatch(updateConfig(editorConfig));
    };
  }, []);

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'hvezdna-mapa',
  });

  return (
    <div>
      <div style={{ padding: 16 }}>
        <Link href="/">← Zpět do editoru</Link>
        <p>
          Počkej cca 5 s, než se mapa vykreslí, a pak klikni na tlačítko. V
          tiskovém dialogu zvol „Uložit jako PDF“.
        </p>
        <button onClick={() => handlePrint()}>STÁHNOUT MAPU V PDF</button>
      </div>
      <div ref={componentRef}>
        <style>{pageStyle}</style>
        {ready &&
          (mapInfo.mapType === MapTypes.twoCircles ? (
            <TwoCircles mapInfo={mapInfo} />
          ) : (
            <Classic mapInfo={mapInfo} />
          ))}
      </div>
    </div>
  );
};

export default PrintPdf;
