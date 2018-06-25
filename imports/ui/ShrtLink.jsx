import React from 'react';
import { Meteor } from 'meteor/meteor';

import ShrtLinkList from './ShrtLinkList';
import Header from './Header';
import ShrtLinkAdd from './ShrtLinkAdd';
import ShrtLinkFilter from './ShrtLinkFilter';

export default () => {
    return <div>
      <div>
        <Header title="Shrt Links"/>
        <div className="page-content">
          <ShrtLinkFilter />
          <ShrtLinkAdd />
          <ShrtLinkList />
        </div>
      </div>
    </div>
};
