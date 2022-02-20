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
    const { error, alert, message } = this.props;

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
      if (message?.successPasswordChange)
        alert.success(`${message.successPasswordChange}`);
      if (message?.studentAdd) alert.success(`${message.studentAdd}`);
      if (message?.deleteStudent) alert.success(`${message.deleteStudent}`);
      if (message?.addGenral) alert.success(`${message.addGenral}`);
      if (message?.studentChange) alert.success(`${message.studentChange}`);
      if (message?.parentChange) alert.success(`${message.parentChange}`);
      if (message?.updateUserInfo) alert.success(`${message.updateUserInfo}`);
      if (message?.profileChange) alert.success(`${message.profileChange}`);
      if (message?.deleteTimetables)
        alert.success(`${message.deleteTimetables}`);
      if (message?.addTimetables) alert.success(`${message.addTimetables}`);
      if (message?.changeTimetable) alert.success(`${message.changeTimetable}`);
      if (message?.createAnnouncement)
        alert.success(`${message.createAnnouncement}`);
      if (message?.deleteAnnouncement)
        alert.success(`${message.deleteAnnouncement}`);
      if (message?.addTeacher) alert.success(`${message.addTeacher}`);
      if (message?.assignTeacher) alert.success(`${message.assignTeacher}`);
      if (message?.deleteTeacher) alert.success(`${message.deleteTeacher}`);
      if (message?.deleteLecture) alert.success(`${message.deleteLecture}`);
      if (message?.deleteTeacherAssignment)
        alert.success(`${message.deleteTeacherAssignment}`);
      if (message?.deleteteacherAnnouncement)
        alert.success(`${message.deleteteacherAnnouncement}`);
      if (message?.deleteteacherAnnouncement)
        alert.success(`${message.deleteteacherAnnouncement}`);
      if (message?.changeTeacher) alert.success(`${message.changeTeacher}`);
      if (message?.deleteClass) alert.success(`${message.deleteClass}`);
      if (message?.addClass) alert.success(`${message.addClass}`);
      if (message?.deleteSubject) alert.success(`${message.deleteSubject}`);
      if (message?.deleteAttendance)
        alert.success(`${message.deleteAttendance}`);
      if (message?.addSubject) alert.success(`${message.addSubject}`);
      if (message?.changeSubject) alert.success(`${message.changeSubject}`);
      if (message?.allfields) alert.error(`${message.allfields}`);
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
