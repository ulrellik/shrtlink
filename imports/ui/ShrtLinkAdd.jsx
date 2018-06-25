import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class ShrtLinkAdd extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onRequestClose = this.onRequestClose.bind(this);
    this.state = {
      url: '',
      isOpen: false,
      error: '',
    }

  }

  onSubmit(event) {
    event.preventDefault();

    // Links.insert({link: this.refs.link.value.trim(), userId: Meteor.userId()});
    Meteor.call('links.insert', this.state.url, (error, response) => {
      if (!error) {
        this.onRequestClose();
      } else {
        this.setState({error: error.reason});
      }
    });
  }

  onChange(event) {
    this.setState({ url: event.target.value.trim() });
  }

  onRequestClose() {
    this.setState({url: '', isOpen: false, error: ''});
  }

  render () {
    return <div>
      <button className="button" onClick={ () => this.setState({ isOpen: true }) }>+ Link</button>
      <Modal
        isOpen={ this.state.isOpen }
        contentLabel="Add link"
        onAfterOpen={ () => this.refs.url.focus() }
        onRequestClose={ this.onRequestClose }
        className="boxed-view__box"
        overlayClassName="boxed-view boxed-view--modal">
        <h1>Add new link</h1>
        { this.state.error && <p>{this.state.error}</p> }
        <form className="boxed-view__form" onSubmit={this.onSubmit}>
          <input type="text" name="link" placeholder="URL" ref="url" value={ this.state.url } onChange={ this.onChange }/>
          <button className="button">Add</button>
          <button className="button button--secondary" type="button" onClick={ this.onRequestClose }>Close</button>
        </form>

      </Modal>
      </div>
  }
}
