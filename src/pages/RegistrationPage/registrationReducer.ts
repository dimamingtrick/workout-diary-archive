import { validateEmail } from "../../helpers";

export const HANDLE_EMAIL = "HANDLE_EMAIL";
export const HANDLE_NAME = "HANDLE_NAME";
export const HANDLE_PASSWORD = "HANDLE_PASSWORD";
export const HANDLE_CONFIRM_PASSWORD = "HANDLE_CONFIRM_PASSWORD";
export const HANDLE_VALIDATE = "HANDLE_VALIDATE";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const HANDLE_ERROR_RESPONSE = "HANDLE_ERROR_RESPONSE";

interface Field {
  value: string;
  touched: boolean;
  error: string;
}

interface FieldAction {
  type: typeof HANDLE_EMAIL | typeof HANDLE_NAME | typeof HANDLE_PASSWORD | typeof HANDLE_CONFIRM_PASSWORD;
  value: string;
}
interface NoPayloadAction {
  type: typeof SET_IS_LOADING | typeof HANDLE_VALIDATE;
}
interface ErrorAction {
  type: typeof HANDLE_ERROR_RESPONSE;
  errors: any[]
}
type RegistrationActions = FieldAction | NoPayloadAction | ErrorAction;

export interface RegistrationFormState {
  email: Field;
  name: Field;
  password: Field;
  confirmPassword: Field;
  isLoading: boolean;
}

const initialState: RegistrationFormState = {
  email: {
    value: "",
    touched: false,
    error: ""
  },
  name: {
    value: "",
    touched: false,
    error: ""
  },
  password: {
    value: "",
    touched: false,
    error: ""
  },
  confirmPassword: {
    value: "",
    touched: false,
    error: ""
  },
  isLoading: false
};

function registrationReducer(state: RegistrationFormState, action: RegistrationActions): RegistrationFormState {
  switch (action.type) {
    case HANDLE_EMAIL:
      return {
        ...state,
        email: {
          value: action.value,
          touched: true,
          error:
            action.value === ""
              ? "Email is required"
              : !validateEmail(action.value)
                ? "Enter valid email"
                : ""
        }
      };

    case HANDLE_NAME:
      return {
        ...state,
        name: {
          value: action.value,
          touched: true,
          error: action.value === "" ? "Name is required" : ""
        }
      };

    case HANDLE_PASSWORD:
      const { confirmPassword } = state;
      return {
        ...state,
        password: {
          value: action.value,
          touched: true,
          error: action.value === "" ? "Password is required" : ""
        },
        confirmPassword: {
          ...confirmPassword,
          error: state.password.touched && confirmPassword.touched && confirmPassword.value !== "" && action.value !== "" && confirmPassword.value !== action.value ? "Passwords doen't match" : state.confirmPassword.error
        }
      };

    case HANDLE_CONFIRM_PASSWORD:
      const { password } = state;
      return {
        ...state,
        confirmPassword: {
          value: action.value,
          touched: true,
          error: action.value === "" ? "Confirm your password" :
            (action.value !== "" && password.value !== "" && action.value !== password.value && "Passwords doesn't match") || ""
        }
      };

    case HANDLE_VALIDATE:
      return {
        ...state,
        email: {
          ...state.email,
          touched: true,
          error:
            state.email.value === ""
              ? "Email is required"
              : !validateEmail(state.email.value)
                ? "Enter valid email"
                : state.email.error
        },
        name: {
          ...state.name,
          touched: true,
          error: state.name.value === "" ? "Name is required" : state.name.error
        },
        password: {
          ...state.password,
          touched: true,
          error: state.password.value === "" ? "Password is required" : state.password.error
        },
        confirmPassword: {
          ...state.confirmPassword,
          touched: true,
          error:
            (state.password.touched && state.password.value !== "" && state.confirmPassword.value === "" && "Confirm your password") ||
            (state.password.touched && state.password.value !== "" && state.confirmPassword.value !== "" && state.password.value !== state.confirmPassword.value && "Passwords doesn't match") ||
            ((!state.confirmPassword.touched || state.confirmPassword.value === "") && "Confirm your password") || state.confirmPassword.error
        }
      };

    case SET_IS_LOADING:
      return {
        ...state,
        email: {
          ...state.email,
          error: ""
        },
        name: {
          ...state.name,
          error: ""
        },
        password: {
          ...state.password,
          error: ""
        },
        confirmPassword: {
          ...state.confirmPassword,
          error: ""
        },
        isLoading: true
      };

    case HANDLE_ERROR_RESPONSE:
      return {
        ...state,
        email: {
          ...state.email,
          touched: true,
          error: getResponseErrorMessage(action.errors, "email")
        },
        name: {
          ...state.name,
          touched: true,
          error: getResponseErrorMessage(action.errors, "name")
        },
        password: {
          ...state.password,
          touched: true,
          error: getResponseErrorMessage(action.errors, "password")
        },
        confirmPassword: {
          ...state.confirmPassword,
          touched: true,

          error: getResponseErrorMessage(action.errors, "confirmPassword")
        },
        isLoading: false
      };

    default:
      return initialState;
  }
}

function getResponseErrorMessage(errors: Array<{ field: string, message: string }>, field: string): string {
  console.log(errors)
  if (!errors || !errors.length) return "";
  const errorField = errors.find(err => err.field === field);
  return errorField ? errorField.message : "";
}

export { registrationReducer, initialState };
