//PRINCIPAL
import React, { PropsWithChildren } from "react";
//REACT QUERY
import { QueryClient, QueryClientProvider } from "react-query";
//REDUX
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
//STORES
//import { store as noPersistentStore } from "../stores/noPersistent";
import { store as persistentStore, persistor } from "../src/stores/persistent";

const queryClient = new QueryClient();

export const withQueryClientProvider = (WrappedComponent: any) => {
    const WithComponent = (props: PropsWithChildren) => {
        return (
            <QueryClientProvider contextSharing={true} client={queryClient}>
                <WrappedComponent {...props} />
            </QueryClientProvider>
        );
    }
    return WithComponent;
};

export const withPersistentStore = (WrappedComponent: any) => {
    const WithComponent = (props: PropsWithChildren) => {
        return (
            <Provider store={persistentStore} >
                <PersistGate loading={null} persistor={persistor}>
                    <WrappedComponent {...props} />
                </PersistGate>
            </Provider>
        );
    }
    return WithComponent;
};
