import React from "react";
import InnerHeader from "../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import SelectInputField from "./../../../common/InputField/SelectInputField";
import { useForm, Controller } from "react-hook-form";

function AssignTeacher() {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <React.Fragment>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"Assign Teacher"} />
      <div className="main-content card-section">
        <div className="heading">
          <span className="title-icon">
            <MdIcons.MdVerifiedUser />
          </span>
          <span className="title">ASSIGN TEACHERS</span> {/*Custom  */}
        </div>
        <div className="content-section">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="allinputfield">
              <Controller
                name="selectClass"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <SelectInputField
                    title={"Select Class"}
                    icon={<MdIcons.MdDepartureBoard className="mid-icon" />}
                    name={"selectClass"}
                    onChange={field.onChange}
                    options={[{ label: "12 ", value: "12" }]}
                  />
                )}
              />

              <Controller
                name="selectSection"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <SelectInputField
                    title={"Select Section"}
                    icon={<MdIcons.MdCode className="mid-icon" />}
                    name={"selectSection"}
                    onChange={field.onChange}
                    options={[{ label: "A ", value: "A" }]}
                  />
                )}
              />

              <Controller
                name="selectSubject"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <SelectInputField
                    title={"Select Subject"}
                    icon={<MdIcons.MdSubject className="mid-icon" />}
                    options={[{ label: "Social", value: "Social" }]}
                    name={"selectSubject"}
                    onChange={field.onChange}
                  />
                )}
              />

              <Controller
                name="selectTeacher"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <SelectInputField
                    title={"Assign Teacher"}
                    icon={<MdIcons.MdVerified className="mid-icon" />}
                    name={"selectTeacher"}
                    onChange={field.onChange}
                    options={[{ label: "Mishan ", value: "Mishan" }]}
                  />
                )}
              />
            </div>
            <button className="btn-edit" style={{ marginTop: 20 }}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
export default AssignTeacher;
