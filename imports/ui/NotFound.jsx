import React from 'react';
import { Link } from "react-router-dom";

export default () => (
  <div className="boxed-view">
    <div className="boxed-view__box">
      <h1>Not found</h1>
      <p>This page doesn't exist</p>
      <Link to="/" className="button button--link">Back Home</Link>
    </div>
  </div>
);
