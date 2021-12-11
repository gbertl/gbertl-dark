import { useSelector } from 'react-redux';
import Link from 'next/link';
import { wrapper } from '../../../store';
import { fetchProjects } from '../../../store/actions/portfolio';
import classes from './project-list.module.css';
import { isAuthenticated } from '../../../utils';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const authenticated = await isAuthenticated(context);

    if (!authenticated) {
      return {
        redirect: {
          destination: `/login?goBack=${context.resolvedUrl}`,
        },
      };
    }

    await store.dispatch(fetchProjects());
  }
);

const ProjectListPage = () => {
  const projects = useSelector((state) => state.portfolio.projects);

  return (
    <div className={classes.projectListPage}>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h1>{project.title}</h1>
            <Link href={`/admin/projects/${project.id}/edit/`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectListPage;
