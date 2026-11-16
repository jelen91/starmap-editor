import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const PrintPdf = dynamic(() => import('../components/export/PrintPdf'), {
  ssr: false,
});

const ExportMap: NextPage = () => (
  <>
    <Head>
      <title>Export hvězdné mapy</title>
    </Head>
    <PrintPdf />
  </>
);

export default ExportMap;
