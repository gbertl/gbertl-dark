import Head from 'next/head';

const HeadTitle = ({ title }: { title?: string }) => {
  return (
    <Head>
      <title>
        {title || 'Gilbert L.'} | React Dev w/ Django & Node Experience
        {title && ' | Gilbert L.'}
      </title>
    </Head>
  );
};

export default HeadTitle;
