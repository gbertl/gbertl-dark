import Login from '../components/Layout/Login';
import { wrapper } from '../store';
import * as api from '../api';
import { fetchProjects } from '../store/actions/portfolio';

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch, getState }) =>
    async () => {
      await dispatch(fetchProjects());
      const { projects } = getState().portfolio;

      const { data: screenshotListData } = await api.getScreenshots();
      const { data: currProjectData } = await api.getProjectDetail(
        projects[0].id
      );

      return {
        props: {
          screenshotListData,
          currProjectData,
        },
      };
    }
);

const LoginPage = (props) => {
  return <Login {...props} />;
};

export default LoginPage;
