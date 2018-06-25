import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
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

    if (this.refs.password.value.trim().length < 8) {
      return this.setState({
        error: 'Password must be of length 8',
      });
    }

    Accounts.createUser({email: this.refs.email.value.trim(), password: this.refs.password.value.trim()}, (err) => {
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
        <h1>Signup</h1>
        {this.state.error && <p>{this.state.error}</p>}

        <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
          <input type="email" ref="email" name="email" placeholder="E-Mail"/>
          <input type="password" ref="password" name="password" placeholder="Password"/>
          <button className="button">Submit</button>
        </form>

        <Link to="/">Already have an account?</Link>
      </div>
    </div>
  }
}
