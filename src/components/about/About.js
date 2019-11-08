/* jsx-a11y/no-static-element-interactions */
import React, { Fragment } from 'react';
import './About.css';

const About = () => (
  <Fragment>
    <div className="about_img" />
    <div className="wrapper">
      <div className="about_title">About Us</div>
    </div>
  </Fragment>
);

export default About;
