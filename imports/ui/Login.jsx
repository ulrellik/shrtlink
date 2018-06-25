import React from 'react';
import { Link } from "react-router-dom";
import { Meteor } from 'meteor/meteor'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    // https://daveceddia.com/avoid-bind-when-passing-props/
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      error: '',
    }
  }

  onSubmit(event) {
    event.preventDefault();

    Meteor.loginWithPassword({email: this.refs.email.value.trim()}, this.refs.password.value.trim(), (err) => {
      if (err) {
        this.setState({
          error: err.message,
        });
      }
    });
  }

  render () {
    return <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Login</h1>
        {this.state.error && <p>{this.state.error}</p>}

        <form onSubmit={this.onSubmit} className="boxed-view__form">
          <input type="email" ref="email" name="email" placeholder="E-Mail"/>
          <input type="password" ref="password" name="password" placeholder="Password"/>
          <button className="button">Login</button>
        </form>
        <Link to="/signup">Not having an account?</Link>
      </div>
    </div>
  }
}
