import { useForm } from "react-hook-form";
import { prepareForm } from "util/form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ButtonSubmit from "components/common/Button/ButtonSubmit";
import Message from "components/common/Message";
import FormInput from "components/common/FormInput";

export default function AccountForm({
  submit,
  formInputs,
  status,
  isLoading,
  btnTxt = "Save Changes",
  btnDisabledTxt = "Saving Changes",
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
    <form className="pt-7 pb-8 mb-4" onSubmit={handleSubmit(submit)}>
      {formInputs.map(({ id, name, type, label }) => (
        <FormInput
          key={id}
          id={id}
          name={name}
          type={type}
          label={label}
          errors={errors}
          register={register}
        />
      ))}
      <ButtonSubmit
        text={isLoading ? btnDisabledTxt : btnTxt}
        disabled={isLoading || !isValid}
        color="blue"
      />
      <Message
        messageObj={{
          message: status.message.toString(),
          error: status.error,
        }}
      />
    </form>
  );
}
