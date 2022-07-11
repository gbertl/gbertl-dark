import HeadTitle from '../components/HeadTitle';
import Portfolio from '../components/Portfolio';
import { wrapper } from '../store';
import { fetchCategories, fetchProjects } from '../store/slices/portfolio';

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) =>
    async () => {
      await Promise.all([
        dispatch(fetchProjects()),
        dispatch(fetchCategories()),
      ]);

      return {
        props: {},
      };
    }
);

const PortfolioPage = () => {
  return (
    <>
      <HeadTitle title="Portfolio" />
      <Portfolio />
    </>
  );
};

export default PortfolioPage;
