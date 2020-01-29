import { createContext } from 'react';

import AuthStore from "./AuthStore";

export const storesContext = createContext({
  AuthStore: new AuthStore()
});
