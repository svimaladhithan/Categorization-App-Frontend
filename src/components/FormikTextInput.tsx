import { useField, FieldConfig } from "formik";
import { TextInput } from "flowbite-react";

interface FormikTextInputProps extends FieldConfig<string> {
  label?: string;
}

const FormikTextInput: React.FC<FormikTextInputProps & React.ComponentProps<typeof TextInput>> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props.name);

  return (
    <div>
      {label && <label>{label}</label>}
      <TextInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-red-600 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikTextInput;