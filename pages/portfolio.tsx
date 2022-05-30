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
  return <Portfolio />;
};

export default PortfolioPage;
