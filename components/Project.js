import React from 'react';

const Project = (props) => {
  return (
    <div style={{ backgroundColor: 'green', width: '100%', height: '500px' }}>
      <h3>{props.name}</h3>
    </div>
  );
};

export default Project;
