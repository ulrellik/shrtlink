import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => Meteor.logout()}>Logout</button>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
