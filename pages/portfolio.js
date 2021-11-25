import Portfolio from '../components/Portfolio';
import { wrapper } from '../store';
import { fetchCategories, fetchProjects } from '../store/actions/portfolio';

export const getStaticProps = wrapper.getStaticProps(
  ({ dispatch }) =>
    async () => {
      await dispatch(fetchProjects());
      await dispatch(fetchCategories());
      return { revalidate: 259200 };
    }
);

const PortfolioPage = () => {
  return <Portfolio />;
};

export default PortfolioPage;
