import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [notesUser, setNotesUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("notesUser");
    if (storedUser) {
      setNotesUser(JSON.parse(storedUser));
    }
  }, []);

  const setAndPersistUser = (user) => {
    setNotesUser(user);
    localStorage.setItem("notesUser", JSON.stringify(user));
  };

  return (
    <AuthContext.Provider
      value={{
        notesUser,
        setNotesUser: setAndPersistUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
