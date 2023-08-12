import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { prepareForm, submitData } from "../../../util/form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ButtonSubmit from "../../common/Button/ButtonSubmit";
import Message from "../../common/Message";
import FormInput from "../../common/FormInput";

export default function AccountForm({
  formInputs,
  fetchData,
  handleResponse,
  status,
  isLoading,
  requestURL,
  requestMethod,
  btnTxt = "Save Changes",
  btnDisabledTxt = "Saving Changes",
  schemaObj,
}) {
  const token = useSelector((state) => state.auth.token);

  const onSubmit = (data) =>
    submitData(
      requestURL,
      requestMethod,
      fetchData,
      handleResponse,
      data,
      token
    );

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
    <form className="pt-7 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
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
