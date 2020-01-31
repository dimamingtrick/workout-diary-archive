import { useState, useCallback } from "react";

interface UseFormInput {
  value?: string;
  field: string;
  required?: boolean;
  validation?: (inputEvent: string) => boolean;
}

interface FormInput {
  touched: boolean;
  error: string;
  value: string;
  onChange: (_: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  touch: () => void;
}

export const useFormInput = ({
  value = "",
  field,
  required = false,
  validation = (_: string) => true
}: UseFormInput): FormInput => {
  const [input, setInput] = useState(value);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const handleField = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      let error = "";
      if (required && value === "") {
        error = `${field} is required`;
      } else if (!validation(value)) {
        error = `Enter valid ${field}`;
      }
      setInput(value);
      setTouched(true);
      setError(error);
    },
    [field, required, validation]
  );

  const handleTouch = useCallback(
    () => {
      let error = "";
      if (required && input === "") {
        error = `${field} is required`;
      } else if (!validation(input)) {
        error = `Enter valid ${field}`;
      }
      setTouched(true);
      setError(error);
    },
    [input, field, required, validation],
  )

  return {
    touched,
    error,
    value: input,
    onChange: handleField,
    touch: handleTouch
  };
};