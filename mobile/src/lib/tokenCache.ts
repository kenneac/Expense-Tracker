import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export interface TokenCache {
  getToken: (key: string) => Promise<string | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  clearToken?: (key: string) => Promise<void>;
}

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string): Promise<string | null> => {
      if (Platform.OS === 'web') {
        try {
          return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
        } catch (error) {
          console.error('Error reading token from localStorage:', error);
          return null;
        }
      }
      try {
        const item = await SecureStore.getItemAsync(key);
        return item;
      } catch (error) {
        console.error('SecureStore getItemAsync error:', error);
        try {
          await SecureStore.deleteItemAsync(key);
        } catch {
          // ignore cleanup error
        }
        return null;
      }
    },
    saveToken: async (key: string, value: string): Promise<void> => {
      if (Platform.OS === 'web') {
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem(key, value);
          }
        } catch (error) {
          console.error('Error saving token to localStorage:', error);
        }
        return;
      }
      try {
        await SecureStore.setItemAsync(key, value);
      } catch (error) {
        console.error('SecureStore setItemAsync error:', error);
      }
    },
    clearToken: async (key: string): Promise<void> => {
      if (Platform.OS === 'web') {
        try {
          if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
          }
        } catch (error) {
          console.error('Error clearing token from localStorage:', error);
        }
        return;
      }
      try {
        await SecureStore.deleteItemAsync(key);
      } catch (error) {
        console.error('SecureStore deleteItemAsync error:', error);
      }
    },
  };
};

export const tokenCache = createTokenCache();
