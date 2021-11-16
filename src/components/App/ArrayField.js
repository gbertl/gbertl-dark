import { useEffect, useState } from 'react';

import { axiosInstance } from '../../axios';

const ArrayField = ({ name, fieldKeys, field, setField }) => {
  const [fieldList, setFieldList] = useState([]);

  useEffect(() => {
    const fetchFieldList = async () => {
      const { data } = await axiosInstance.get(`/${name}/`);
      setFieldList(data);
    };
    fetchFieldList();
  }, [name]);

  const handleChange = (e, index) => {
    let newFields = [...field];
    newFields[index][e.target.name] = e.target.value;
    setField(newFields);
  };

  const handleAddInput = (e) => {
    e.preventDefault();

    let obj = {};
    for (const key of fieldKeys) {
      obj[key] = '';
    }
    setField([...field, obj]);
  };

  const handleRemoveInput = (e, index) => {
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
      {field.map((f, index) => (
        <div key={index} style={{ display: 'flex' }}>
          {Object.entries(f)
            .filter(([k, v]) => k !== 'id')
            .map(([fKey, fValue]) => (
              <div key={fKey}>
                <label>{`${name} ${fKey}`}:</label>
                <input
                  type="text"
                  name={fKey}
                  value={fValue}
                  placeholder={fKey}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            ))}

          <button
            style={{
              marginTop: '10px',
              background: 'black',
              color: 'white',
              padding: '5px 20px',
            }}
            onClick={(e) => handleRemoveInput(e, index)}
          >
            -
          </button>
        </div>
      ))}
      <button
        onClick={handleAddInput}
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

      {fieldList.map((f) => (
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
      ))}
    </div>
  );
};

export default ArrayField;
