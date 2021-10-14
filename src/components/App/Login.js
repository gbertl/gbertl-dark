import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../api';
import { hideLoader } from '../../store/actions/ui';
import { fetchProjects } from '../../store/actions/portfolio';

const Login = () => {
  const usernameRef = useRef('');
  const passwordRef = useRef('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [created, setCreated] = useState('');
  const [livePreview, setLivePreview] = useState('');
  const [sourceCode, setSourceCode] = useState('');

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
      setDescription(projects[0].description);
      setCreated(projects[0].created);
      setLivePreview(projects[0].live_preview);
      setSourceCode(projects[0].source_code);
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

    const updatedProject = {
      title: title,
      description: description,
      created: created,
      live_preview: livePreview,
      source_code: sourceCode,
    };

    try {
      const { data } = await api.updateProject(id, updatedProject);
      setTitle(data.title);
      setDescription(data.description);
      setCreated(data.created);
      setLivePreview(data.live_preview);
      setSourceCode(data.source_code);
      alert('success');
    } catch (e) {
      alert(e.message);
    }
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
          required
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          style={{ color: 'white' }}
          required
        />
        <input
          type="text"
          placeholder="Created"
          onChange={(e) => setCreated(e.target.value)}
          value={created}
          style={{ color: 'white' }}
          required
        />
        <input
          type="url"
          placeholder="Live preview"
          onChange={(e) => setLivePreview(e.target.value)}
          value={livePreview}
          style={{ color: 'white' }}
        />
        <input
          type="url"
          placeholder="Source code"
          onChange={(e) => setSourceCode(e.target.value)}
          value={sourceCode}
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
