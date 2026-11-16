import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// the whole app is client-only (the star map is drawn into a canvas)
const Editor = dynamic(() => import('../components/editor/Editor'), {
  ssr: false,
});

const Home: NextPage = () => (
  <>
    <Head>
      <title>Editor hvězdných map</title>
    </Head>
    <Editor />
  </>
);

export default Home;
