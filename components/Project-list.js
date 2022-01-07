import React from 'react';
import Project from './project.js';
import Slider from './slider';

const ProjectList = (props) => {
  return (
    <div className="project-list">
      <Slider>
        <Project name="Example" />
        <Project name="Example2" />
      </Slider>
    </div>
  );
};

export default ProjectList;
