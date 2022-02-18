import React from "react";
import BlankProfile from "../../../assets/profiles/blank-profile.jpg";

function ChangePhoto({
  click,
  setClick,
  onSubmit,
  setPreviosImage,
  setUploadedImage,
  previousImage,
}) {
  //To show preview of image
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviosImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setUploadedImage(e.target.files[0]);
  };

  return (
    <>
      <div className="modal">
        <div
          className={
            click
              ? "model-section upload-image visible"
              : "model-section upload-image"
          }>
          <div className="modal-content">
            <form onSubmit={onSubmit}>
              <span
                className="close"
                onClick={() => {
                  setClick(!click);
                  setPreviosImage(BlankProfile);
                }}>
                &times;
              </span>
              <div className="content">
                <h2>Choose Your Photo</h2>
                <div className="imageholder">
                  <img src={previousImage} alt="Profile-Picture" />
                </div>
                <label htmlFor="file-upload" className="label">
                  <span> Upload Image</span>
                </label>
                <input
                  type="file"
                  name="uploadImage"
                  id="file-upload"
                  accept="image/*"
                  onChange={imageHandler}
                />
                <button className="btn-submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePhoto;
