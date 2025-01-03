import React, { useState } from "react";

const useForm = (initialState, onSubmitCallback) => {
  const [inputs, setInputs] = useState(initialState);

  const updateInput = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (onSubmitCallback && typeof onSubmitCallback === "function") {
      onSubmitCallback(inputs);
    }
  };

  return { inputs, updateInput, submitHandler, setInputs };
};

export default useForm;
