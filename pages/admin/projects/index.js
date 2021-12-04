import { useSelector } from 'react-redux';
import Link from 'next/link';
import { wrapper } from '../../../store';
import { fetchProjects } from '../../../store/actions/portfolio';
import classes from './project-list.module.css';
import useAuthenticatedUser from '../../../hooks/useAuthenticatedUser';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchProjects());
  }
);

const ProjectListPage = () => {
  useAuthenticatedUser();

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
