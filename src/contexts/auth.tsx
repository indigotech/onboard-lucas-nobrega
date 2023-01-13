import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authService} from '../services/auth-service';
import {GraphQLServerError} from '../global/interfaces/graphql-server-error';
import {Alert} from 'react-native';

export interface AuthData {
  login: {
    token: string;
    __typename?: string;
  };
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  authData: AuthData | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [authData, setAuthData] = useState<AuthContextData['authData']>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    setIsLoading(true);
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
      const graphQLError = error as GraphQLServerError;
      Alert.alert(graphQLError.graphQLErrors[0].message);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true);
      const auth = await authService.signIn(email, password);
      AsyncStorage.setItem('@AuthData', JSON.stringify(auth));
      setAuthData(auth);
    } catch (error) {
      const graphQLError = error as GraphQLServerError;
      Alert.alert(graphQLError.graphQLErrors[0].message);
    } finally {
      setIsLoading(false);
    }
  }
  async function signOut() {
    setAuthData(null);
    AsyncStorage.removeItem('@AuthData');

    return;
  }

  return (
    <AuthContext.Provider value={{authData, signIn, signOut, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
