import React, { FC, ReactNode, createContext, useState } from "react";

interface IUserContext {
  user: string | null;
  picture?: string;
  setUser: (user: string | null) => void;
  setPicture: (picture: string | undefined) => void;
}

export const UserContext = createContext<IUserContext | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({
  children,
}: UserProviderProps) => {
  const [user, setUser] = useState<string | null>(null);
  const [picture, setPicture] = useState<string | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser, picture, setPicture }}>
      {children}
    </UserContext.Provider>
  );
};
