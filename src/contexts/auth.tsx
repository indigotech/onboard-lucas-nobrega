import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authService} from '../services/auth-service';
import {Alert} from 'react-native';
import {ApolloError} from '@apollo/client';

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
    } catch (error: any) {
      // alterar para serviço de log posteriormente
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      console.log('chegou 0');
      setIsLoading(true);
      console.log('chegou 1');
      const auth = await authService.signIn(email, password);
      console.log('chegou 2');
      await AsyncStorage.setItem('@AuthData', JSON.stringify(auth));
      console.log('chegou 3');
      setAuthData(auth);
    } catch (error: any) {
      if (error instanceof ApolloError) {
        return Alert.alert('Erro de Credenciais', error.message);
      }
      // alterar para serviço de log posteriormente
      Alert.alert('Algo deu errado', 'tente novamente mais tarde.');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function signOut() {
    setAuthData(null);
    await AsyncStorage.removeItem('@AuthData');

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
