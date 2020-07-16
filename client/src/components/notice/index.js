import React from "react";
import { connect } from "../../redux";
import { withRouter } from "react-router";

class Main extends React.Component {
  clear() {
    this.props.actions.notice.clear();
  }

  componentWillUnmount() {
    this.props.actions.notice.clear();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.actions.notice.clear();
    }
  }

  render() {
    return (
      <div>
        <div style={this.props.globals.notice.message === null ? { display: "none" } : { display: "block" }}>
          <div className="box">
            <p>{this.props.globals.notice.message}</p>
            <button onClick={this.clear.bind(this)}>Got It!</button>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(connect(Main));
