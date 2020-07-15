import React from "react";

const ErrorMessage = (props: any) => {
  return (
    <div>
      {props.loading && <p> Loading ... </p>}
      {props.error && <p> Pokemon not found ! </p>}
    </div>
  );
};

export default ErrorMessage;
