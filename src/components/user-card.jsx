import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

const UserCard = ({ user }) => {
  const history = useHistory();
  const navigateToUserDetails = useCallback(() => {
    history.push(`/user/${user?.id}`);
  }, [history, user]);
  return (
    <div
      className="card clickable"
      style={{ width: "18rem" }}
      onClick={navigateToUserDetails}
    >
      <img
        src={user?.img}
        className="card-img-top"
        alt="..."
        width="250px"
        height="250px"
      />
      <div className="card-body">
        <h5 className="card-title">{user?.name}</h5>
        <p className="card-text">{user?.address}</p>
      </div>
    </div>
  );
};

export default UserCard;
