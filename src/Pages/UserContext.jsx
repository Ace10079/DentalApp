// src/contexts/UserContext.jsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [adminName, setAdminName] = useState(null);

  // Add methods to update adminName if needed

  return (
    <UserContext.Provider value={{ adminName, setAdminName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
