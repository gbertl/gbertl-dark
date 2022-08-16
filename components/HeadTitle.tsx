import Head from 'next/head';

const HeadTitle = ({ title }: { title?: string }) => {
  return (
    <Head>
      <title>
        {title || 'Gilbert L.'} | Front-end Web Developer
        {title && ' | Gilbert L.'}
      </title>
    </Head>
  );
};

export default HeadTitle;
