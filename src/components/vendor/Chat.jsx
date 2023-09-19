import React, { useState } from 'react'
import Conversations from './Conversations';
import ChatBox from './ChatBox';

const Chat = () => {
    const [user, setUser] = useState(null);
  const [lastMessageStatus, setLastMessageStatus] = useState(false);
  const [unread,setUnread]=useState(false);
  const vendorToken = localStorage.getItem('vendorToken')
  const parsedVendorToken = JSON.parse(vendorToken);
  const vendorId = parsedVendorToken?.vendorId;

  
  return (
    <>
      
      <div className="flex flex-col sm:flex-row gap-4">
  <div className="w-full sm:w-1/3">
    <div className="h-full bg-white rounded-lg shadow-md">
      <div className="border-b">
        <ul className="flex">
          <li className="w-full py-2 text-center cursor-pointer text-blue-500 border-b-2 border-blue-500">
            Chats
          </li>
        </ul>
      </div>
      <Conversations setUser={setUser} user={user} vendorId={vendorId} unread={unread} setLastMessageStatus={setLastMessageStatus} lastMessageStatus={lastMessageStatus}/>
    </div>
  </div>
  <div className="flex-1">
    {user && <ChatBox userId={user} vendorId={vendorId} setUnread={setUnread} lastMessageStatus={lastMessageStatus} setLastMessageStatus={setLastMessageStatus} />}
  </div>
</div>
    </>
  )
}

export default Chat
