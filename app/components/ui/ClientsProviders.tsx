
'use client'; 

import { FiltersProvider } from '@/app/context/FilterContext';
import { store } from '@/app/redux/store';
import { Provider } from 'react-redux';


export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <FiltersProvider>{children}</FiltersProvider>
    </Provider>
  );
}
