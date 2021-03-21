import React, { useCallback, useEffect, useState } from "react";
import { baseUrl } from "../constants";
import UserCard from "./user-card";
import { useHistory } from "react-router-dom";
import Loader from "./loader";

const UserList = () => {
  const [userList, setuserList] = useState();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    setLoader(true);
    fetch(`${baseUrl}`)
      .then((res) => res.json())
      .then((users) => setuserList(users))
      .catch(() => setError("Cannot fetch user list"))
      .finally(() => setLoader(false));
  }, []);

  const history = useHistory();

  const navigateToAddUser = useCallback(() => {
    history.push("/add-user");
  }, [history]);

  const [name, setName] = useState();

  const filterUserByName = useCallback(() => {
    setLoader(true);
    fetch(`${baseUrl}/?name=${name}`)
      .then((res) => res.json())
      .then((users) => setuserList(users))
      .catch(() => setError(`Cannot fetch user list with name = ${name}`))
      .finally(() => setLoader(false));
  }, [setLoader, name, setuserList, setError]);

  return (
    <>
      <div className="bg-light text-white">
        <div className="container-fluid">
          <div className="d-flex justify-content-between w-100 p-2">
            <div className="d-flex">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(event) => setName(event.target.value)}
              />
              <button className="btn btn-secondary" onClick={filterUserByName}>
                Search
              </button>
            </div>
            <div>
              <button className="btn btn-info" onClick={navigateToAddUser}>
                Add User
              </button>
            </div>
          </div>
        </div>
      </div>
      {loader && <Loader />}
      {error ? (
        <h5 className="text-danger">{error}</h5>
      ) : (
        <section className="d-flex flex-wrap">
          {userList?.map((user) => (
            <div key={user.id} className="m-2">
              <UserCard user={user} />
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default UserList;
