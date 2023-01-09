import React, { useState, useEffect } from "react";
import axios from "axios";

const Friends = () => {
  const [addFriend, setAddFriend] = useState({
    friend: "",
    handler_id: "",
  });

  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getdata", {
        withCredentials: true,
      })
      .then((res) => {
        setAddFriend({
          handler_id: res.data.acc_info.email,
        });
       
        setFriendList(res.data.acc_info.friends);
      });
  }, []);

  const handleFriend = (e) => {
    const { name, value } = e.target;
    setAddFriend({
      ...addFriend,
      [name]: value,
    });
  };

  const addFriend_btn = () => {
    axios.post("http://localhost:4000/friendList", addFriend).then(() => {
      setAddFriend({ friend: "" });
      document.location.reload();
    });
  };

  return (
    <>
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#friends"
        data-bs-whatever="@mdo"
      >
        Friends
      </button>
      <div
        className="modal fade"
        id="friends"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Friends
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <ul className="list-group">
                  {friendList.map((data, index) => (
                    <li key={!index ? "" : index} className="list-group-item">
                      {!data ? "" : data}
                    </li>
                  ))}
                </ul>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addFriend"
                data-bs-whatever="@mdo"
              >
                Add Friends
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------Add Frieds-------------- */}
      <div
        className="modal fade"
        id="addFriend"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Friends
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Friend Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    name="friend"
                    value={addFriend.friend}
                    onChange={handleFriend}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={addFriend_btn}
                type="button"
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
