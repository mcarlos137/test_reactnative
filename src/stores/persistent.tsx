import { configureStore } from '@reduxjs/toolkit'
import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from '../reducers/user'

const userPersistedReducer = persistReducer(
    {
        key: 'user',
        storage: AsyncStorage,
        whitelist: [
            'id',
            'firstName',
            'lastName',
            'email',
            'phone',
        ]
    }, 
    userReducer
)

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch