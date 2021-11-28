import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serialize } from 'object-to-formdata';

import * as api from '../../api';
import { fetchProjects } from '../../store/actions/portfolio';
import ArrayField from './ArrayField';
import classes from './login.module.css';

const Login = ({ screenshotListData, currProjectData }) => {
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const [screenshotList, setScreenshotList] = useState(screenshotListData);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.portfolio.projects);
  const [currProject, setCurrProject] = useState(currProjectData);

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

    const fd = serialize(currProject, {
      indices: true,
      allowEmptyArrays: true,
    });

    try {
      setIsLoading(true);

      const { data: currProjectData } = await api.updateProject(
        currProject.id,
        fd
      );
      setCurrProject(currProjectData);

      const { data: screenshotListData } = await api.getScreenshots();
      setScreenshotList(screenshotListData);

      dispatch(fetchProjects());
      document.querySelector('input[type=file]').value = '';
    } catch (e) {
      alert(e.message);
    }

    setIsLoading(false);
  };

  return (
    <div className={classes.login} style={{ margin: '10px' }}>
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
          onChange={(e) =>
            setCurrProject((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
          value={currProject.title}
          required
        />
        <label htmlFor="">Description:</label>
        <textarea
          onChange={(e) =>
            setCurrProject((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
          value={currProject.description}
          required
        ></textarea>
        <label htmlFor="">Created:</label>
        <input
          type="text"
          onChange={(e) =>
            setCurrProject((prevState) => ({
              ...prevState,
              created: e.target.value,
            }))
          }
          value={currProject.created}
          required
        />
        <ArrayField
          name="roles"
          fieldKeys={['name']}
          field={currProject.roles}
          setFieldParent={setCurrProject}
        />
        <ArrayField
          name="technologies"
          fieldKeys={['name']}
          field={currProject.technologies}
          setFieldParent={setCurrProject}
        />
        <label htmlFor="">Live preview:</label>
        <input
          type="url"
          onChange={(e) =>
            setCurrProject((prevState) => ({
              ...prevState,
              live_preview: e.target.value,
            }))
          }
          value={currProject.live_preview}
        />
        <label htmlFor="">Source code:</label>
        <input
          type="url"
          onChange={(e) =>
            setCurrProject((prevState) => ({
              ...prevState,
              source_code: e.target.value,
            }))
          }
          value={currProject.source_code}
        />
        <label htmlFor="">Thumbnail:</label>
        <img
          src={
            typeof currProject.thumbnail === 'string' || !currProject.thumbnail
              ? currProject.thumbnail
              : URL.createObjectURL(currProject.thumbnail)
          }
          alt=""
          style={{ width: '40%' }}
        />
        <input
          type="file"
          onChange={(e) =>
            setCurrProject((prevState) => ({
              ...prevState,
              thumbnail: e.target.files[0],
            }))
          }
        />
        <ArrayField
          name="categories"
          fieldKeys={['title', 'name']}
          field={currProject.categories}
          setFieldParent={setCurrProject}
        />
        <label htmlFor="">Priority order:</label>
        <input
          type="number"
          value={currProject.priority_order}
          onChange={(e) =>
            setCurrProject((prevState) => ({
              ...prevState,
              priority_order: e.target.value,
            }))
          }
        />
        <h3>Screenshots:</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '5px',
          }}
        >
          {screenshotList?.map((obj, index) => (
            <div
              key={index}
              style={{
                border: currProject.screenshots?.some((s) => s.id === obj.id)
                  ? '3px solid white'
                  : 'none',
              }}
              onClick={() => {
                !currProject.screenshots.some((s) => s.id === obj.id) &&
                  setCurrProject((prevState) => ({
                    ...prevState,
                    screenshots: [...prevState.screenshots, { ...obj }],
                  }));
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

        {currProject.screenshots?.map((f, index) => (
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
                let newScreenshots = [...currProject.screenshots];
                newScreenshots[index].image = e.target.files[0];
                setCurrProject((prevState) => ({
                  ...prevState,
                  screenshots: newScreenshots,
                }));
              }}
            />
            <label htmlFor="">Priority order:</label>
            <input
              type="number"
              value={currProject.screenshots[index].priority_order}
              onChange={(e) => {
                let newScreenshots = [...currProject.screenshots];
                newScreenshots[index].priority_order = e.target.value;
                setCurrProject((prevState) => ({
                  ...prevState,
                  screenshots: newScreenshots,
                }));
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                let updatedScreenshots = [...currProject.screenshots];
                updatedScreenshots.splice(index, 1);

                setCurrProject((prevState) => ({
                  ...prevState,
                  screenshots: updatedScreenshots,
                }));
              }}
            >
              -
            </button>
          </div>
        ))}
        <button
          onClick={(e) => {
            e.preventDefault();
            setCurrProject((prevState) => ({
              ...prevState,
              screenshots: [
                ...prevState.screenshots,
                {
                  image: '',
                  priority_order: 0,
                },
              ],
            }));
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
