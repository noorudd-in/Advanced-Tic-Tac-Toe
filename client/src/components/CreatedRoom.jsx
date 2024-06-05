import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const toastMessage = localStorage.getItem("toastSuccess");
const roomName = localStorage.getItem("room");
const roomType = localStorage.getItem("roomType");

const CreatedRoom = () => {
  useEffect(() => {
    console.log(toastMessage, roomName, roomType);
    if (toastMessage) {
      toast.success(toastMessage);
    }
  }, [toastMessage]);
  return (
    <>
      <Toaster />
      <h1>You have created a new room</h1>
    </>
  );
};

export default CreatedRoom;
