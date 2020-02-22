import api from "./api";

import { SignUpInterface, SignInInterface } from "../models/auth.model";

export const initialize = () => api.get("me");

export const signUp = (userData: SignUpInterface) => api.post("sign-up", userData);

export const signIn = (userData: SignInInterface) => api.post("sign-in", userData);