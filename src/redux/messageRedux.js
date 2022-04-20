import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({ 
  name: "message",
  initialState: {
    messages: [],
    newMessage: "",
    senderCounter: 0,
    arrivalMessage: null,
    currentChat: null,
    conversations: [],
    onlineUsers: [],
  },
  reducers: {
    arrivalMessageSuccess: (state, action) => {
      state.arrivalMessage = action.payload;
    },
    receiverMessageSuccess: (state, action) => {
       state.messages = action.payload;
    },
    senderCounterSuccess: (state, action) => {
      state.senderCounter += action.payload;
   },
    senderMessageSuccess: (state, action) => {
       state.messages = action.payload;
    },
    newMessageSuccess: (state, action) => {
       state.newMessage = action.payload;
    },
    onlineUsersSuccess: (state, action) => {
      state.onlineUsers = action.payload;
    },
    conversationsSuccess: (state, action) => {
      state.conversations = action.payload;
    },
    currentChatSuccess: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const {  currentChatSuccess, arrivalMessageSuccess, senderCounterSuccess, newMessageSuccess, receiverMessageSuccess, senderMessageSuccess, conversationsSuccess, onlineUsersSuccess } = messageSlice.actions;
export default messageSlice.reducer;
