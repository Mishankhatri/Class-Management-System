import React from "react";
import * as MdIcons from "react-icons/md";
import { StudentDelete } from "./../../redux/actions/student/studentactions";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

function CustomConfirm({
  title,
  msg,
  trueActivity,
  falseActivity,
  id,
  setDelete,
}) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const doAction = () => {
    dispatch(StudentDelete(id));
    setDelete(false);
    alert.success(`Deleted Successful`);
  };

  return (
    <React.Fragment>
      <div className="dialog-ovelay">
        <div className="dialog">
          <header>
            <h3>{title}</h3>
            <MdIcons.MdClose
              className="fa-close"
              onClick={() => setDelete(false)}
            />
          </header>

          <div className="dialog-msg">
            <p>{msg}</p>
          </div>
          <footer>
            <div className="controls">
              <button className="button button-danger" onClick={doAction}>
                {trueActivity}
              </button>
              <button
                className="button button-false"
                onClick={() => setDelete(false)}>
                {falseActivity}
              </button>
            </div>
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
}
export default CustomConfirm;
