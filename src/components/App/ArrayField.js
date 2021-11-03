import { useEffect, useState } from 'react';
import { axiosInstance } from '../../axios';

const ArrayField = ({ name, fieldKeys, field, setField }) => {
  const [fieldList, setFieldList] = useState([]);

  const fetchFieldList = async () => {
    const response = await axiosInstance.get(`/${name}/`);
    setFieldList(response.data);
  };

  useEffect(() => {
    fetchFieldList();
  }, [field]);

  const fieldKeyHandler = (e, index, key) => {
    let newFields = [...field];
    newFields[index][key] = e.target.value;
    setField(newFields);
  };

  const plusNewFieldHandler = (e) => {
    e.preventDefault();

    let obj = {};
    for (const key of fieldKeys) {
      obj[key] = '';
    }
    setField([...field, obj]);
  };

  const minusRemoveFieldHandler = (e, index) => {
    e.preventDefault();
    let updatedFields = [...field];
    updatedFields.splice(index, 1);
    setField(updatedFields);
  };

  return (
    <div className="array-field">
      <h3>
        {name
          .split('')
          .map((n, index) => (index === 0 ? n.toUpperCase() : n))
          .join('')}
        :
      </h3>
      {field.map((f, index) => {
        return (
          <div key={index} style={{ display: 'flex' }}>
            {Object.entries(f)
              .filter(([k, v]) => k !== 'id')
              .map(([fKey, fValue]) => {
                return (
                  <div key={fKey}>
                    <label>{`${name} ${fKey}`}:</label>
                    <input
                      type="text"
                      placeholder={fKey}
                      value={fValue}
                      onChange={(e) => fieldKeyHandler(e, index, fKey)}
                    />
                  </div>
                );
              })}

            <button
              style={{
                marginTop: '10px',
                background: 'black',
                color: 'white',
                padding: '5px 20px',
              }}
              onClick={(e) => minusRemoveFieldHandler(e, index)}
            >
              -
            </button>
          </div>
        );
      })}
      <button
        onClick={plusNewFieldHandler}
        style={{
          margin: '10px 0',
          background: 'black',
          color: 'white',
          padding: '5px 20px',
        }}
      >
        +
      </button>
      <br />

      {fieldList.map((f) => {
        return (
          <span key={f.id}>
            <button
              onClick={(e) => {
                e.preventDefault();
                !field.some((prevState) => prevState.id === f.id) &&
                  setField((prevState) => [...prevState, f]);
              }}
              style={{
                marginRight: '10px',
                background: field.some((prevState) => prevState.id === f.id)
                  ? '#1b1b22'
                  : 'black',
                color: 'white',
                padding: '5px 20px',
              }}
            >
              + {f.name}
            </button>
          </span>
        );
      })}
    </div>
  );
};

export default ArrayField;
