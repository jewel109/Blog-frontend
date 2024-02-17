// <<<<<<< Updated upstream
// <<<<<<< Updated upstream
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fakeapi } from "../page";
// import { fakeapi } from "../page";
//
// interface UsersState {
//   users: Array<{
//     id: number;
//     name: string;
//     // email: string;
//     //role: string;
//     // Add more properties as needed
//   }>;
//   loading: boolean; // Indicates whether data is being fetched
//   error: string | null; // Stores any error messages
//   success: boolean | null;
// }
//
// const initialState: UsersState = {
//   users: [{ id: 1, name: "jewel", },], // Start with an empty user list
//   loading: false, // Not loading initially
//   error: null,
//   success: null// No errors initially
// };
// export const registerUser = createAsyncThunk('users/userRegister',
//   async (users: UsersState) => {
//     const response = await fetch(`${fakeapi}/users`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(users),
//       const registerUser = createAsyncThunk('users/userRegister',
//         async (user: UsersState) => {
//           const response = await fetch('/api/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(user),
//             export const registerUser = createAsyncThunk('users/userRegister',
//               async (users: UsersState) => {
//                 const response = await fetch(`${fakeapi}/users`, {
//                   method: 'POST',
//                   headers: { 'Content-Type': 'application/json' },
//                   body: JSON.stringify(users),
//                 });
//                 if (response.ok) {
//                   return response.json();
//                 } else {
//                   throw new Error('Registration failed');
//                 }
//               })
// const userState = {
//               id: String,
//               name: "string"
//             }
// export const loginUser = createAsyncThunk('users/loginUser', async (user: typeof userState) => {
//               const response = await fetch(`${fakeapi}/users?username=${user.name}`, { method: 'GET', body: JSON.stringify(user) })
//               if (response.ok) {
//                 return response.json();
//               } else {
//                 throw new Error('Registration failed');
//               }
//
//             })
// export const userSlice = createSlice({
//               name: "users",
//               initialState,
//               reducers: {
//                 // Fetch users
//                 fetchUsersStart(state) {
// =======
// =======
// >>>>>>> Stashed changes
// // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// // import { fakeapi } from "../page";
// // import { fakeapi } from "../page";
// // import { fakeapi } from "../page";
// //
// // interface UsersState {
// //   users: Array<{
// //     id: number;
// //     name: string;
// //   }>
// // }
// // const initialState: UsersState = {
// //   users: [{ id: 1, name: "jewel", },], // Start with an empty user list
// //   loading: false, // Not loading initially
// //   error: null,
// //   success: null// No errors initially
// // };
// // export const registerUser = createAsyncThunk('users/userRegister',
// //   async (users: UsersState) => {
// //     const response = await fetch(`${fakeapi}/users`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(users),
// //       const registerUser = createAsyncThunk('users/userRegister',
// //         async (user: UsersState) => {
// //           const response = await fetch('/api/register', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify(user),
// //             export const registerUser = createAsyncThunk('users/userRegister',
// //               async (users: UsersState) => {
// //                 const response = await fetch(`${fakeapi}/users`, {
// //                   method: 'POST',
// //                   headers: { 'Content-Type': 'application/json' },
// //                   body: JSON.stringify(users),
// //                 });
// //                 if (response.ok) {
// //                   return response.json();
// //                 } else {
// //                   throw new Error('Registration failed');
// //                 }
// //               })
// // const userState = {
// //               id: String,
// //               name: "string"
// //             }
// // export const loginUser = createAsyncThunk('users/loginUser', async (user: typeof userState) => {
// //               const response = await fetch(`${fakeapi}/users?username=${user.name}`, { method: 'GET', body: JSON.stringify(user) })
// //               if (response.ok) {
// //                 return response.json();
// //               } else {
// //                 throw new Error('Registration failed');
// //               }
// //
// //             })
// // const registerUser = createAsyncThunk('users/userRegister',
// //               async (user: UsersState) => {
// //                 const response = await fetch('/api/register', {
// //                   method: 'POST',
// //                   headers: { 'Content-Type': 'application/json' },
// //                   body: JSON.stringify(user),
// //                   export const registerUser = createAsyncThunk('users/userRegister',
// //                     async (users: UsersState) => {
// //                       const response = await fetch(`${fakeapi}/users`, {
// //                         method: 'POST',
// //                         headers: { 'Content-Type': 'application/json' },
// //                         body: JSON.stringify(users),
// //                       });
// //                       if (response.ok) {
// //                         return response.json();
// //                       } else {
// //                         throw new Error('Registration failed');
// //                       }
// //                     })
// // export const userSlice = createSlice({
// //                       name: "users",
// //                       initialState,
// //                       reducers: {
// //                         // Fetch users
// //                         fetchUsersStart(state) {
// <<<<<<< Updated upstream
// >>>>>>> Stashed changes
// =======
// >>>>>>> Stashed changes
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fakeapi } from "../page";
// import { fakeapi } from "../page";
// import { fakeapi } from "../page";
//
// interface UsersState {
//   users: Array<{
//     id: number;
//     name: string;
//     // email: string;
//     const initialState: UsersState = {
//     users: [{ id: 1, name: "jewel", },], // Start with an empty user list
//     loading: false, // Not loading initially
//     error: null,
//     success: null// No errors initially
//     };
// <<<<<<< HEAD
// export const registerUser = createAsyncThunk('users/userRegister',
//       async (users: UsersState) => {
//         const response = await fetch(`${fakeapi}/users`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(users),
//           const registerUser = createAsyncThunk('users/userRegister',
//             async (user: UsersState) => {
//               const response = await fetch('/api/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(user),
//                 export const registerUser = createAsyncThunk('users/userRegister',
//                   async (users: UsersState) => {
//                     const response = await fetch(`${fakeapi}/users`, {
//                       method: 'POST',
//                       headers: { 'Content-Type': 'application/json' },
//                       body: JSON.stringify(users),
//                     });
//                     if (response.ok) {
//                       return response.json();
//                     } else {
//                       throw new Error('Registration failed');
//                     }
//                   })
// const userState = {
//                   id: String,
//                   name: "string"
//                 }
// export const loginUser = createAsyncThunk('users/loginUser', async (user: typeof userState) => {
//                   const response = await fetch(`${fakeapi}/users?username=${user.name}`, { method: 'GET', body: JSON.stringify(user) })
//                   if (response.ok) {
//                     return response.json();
//                   } else {
//                     throw new Error('Registration failed');
//                   }
//
//                 })
// const registerUser = createAsyncThunk('users/userRegister',
//                   async (user: UsersState) => {
//                     const response = await fetch('/api/register', {
//                       method: 'POST',
//                       headers: { 'Content-Type': 'application/json' },
//                       body: JSON.stringify(user),
//                       export const registerUser = createAsyncThunk('users/userRegister',
//                         async (users: UsersState) => {
//                           const response = await fetch(`${fakeapi}/users`, {
//                             method: 'POST',
//                             headers: { 'Content-Type': 'application/json' },
//                             body: JSON.stringify(users),
//                           });
//                           if (response.ok) {
//                             return response.json();
//                           } else {
//                             throw new Error('Registration failed');
//                           }
//                         })
// export const userSlice = createSlice({
//                           name: "users",
//                           initialState,
//                           reducers: {
//                             // Fetch users
//                             fetchUsersStart(state) {
