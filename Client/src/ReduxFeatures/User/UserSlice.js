import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getUserFromSessionStorage = () => {
    try {
      const user = sessionStorage.getItem('user');
      return user ? JSON.parse(user) : { username: "", email: "", role: "",_id:"" };
    } catch (error) {
      console.error("Failed to parse user from sessionStorage:", error);
      return { username: "", email: "", role: "",_id: "" };
    }
  };
const initialState=getUserFromSessionStorage()

const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser: (state,action)=>{
          console.log(action.payload)
         const {email,role,username,_id}=action.payload
               state.username=username
               state.email=email
               state.role=role
               state._id= _id
               sessionStorage.setItem('user', JSON.stringify(state))
        },
       clearUser : (state,action) => {
            state.username = '';
            state.email = '';
            state.role = '';
            state._id= ''
            sessionStorage.removeItem('user');
          }
    }
})

export const {setUser,clearUser} = userSlice.actions
export const fetchCurrentUser = () => async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/user/getUser', { withCredentials: true });
      dispatch(setUser(response.data.data));
    } catch (error) {
      dispatch(clearUser());
    }
  };

export default userSlice.reducer