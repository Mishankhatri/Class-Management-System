import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error, success, alert, message } = this.props;

    if (error !== prevProps.error) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
      if (error.msg.message)
        alert.error(`Message: ${error.msg.message.join()}`);
      if (error.msg.non_field_errors)
        alert.error(`ERROR: ${error.msg.non_field_errors.join()}`);
      if (error.msg.username) alert.error(`${error.msg.username}`);
      if (error.msg.fullname) alert.error(`${error.msg.fullname}`);
      if (error.msg.password) alert.error(`${error.msg.password}`);
      if (error.msg.detail) alert.error(`${error.msg.detail}`);
      if (error.msg.statusText) alert.error(`${error.msg.statusText}`);
      if (error.msg?.class_name) alert.error(`${error.msg?.class_name[0]}`);
      if (error.msg?.old_password?.old_password)
        alert.error(`${error.msg?.old_password?.old_password}`);
      if (error.msg?.subject_code) alert.error(`${error.msg.subject_code}`);
      if (error.msg?.files_by_admin) alert.error(`${error.msg.files_by_admin}`);
    }

    if (message !== prevProps.message) {
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  success: state.success,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
