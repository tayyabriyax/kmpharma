import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from "./slices/authSlice";
import distributerReducer from "./slices/distributerSlice";
import supplierReducer from "./slices/supplierSlice";
import partyReducer from "./slices/partySlice";
import vaterinaryProductReducer from "./slices/vaterinaryProductSlice";
import distributerProductReducer from "./slices/distributerProductSlice";
import distrbuterOrderReducer from "./slices/distributerOrderSlice";
import userReducer from "./slices/userSlice";
import reportReducer from "./slices/reportSlice";
import dashboardReducer from "./slices/dashboardSlice";
import ledgerReducer from "./slices/ledgerSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    distributer: distributerReducer,
    supplier: supplierReducer,
    party: partyReducer,
    vaterinaryProduct: vaterinaryProductReducer,
    distributerProduct: distributerProductReducer,
    distributerOrder: distrbuterOrderReducer,
    user: userReducer,
    report: reportReducer,
    dashboard: dashboardReducer,
    ledger: ledgerReducer
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
