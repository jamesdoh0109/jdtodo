import { useForm } from "react-hook-form";
import { prepareForm } from "util/form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ButtonSubmit from "components/common/Button/ButtonSubmit";
import Message from "components/common/Message";
import FormInput from "components/common/FormInput";

export default function AuthForm({
  submit,
  formInputs,
  status,
  isLoading,
  additionalAction,
  btnTxt = "Submit",
  btnDisabledTxt = "Submitting",
  schemaObj,
}) {
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: prepareForm(formInputs),
    resolver: yupResolver(yup.object(schemaObj)),
    mode: "onChange",
  });

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit(submit)}
    >
      {formInputs.map(({ id, name, type, placeholder }) => (
        <FormInput
          key={id}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          errors={errors}
          register={register}
        />
      ))}
      <div className="flex items-center justify-between">
        <ButtonSubmit
          text={isLoading ? btnDisabledTxt : btnTxt}
          disabled={isLoading || !isValid}
        />
        {additionalAction}
      </div>
      <Message
        messageObj={{
          message: status.message.toString(),
          error: status.error,
        }}
      />
    </form>
  );
}
