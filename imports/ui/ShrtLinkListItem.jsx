import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import ClipboardJS from 'clipboard';

export default class ShrtLinkListItem extends React.Component {
  static propTypes = {
    _id:  PropTypes.string.isRequired,
    shortUrl:  PropTypes.string.isRequired,
    link:  PropTypes.string.isRequired,
    userId:  PropTypes.string.isRequired,
    visible:  PropTypes.bool.isRequired,
    visited:  PropTypes.number.isRequired,
    lastVisited:  PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      justCopied: false,
      visible: props.visible,
    }
  }

  componentDidMount() {
    this.clipboard = new ClipboardJS(this.refs.btn_copy)
    .on('success', (event) => {
      this.setState({ justCopied: true });
      setTimeout(() => this.setState({ justCopied: false }) , 2000);
    }).on('error', (event) => console.log('failed'));
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  onClick(event) {
    Meteor.call('links.setVisibility', this.props._id, !this.state.visible);
    this.setState({ visible: !this.state.visible });
  }

  render() {
    return (
      <div className="item">
        <h2><a href={ this.props.shortUrl } target="_blank">{ this.props.link }</a></h2>
        <p className="item__message">Visited { this.props.visited } times, lastly at { this.props.lastVisited }</p>
        <button className="button button--pill" ref="btn_copy" data-clipboard-text={ this.props.shortUrl }>{ this.state.justCopied ? 'Copied' : 'Copy' }</button>
        <button className="button button--pill" ref="btn_visible" onClick={this.onClick.bind(this)}>{ this.state.visible ? 'Hide' : 'Unhide' }</button>
      </div>
    );
  }
}
