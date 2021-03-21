import React, { useCallback, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { baseUrl } from "../constants";
import Loader from "./loader";
import Modal from "./modal";

const UserDetails = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  useEffect(() => {
    setLoader(true);
    fetch(`${baseUrl}/${userId}`)
      .then((res) => res.json())
      .then((user) => setUser(user))
      .catch(() => setError("Cannot fetch user"))
      .finally(() => setLoader(false));
  }, [userId, setLoader]);

  const navigateToEditUser = useCallback(() => {
    history.push(`/edit-user/${userId}`);
  }, [history, userId]);

  const deleteUser = useCallback(() => {
    setLoader(true);
    fetch(`${baseUrl}/${userId}`, {
      method: "DELETE",
    })
      .finally(() => setLoader(false))
      .then(() => history.push(`/user`))
      .catch(() => setError("Cannot delete user"));
  }, [setLoader, userId, setError, history]);

  return (
    <>
      {loader && <Loader />}
      {error ? (
        <h5 className="text-danger">{error}</h5>
      ) : (
        <div className="p-5">
          <div className="row shadow">
            <div className="col-3">
              <img
                src={user?.img}
                className="w-100"
                height="300px"
                alt="user profile pic"
              />
            </div>
            <div className="col-9">
              <h3>{user?.name}</h3>
              <div>
                <span className="text-muted">Address: </span>
                <span>{user?.address}</span>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end m-3">
            <button
              className="btn btn-lg btn-primary m-2"
              onClick={navigateToEditUser}
            >
              Edit
            </button>
            <button
              className="btn btn-lg btn-danger m-2"
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {confirmDelete && (
        <Modal
          onSave={deleteUser}
          title="Confirm Delete"
          message="Are you sure, you want to delete this User?"
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </>
  );
};

export default UserDetails;
