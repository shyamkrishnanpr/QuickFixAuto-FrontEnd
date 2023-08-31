import React, { useEffect, useState } from "react";
import { fetchUsersApi, blockUserApi } from "../../../services/adminAPI";
import ConfirmationDialog from "../../util/ConfirmationDialog";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmationAction, setConfirmationAction] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = await fetchUsersApi();
        console.log("userInfo at mng", userInfo);
        setUsers((prevUsers) => [...prevUsers, ...userInfo]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const handleCancelVerify = () => {
    setConfirmationAction(null);
    setSelectedUser(null);

  };

  const handleActionConfirmation = (userId, action) => {
    console.log("abc", userId);

    if (action === "block") {
      blockUserApi(userId, true).then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isBlock: true } : user
          )
        );
      });
    } else if (action === "unblock") {
      blockUserApi(userId, false).then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isBlock: false } : user
          )
        );
      });
    }

    setConfirmationAction(null);
    setSelectedUser(null);
  };

  const confirmBlockUser = (userId) => {
    setSelectedUser(userId);
    setConfirmationAction("block");
  };

  const confirmUnblockUser = (userId) => {
    setSelectedUser(userId);
    setConfirmationAction("unblock");
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold text-gray-700">USER MANAGEMENT</h2>
        <table className="w-full border-collapse mt-3  ">
          <thead>
            <tr className="bg-gradient-to-tr from-gray-800 to-gray-300 ">
              <th className=" text-white border border-gray-400 px-4 py-2">
                Name
              </th>
              <th className=" text-white border border-gray-400 px-4 py-2">
                Email
              </th>
              <th className=" text-white border border-gray-400 px-4 py-2">
                Status
              </th>
              <th className=" text-white border border-gray-400 px-4 py-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td className=" px-12 py-2 ">{user.fullName}</td>
                  <td className=" px-12 py-2">{user.email}</td>
                  <td className="px-12 py-2">
                    {user.isBlock ? "Blocked" : "Active"}
                  </td>
                  <td className="px-12 py-2">
                    <button
                      className={`${
                        user.isBlock ? "bg-red-600" : "bg-green-600"
                      } text-white px-2 py-1 rounded `}
                      onClick={() =>
                        user.isBlock
                          ? confirmUnblockUser(user._id)
                          : confirmBlockUser(user._id)
                      }
                    >
                      {user.isBlock ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {confirmationAction && (
          <ConfirmationDialog
            message={`Are you sure you want to ${
              confirmationAction === "block" ? "block" : "unblock"
            } this user...?`}
            onConfirm={() =>
              handleActionConfirmation(selectedUser, confirmationAction)
            }
            onCancel={handleCancelVerify}
          />
        )}
      </div>
    </>
  );
};

export default Users;
