import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serialize } from 'object-to-formdata';

import * as api from '../../api';
import { hideLoader } from '../../store/actions/ui';
import { fetchProjects } from '../../store/actions/portfolio';
import ArrayField from './ArrayField';
import './login.css';
import useMounted from './useMounted';

const Login = () => {
  const usernameRef = useRef('');
  const passwordRef = useRef('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [created, setCreated] = useState('');
  const [roles, setRoles] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [livePreview, setLivePreview] = useState('');
  const [sourceCode, setSourceCode] = useState('');
  const [categories, setCategories] = useState([]);
  const [priorityOrder, setPriorityOrder] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [screenshots, setScreenshots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [screenshotList, setScreenshotList] = useState([]);

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.portfolio.projects);
  const [currProject, setCurrProject] = useState({});

  const isMounted = useMounted();

  const fetchScreenshots = async () => {
    const { data } = await api.getScreenshots();
    setScreenshotList(data);
  };

  useEffect(() => {
    dispatch(hideLoader());
    dispatch(fetchProjects());
    fetchScreenshots();
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const fetchProjectDetail = async () => {
      const { data } = await api.getProjectDetail(projects[0].id);
      setCurrProject(data);
    };

    fetchProjectDetail();
  }, [projects]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    setTitle(currProject.title);
    setDescription(currProject.description);
    setCreated(currProject.created);
    setRoles(currProject.roles);
    setTechnologies(currProject.technologies);
    setLivePreview(currProject.live_preview);
    setSourceCode(currProject.source_code);
    setCategories(currProject.categories);
    setPriorityOrder(currProject.priority_order);
    setThumbnail(currProject.thumbnail);
    setScreenshots(currProject.screenshots);
  }, [currProject]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await api.login({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });

      e.target.reset();
      alert('done login!');
    } catch (e) {
      alert(e.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProject = {
      title,
      description,
      created,
      roles,
      technologies,
      live_preview: livePreview,
      source_code: sourceCode,
      categories,
      priority_order: priorityOrder,
      thumbnail,
      screenshots,
    };

    const fd = serialize(updatedProject, {
      indices: true,
      allowEmptyArrays: true,
    });

    try {
      setIsLoading(true);

      const { data } = await api.updateProject(currProject.id, fd);

      setCurrProject(data);
      fetchScreenshots();
      document.querySelector('input[type=file]').value = '';
      dispatch(fetchProjects());
    } catch (e) {
      alert(e.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="login" style={{ margin: '10px' }}>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" ref={usernameRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button>Login</button>
      </form>

      <select
        onChange={async (e) => {
          const { data } = await api.getProjectDetail(e.target.value);
          setCurrProject(data);
        }}
      >
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title}
          </option>
        ))}
      </select>

      <h1
        style={{ display: isLoading ? 'block' : 'none' }}
        onClick={() => setIsLoading(false)}
      >
        Please wait ..
      </h1>

      <form
        onSubmit={handleUpdate}
        style={{ display: isLoading ? 'none' : 'block', marginTop: '10px' }}
      >
        <label htmlFor="">Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        <label htmlFor="">Description:</label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        ></textarea>
        <label htmlFor="">Created:</label>
        <input
          type="text"
          onChange={(e) => setCreated(e.target.value)}
          value={created}
          required
        />
        <ArrayField
          name="roles"
          fieldKeys={['name']}
          field={roles}
          setField={setRoles}
        />
        <ArrayField
          name="technologies"
          fieldKeys={['name']}
          field={technologies}
          setField={setTechnologies}
        />
        <label htmlFor="">Live preview:</label>
        <input
          type="url"
          onChange={(e) => setLivePreview(e.target.value)}
          value={livePreview}
        />
        <label htmlFor="">Source code:</label>
        <input
          type="url"
          onChange={(e) => setSourceCode(e.target.value)}
          value={sourceCode}
        />
        <label htmlFor="">Thumbnail:</label>
        <img
          src={
            typeof thumbnail === 'string'
              ? thumbnail
              : URL.createObjectURL(thumbnail)
          }
          alt=""
          style={{ width: '40%' }}
        />
        <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} />
        <ArrayField
          name="categories"
          fieldKeys={['title', 'name']}
          field={categories}
          setField={setCategories}
        />
        <label htmlFor="">Priority order:</label>
        <input
          type="number"
          value={priorityOrder}
          onChange={(e) => setPriorityOrder(e.target.value)}
        />
        <h3>Screenshots:</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '5px',
          }}
        >
          {screenshotList.map((obj, index) => (
            <div
              key={index}
              style={{
                border: screenshots.some((s) => s.id === obj.id)
                  ? '3px solid white'
                  : 'none',
              }}
              onClick={() => {
                !screenshots.some((s) => s.id === obj.id) &&
                  setScreenshots((prevState) => [...prevState, { ...obj }]);
              }}
            >
              <img
                key={index}
                src={
                  typeof obj.image === 'string'
                    ? obj.image
                    : URL.createObjectURL(obj.image)
                }
                alt=""
              />
            </div>
          ))}
        </div>

        {screenshots.map((f, index) => (
          <div key={index}>
            <label htmlFor="">Image:</label>
            <img
              key={index}
              src={
                typeof f.image === 'string'
                  ? f.image
                  : URL.createObjectURL(f.image)
              }
              style={{ width: '40%' }}
              alt=""
            />
            <input
              type="file"
              onChange={(e) => {
                let newScreenshots = [...screenshots];
                newScreenshots[index].image = e.target.files[0];
                setScreenshots(newScreenshots);
              }}
            />
            <label htmlFor="">Priority order:</label>
            <input
              type="number"
              value={screenshots[index].priority_order}
              onChange={(e) => {
                let newScreenshots = [...screenshots];
                newScreenshots[index].priority_order = e.target.value;
                setScreenshots(newScreenshots);
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                let updatedScreenshots = [...screenshots];
                updatedScreenshots.splice(index, 1);
                setScreenshots(updatedScreenshots);
              }}
            >
              -
            </button>
          </div>
        ))}
        <button
          onClick={(e) => {
            e.preventDefault();
            setScreenshots((prevState) => [
              ...prevState,
              {
                image: '',
                priority_order: 0,
              },
            ]);
          }}
        >
          +
        </button>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
