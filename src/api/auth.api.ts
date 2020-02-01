import api from "./api";

import { SignUpInterface, SignInInterface } from "../models/auth.model";

export const signup = (userData: SignUpInterface) => api.post("signup", userData);

export const signin = (userData: SignInInterface) => api.post("signin", userData);