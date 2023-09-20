import React from "react";
import Chat from "../../../components/vendor/Chat";
import Navbar from "../../../components/vendor/Navbar";
import Sidebar from "../../../components/vendor/Sidebar";

const ChatPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
      <Sidebar/>
      
      <Chat />
      </div>

 
    </>
  );
};

export default ChatPage;
