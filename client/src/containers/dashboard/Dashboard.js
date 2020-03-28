import React, { Component } from 'react';
import { connect } from "react-redux";

import { getDashboard } from "../../actions/authAction";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="container">
        <div className="my-4">
          <div className="jumbotron text-center bg-danger text-light">
            <div className="container">
              <h1>You are now signed in.</h1>
              <p className="lead">Thank you for using our service!</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer
  };
}


export default connect(mapStateToProps, { getDashboard })(DashBoard);
