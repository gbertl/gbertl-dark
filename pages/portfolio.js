import Portfolio from '../components/Portfolio';
import { wrapper } from '../store';
import { fetchCategories, fetchProjects } from '../store/actions/portfolio';

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) =>
    async () => {
      await dispatch(fetchProjects());
      await dispatch(fetchCategories());
    }
);

const PortfolioPage = () => {
  return <Portfolio />;
};

export default PortfolioPage;
