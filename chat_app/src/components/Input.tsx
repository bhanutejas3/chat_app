import { ChangeEvent } from "react";

const InputItem = (props: {
  inputType: string;
  placeholder: string;
  name: string;
  inputData: (arg0: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <input
        type={props.inputType}
        className="form-control"
        placeholder={props.placeholder}
        aria-label={props.placeholder}
        name={props.name}
        aria-describedby="basic-addon1"
        onChange={(event) => props.inputData(event)}
      />
    </>
  );
};

export default InputItem;
