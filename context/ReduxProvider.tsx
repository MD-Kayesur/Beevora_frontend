'use client';

import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import StoreInitializer from './StoreInitializer';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StoreInitializer>{children}</StoreInitializer>
    </Provider>
  );
}
