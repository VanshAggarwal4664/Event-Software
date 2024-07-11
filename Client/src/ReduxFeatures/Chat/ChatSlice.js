import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatName: null,
  groupAdmin: null,
  users: [],
  _id: null,
  isGroupChat:null
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      // Debug: Log the action payload to check its structure
      console.log('Action Payload:', action.payload);

      const { chatName, groupAdmin, users, _id, isGroupChat } = action.payload;
      
      // Ensure all properties are serializable
      state.chatName = chatName;
      state.groupAdmin = groupAdmin;
      state.users = users;
      state._id = _id;
      state.isGroupChat=isGroupChat 

      // Optional Debug: Log the updated state
      console.log('Updated State:', state);
    }
  }
});

export const { setChat } = chatSlice.actions;
export default chatSlice.reducer;
