import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import Links from '../api/links';
import ShrtLinkListItem from './ShrtLinkListItem';

export default class ShrtLinkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
    };
  }

  componentDidMount() {
    this.autoTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      this.setState({ links: Links.find({ visible: Session.get('showVisible') }).fetch() });
    });
  }

  componentWillUnmount() {
    this.autoTracker.stop();
  }

  render () {
    return <div>
      <FlipMove maintainContainerHeight="true">
        { this.state.links.map(link => <ShrtLinkListItem key={ link._id } shortUrl={ Meteor.absoluteUrl(link._id)} {...link}/>) }
      </FlipMove>
      </div>
  }
}
