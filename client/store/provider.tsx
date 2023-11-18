import { Provider } from "react-redux";
import { store } from ".";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export function Providers({ children }: { children: React.ReactNode }) {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
