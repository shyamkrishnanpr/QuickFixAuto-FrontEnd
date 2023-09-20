import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import socketIOclient from "socket.io-client";
import { GetConversationMessages,GetPrivateChatMessages } from "../../store/reducers/user/ChatServiceSlice";

const UserChatBox = ({ vendorId, userId }) => {
  console.log(userId, vendorId, "in chatbox");
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const [socketConnected, setSocketConnected] = useState(false);

  const socketRef = useRef(null);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const ENDPOINT = "http://localhost:3000";

    socketRef.current = socketIOclient(ENDPOINT);

    if (userId) {
      socketRef.current.emit("setup", userId);
    }
    socketRef.current.on("connected", () => setSocketConnected(true));

    dispatch(GetConversationMessages({ vendorId, userId })).then((response) => {
      console.log(response?.payload?.data);
      const messages = response?.payload?.data;
      let chatId = response?.payload?.data[0]?.conversation;

      socketRef.current.emit("join chat", chatId);
      const filteredMessages = messages?.map((message) => {
        if (message.userbody) {
          return (message = {
            text: message.userbody.trim(),
            sentBy: "devlazar",
            sentAt: parseInt(message.date, 10),
            isChatOwner: true,
          });
        } else {
          return (message = {
            text: message.vendorbody.trim(),
            sentBy: "devlazar",
            sentAt: parseInt(message.date, 10),
            isChatOwner: false,
          });
        }
      });
      console.log(filteredMessages);
      setChatMessages(filteredMessages);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    console.log("msg recieved useeffect");

    socketRef.current.on("message received", (newMessageRecieved) => {
      // console.log(notificationRef.current);

      console.log("newMessageRecieved : ", newMessageRecieved);
      if (!newMessageRecieved.recieverId) {
        console.log("Something went wrong");
      } else {
        const newMessage = {
          text: newMessageRecieved.chat.trim(),
          sentBy: "devlazar",
          sentAt: newMessageRecieved.date,
          isChatOwner: false,
        };
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });
  }, []);


  useEffect(() => {
        
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [inputMessage]);

  //  useEffect(() => {

  //   console.log("herer in side scroll use effect")
  //   chatMessagesRef?.current?.scrollTop = chatMessagesRef.current?.scrollHeight;
  // }, [inputMessage]);

  const handleSubmit = async (e) => {
    const newMessage = {
      text: inputMessage.trim(),
      sentBy: "devlazar",
      sentAt: new Date(),
      isChatOwner: true,
    };

    e.preventDefault();
    if (inputMessage.trim() !== "") {
      // const data=inputMessage.trim();
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      dispatch(
        GetPrivateChatMessages({ vendorId, userId, data: inputMessage.trim() })
      ).then((response) => {
        console.log(response?.payload.data);
        let newMessage = response?.payload.data;

        socketRef.current.emit("new message", newMessage);
      });
      setInputMessage("");
    }
  };

  return (
    <>
      


      <div className="flex flex-col items-center rounded-md justify-start min-h-[400px] sm:min-h-[500px] md:min-h-[500px] lg:min-h-[700px] xl:min-h-[500px] bg-gray-100 text-gray-800">
      {/* Component Start */}
      <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
      
      <div className="flex flex-col flex-grow bg-gray-200 h-0 p-4 overflow-auto" ref={chatMessagesRef}>
          {chatMessages?.map((message, index) => (
            <div
              key={index}
              className={`flex  w-full mt-2 space-x-3 max-w-xs ${
                message?.isChatOwner ? 'ml-auto justify-end' : 'justify-start'
              }`}
            >
              {message?.isChatOwner ? (
                <>
                  
                  <div>
                    <div className="bg-red-500 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p className="text-sm">{message?.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">
                      {new Date(message?.sentAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="bg-gray-400 p-3 rounded-r-lg rounded-bl-lg">
                      <p className="text-sm">{message?.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">
                      {new Date(message?.sentAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  
                </>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-300 p-4">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center">
              <input
                className="flex-1 border rounded-md p-2 mr-2 text-sm"
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Send
              </button>
            </div>
          </form>
        </div>
       
      </div>
      {/* Component End  */}
    </div>
    </>
  );
};

export default UserChatBox;
