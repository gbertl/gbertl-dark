import { fetchProjects } from '../../../../store/slices/portfolio';
import * as api from '../../../../api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { serialize } from 'object-to-formdata';
import ArrayField from '../../../../components/Layout/ArrayField';
import classes from './edit-project.module.css';
import { isAuthenticated } from '../../../../utils';

export const getServerSideProps = async (context) => {
  const authenticated = await isAuthenticated(context);

  if (!authenticated) {
    return {
      redirect: {
        destination: `/login?goBack=${context.resolvedUrl}`,
      },
    };
  }

  const { data: screenshotListData } = await api.getScreenshots();
  const { data: currProjectData } = await api.getProjectDetail(
    context.params.id
  );

  return {
    props: {
      screenshotListData,
      currProjectData,
    },
  };
};

const EditProject = ({ screenshotListData, currProjectData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [screenshotList, setScreenshotList] = useState(screenshotListData);
  const dispatch = useDispatch();
  const [currProject, setCurrProject] = useState(currProjectData);

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
      console.log(e);
    }

    setIsLoading(false);
  };

  return (
    <div className={classes.editProject}>
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

export default EditProject;
