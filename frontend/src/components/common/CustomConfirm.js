import React from "react";
import * as MdIcons from "react-icons/md";
import { useDispatch } from "react-redux";

function CustomConfirm({
  title,
  msg,
  trueActivity,
  falseActivity,
  id,
  setDelete,
  PeformDelete,
  reverse = false,
  user,
}) {
  const dispatch = useDispatch();

  const doAction = () => {
    reverse
      ? dispatch(PeformDelete(id, true))
      : user
      ? dispatch(PeformDelete(id, user))
      : dispatch(PeformDelete(id));
    setDelete(false);
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
