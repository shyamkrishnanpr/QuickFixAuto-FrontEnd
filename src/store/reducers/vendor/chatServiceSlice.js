import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from '../../../Axios/axios'
import { message } from "antd";


export const GetPrivateChatMessages=createAsyncThunk(
    "chat/getprivatechat",
    async({vendorId,userId,data})=>{
        try{

            const response=await axios.post(`/vendor/chat-sendmessage/${vendorId}/${userId}`,{data});
            console.log(response,"inside get private chat user");
            return response;

        }catch(error){
        console.log(error)
       
        message.error(error.response?.data.message);
        throw error;
        }
    }
)

export const GetConversationMessages=createAsyncThunk(
    "chat/getconversationmessages",
    async({vendorId,userId})=>{
        try{

            const response=await axios.get(`/vendor/chat-conversation/${vendorId}/${userId}`);
            console.log(response,"inside get private chat user");
            return response;

        }catch(error){
        console.log(error)
       
        message.error(error.response?.data.message);
        throw error;
        }
    }
)

export const GetConversation=createAsyncThunk(
    "chat/getconversation",
    async({vendorId,userId})=>{
        try{

            const response=await axios.get(`/vendor/chat-conversations/${vendorId}`);
            console.log(response,"inside get private chat user");
            return response;

        }catch(error){
        console.log(error)
       
        message.error(error.response?.data.message);
        throw error;
        }
    }
)

