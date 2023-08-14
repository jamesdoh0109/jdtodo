import { useState } from "react";
import Message from "components/common/Message";
import Input from "components/common/Input/Input";
import TextArea from "components/common/Input/TextArea";
import Select from "components/common/Input/Select";

export default function FormInput({
  id,
  name,
  type,
  label,
  placeholder,
  errors,
  register,
}) {
  const [fieldActive, setFieldActive] = useState(false);

  const eventHandlers = {
    onKeyUp: (e) => {
      if (e.key !== "Tab" && !fieldActive) {
        // Only set field active if the key was not Tab
        setFieldActive(true);
      } else if (e.key === "Enter" && fieldActive) {
        setFieldActive(false);
      }
    },
    onFocus: () => {
      setFieldActive(true);
    },
  };

  return (
    <div key={id} className="mb-4">
      {label && <label htmlFor={id}>{label}</label>}
      {["text", "password", "datetime-local"].includes(type) ? (
        <Input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          setFieldActive={setFieldActive}
          register={register}
          errors={errors}
          {...eventHandlers}
        />
      ) : type === "textarea" ? (
        <TextArea
          id={id}
          name={name}
          setFieldActive={setFieldActive}
          register={register}
          errors={errors}
          {...eventHandlers}
        />
      ) : (
        <Select
          id={id}
          name={name}
          setFieldActive={setFieldActive}
          register={register}
          errors={errors}
          options={[
            { value: "Not started", text: "Not Started" },
            { value: "In progress", text: "In Progress" },
            { value: "Finished", text: "Finished" },
          ]}
          {...eventHandlers}
        />
      )}
      {!fieldActive && errors[name] && (
        <Message
          messageObj={{
            message: errors[name].message,
            error: true,
          }}
        />
      )}
    </div>
  );
}
