import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../api';
import { hideLoader } from '../../store/actions/ui';
import { fetchProjects } from '../../store/actions/portfolio';

const Login = () => {
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.portfolio.projects);
  const isInitial = useRef(true);

  useEffect(() => {
    window.addEventListener('load', () => {
      dispatch(hideLoader());
    });

    dispatch(fetchProjects());
  }, []);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
    } else {
      setTitle(projects[0].title);
    }
  }, [projects]);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      await api.login({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });

      e.target.reset();
    } catch (e) {
      alert(e.message);
    }
  };

  const updateProjectHandler = async (e) => {
    e.preventDefault();

    const id = projects[0].id;

    const { data } = await api.updateProject(id, { title });
    setTitle(data.title);
  };

  return (
    <div className="login">
      <form onSubmit={loginHandler}>
        <input
          type="text"
          placeholder="Username"
          ref={usernameRef}
          style={{ color: 'white' }}
        />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          style={{ color: 'white' }}
        />
        <button
          style={{ marginTop: '10px', background: 'white', padding: '0 10px' }}
        >
          Login
        </button>
      </form>

      <form onSubmit={updateProjectHandler}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          style={{ color: 'white' }}
        />
        <button
          style={{ marginTop: '10px', background: 'white', padding: '0 10px' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
