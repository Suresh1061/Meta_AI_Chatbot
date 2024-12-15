import { configureStore } from "@reduxjs/toolkit";
import {
     FLUSH,        // Action to forcefully flush all persisted state (used internally by redux-persist).
     REHYDRATE,    // Action dispatched when the persisted state is rehydrated back into the Redux store.
     PAUSE,        // Action to pause persistence, preventing changes from being written to storage.
     PERSIST,      // Action to start persisting the Redux store state.
     PURGE,        // Action to delete persisted state from storage.
     persistReducer, // Enhances a reducer to add persistence capabilities.
     persistStore, // Creates a persistor object to manage persisting and rehydrating state.
     REGISTER,     // Action to register the persisted state with the Redux store.
} from "redux-persist";

import rootReducer from "./rootReducer";
import reduxStorage from "./Storage";

const persistConfig = {
     key: "root",
     storage: reduxStorage,
     whitelist: ["chat"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
     reducer: persistedReducer,
     middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
               serializableCheck: {
                    ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PURGE, PERSIST],
               },
          }),
});

export const persistor = persistStore(store);
