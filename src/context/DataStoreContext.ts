import { createContext } from 'react';
import { DataStore } from '../stores/dataStore';

export const DataStoreContext = createContext<DataStore | null>(null);
