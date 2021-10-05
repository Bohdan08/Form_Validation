import React, { useState, createContext } from "react";

type ContextType = {
  user?: { [key: string]: string } | null;
  setUser?: any;
};
export const AuthenticatedUserContext = createContext({} as ContextType);

export const AuthenticatedUserProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
