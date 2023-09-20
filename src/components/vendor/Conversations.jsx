import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetConversation } from "../../store/reducers/vendor/chatServiceSlice";
import { Avatar, notification } from "antd";
import commonUtilites from '../util/common'






const Conversations = (props) => {
  const dispatch = useDispatch();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const vendorId = props?.vendorId;
    dispatch(GetConversation({ vendorId })).then((response) => {
      console.log(response,"at con");
      console.log(response?.payload?.data);
      setConversations(response?.payload?.data);
      props?.setLastMessageStatus(false);
    });
  }, [dispatch, props.user, props.lastMessageStatus]);
  return (
    <>
      <div className="max-h-[calc(100vh-112px)] overflow-y-auto">
        <div className="flex items-center cursor-pointer border-b border-gray-500 py-2 px-4 hover:bg-gray-100 transition-colors"></div>
        <hr className="border-gray-200" />

        {conversations && (
          <React.Fragment>
            {conversations?.map((c) => (
              <div
                key={c._id}
                className="flex items-center cursor-pointer border-b border-gray-200 py-2 px-4 hover:bg-blue-100 transition-colors"
                onClick={() => {
                  props.setUser(c?.userId?._id);
                }}
              >
                <div className="mr-3">
                  <Avatar>
                    {commonUtilites.getInitialsFromName(c?.userId?.fullName)}
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 text-sm">{c?.userId?.fullName}</div>
                  <div className="text-gray-500 text-xs">{c?.lastMessage}</div>
                </div>
              
              </div>
            ))}
          </React.Fragment>
        )}
      </div>
    </>
  );
};

export default Conversations;
