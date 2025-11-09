import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from "./slices/authSlice";
import distributerReducer from "./slices/distributerSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    distributer: distributerReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        kmpharma: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
