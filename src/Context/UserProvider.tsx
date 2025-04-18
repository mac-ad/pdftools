"use client"

import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const generateRandomName = () => {
  const adjectives = ['Happy', 'Lucky', 'Clever', 'Bright', 'Swift'];
  const nouns = ['Panda', 'Tiger', 'Eagle', 'Dolphin', 'Fox'];
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${randomNumber}${new Date().getTime()}`;
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUser({ name: storedName });
    } else {
      const newName = generateRandomName();
      localStorage.setItem('userName', newName);
      setUser({ name: newName });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
