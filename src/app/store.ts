import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

///////////////////////// BELOW IS CHATGPT EXPLANATION //////////////////////////

// This code is configuring a Redux store using Redux Toolkit. It imports the configureStore function and a user slice (presumably the one you defined in the previous code). It also exports the configured store, as well as types for the root state and dispatch function.

// Here's a breakdown:

// Store Configuration:

// javascript
// Copy code
// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "../features/userSlice";
// Imports the configureStore function from Redux Toolkit and the user slice you previously defined.
// Configure Store:

// javascript
// Copy code
// export const store = configureStore({
//     reducer: {
//         user: userSlice,
//     }
// });
// Configures the Redux store using configureStore. It takes an object as an argument, where reducer is an object specifying the slices of the state and their corresponding reducer functions. In this case, it includes the "user" slice, using the reducer from the userSlice module.
// Root State Type:

// javascript
// Copy code
// export type RootState = ReturnType<typeof store.getState>;
// Exports a type RootState representing the complete shape of the Redux store state. The ReturnType<typeof store.getState> is a TypeScript utility type that infers the type of the state based on the getState method of the store.
// App Dispatch Type:

// javascript
// Copy code
// export type AppDispatch = typeof store.dispatch;
// Exports a type AppDispatch representing the dispatch function type. This is useful for typing action creators and ensuring type safety when dispatching actions.
// In summary, this code sets up a Redux store with a single slice ("user") and exports types for the root state and dispatch function for use in other parts of your application. This configured store can be used to manage and maintain the application's state using Redux.
