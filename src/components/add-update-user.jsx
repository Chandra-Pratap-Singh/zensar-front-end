import React, { useCallback, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { baseUrl, defaultUserdata } from "../constants";
import Loader from "./loader";
import UserCard from "./user-card";

const AddOrEditUser = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [user, setUser] = useState(defaultUserdata);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    setLoader(true);
    fetch(`${baseUrl}/${userId}`)
      .then((res) => res.json())
      .then((user) => setUser(user))
      .catch(() => setError("Cannot fetch user"))
      .finally(() => setLoader(false));
  }, [userId]);

  const updateName = useCallback(
    (event) => {
      setUser({ ...user, name: event.target?.value });
    },
    [setUser, user]
  );

  const updateAddress = useCallback(
    (event) => {
      setUser({ ...user, address: event.target?.value });
    },
    [setUser, user]
  );

  const updateImage = useCallback(
    (event) => {
      const file = event.target?.files?.[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setUser({ ...user, img: fileReader?.result?.toString() });
      };
      fileReader.readAsDataURL(file);
      // setUser({ ...user, img: fileReader.result.toString() });
    },
    [setUser, user]
  );

  const saveUser = useCallback(() => {
    setLoader(true);
    fetch(`${baseUrl}/add-or-update-user`, {
      method: "put",
      body: JSON.stringify({
        user: user,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .finally(() => setLoader(false))
      .then((res) => res.json())
      .catch(() => setError("Cannot fetch user"))
      .then((user) => history.push(`/user/${user?.id}`));
  }, [setLoader, user, setError, history]);

  return (
    <>
      {loader && <Loader />}
      {error ? (
        <h5 className="text-danger">{error}</h5>
      ) : (
        <div className="row justify-content-around m-5">
          <div className="col-lg-6">
            <h3>Update User</h3>
            <div>
              <div className="mb-3">
                <label className="form-label">User Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={user?.name}
                  placeholder="user name"
                  onChange={updateName}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">User Image</label>
                <input
                  className="form-control form-control-lg"
                  id="formFileLg"
                  type="file"
                  onChange={updateImage}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">User Address</label>
                <textarea
                  className="form-control form-control-lg"
                  rows="3"
                  value={user?.address}
                  onChange={updateAddress}
                ></textarea>
              </div>

              <div className="d-flex justify-content-end m-2">
                <button className="btn btn-lg btn-primary" onClick={saveUser}>
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <UserCard user={user} />
          </div>
        </div>
      )}
    </>
  );
};

export default AddOrEditUser;
