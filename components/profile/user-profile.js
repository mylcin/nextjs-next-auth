import { useState } from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  const [notification, setNotification] = useState("");
  const [message, setMessage] = useState("");
  const changePasswordHandler = async (passwordData) => {
    setNotification("loading");
    try {
      const res = await fetch("/api/user/change-password", {
        method: "PATCH",
        body: JSON.stringify(passwordData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setNotification("success");
      setMessage(data.message);
    } catch (error) {
      setNotification("error");
      setMessage(error.message);
    }
  };
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
      {notification && notification === "loading" && <p>Loading...</p>}
      {notification && notification === "error" && <p>{message}</p>}
      {notification && notification === "success" && <p>{message}</p>}
    </section>
  );
}

export default UserProfile;
