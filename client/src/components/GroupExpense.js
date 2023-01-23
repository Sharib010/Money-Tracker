import React, { useState, useEffect } from "react";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";

const GroupExpense = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const todayDate = `${year} / ${
    month < 10 ? `0${month}` : `${month}`
  } / ${date}`;

  const [accInfo, setAccInfo] = useState([]);
  const [frndList, setFrndList] = useState([]);
  const [addFrnd, setAddFrnd] = useState([]);
  const [expense, setExpense] = useState({
    handler_id: "",
    category: "",
    description: "",
    group_name: "",
    group_member: {},
    amount: 0,
    date: todayDate,
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/getdata", {
        withCredentials: true,
      })
      .then((res) => {
        setAccInfo(res.data.acc_info);
        const newList = res.data.acc_info.friends.map((new_List) => ({
          label: new_List,
        }));
        setFrndList(newList);
      });
  }, []);

  const handleExpense = (e) => {
    const { name, value } = e.target;
    let _result = addFrnd.map((a) =>  a.label );
    let result = _result.join(", ")
    setExpense({
      ...expense,
      [name]: value,
      handler_id: accInfo.email,
      date: todayDate,
      group_member: result,
    });
  };

  const addExpense = () => {
    if (
      !expense.handler_id ||
      !expense.category ||
      !expense.description ||
      expense.amount === 0
    ) {
      alert("fill all");
    } else {
      axios.post("http://localhost:4000/groupExpense", expense).then((res) => {
        setExpense({
          category: "",
          description: "",
          amount: "",
        });
        document.location.reload();
      });
      console.log(expense);
    }
  };

  // console.log(addFrnd)

  return (
    <>
      <div className="mx-2 d-block">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#GroupExpense"
          data-bs-whatever="@mdo"
        >
          Add Group Expense
        </button>
      </div>

      <div
        className="modal fade"
        id="GroupExpense"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                New expense
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
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      name="category"
                      defaultValue="General"
                      onChange={handleExpense}
                    >
                      <option defaultValue="General">Category</option>
                      <option value="General">General</option>
                      <option value="Food">Food</option>
                      <option value="Electricity">Electricity</option>
                      <option value="Dinner">Dinner</option>
                      <option value="Gift">Gift</option>
                      <option value="Groceries">Groceries</option>
                      <option value="Movies">Movies</option>
                      <option value="Rent">Rent</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Other">Other</option>
                    </select>
                    <label htmlFor="floatingSelect">Category</label>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="col-form-label">
                    Group Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    name="group_name"
                    value={expense.group_name}
                    onChange={handleExpense}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="col-form-label">
                    Group Memebers:
                  </label>
                  <MultiSelect
                    options={frndList}
                    value={addFrnd}
                    onChange={setAddFrnd}
                    labelledBy="Select"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="col-form-label">
                    Description:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    name="description"
                    value={expense.description}
                    onChange={handleExpense}
                  />
                </div>
                <div className="mb-3">
                  <div className="input-group mb-3">
                    <span className="input-group-text"> &#8377; </span>
                    <input
                      type="number"
                      className="form-control"
                      aria-label="Amount (to the nearest dollar)"
                      name="amount"
                      value={expense.amount}
                      onChange={handleExpense}
                    />
                    <span className="input-group-text">.00</span>
                  </div>
                </div>
                <label htmlFor="date" className="col-1 col-form-label">
                  Date
                </label>
                <div className="col-5">
                  <div className="input-group date">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={!todayDate ? "" : todayDate}
                      id="date"
                    />
                  </div>
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
                onClick={addExpense}
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

export default GroupExpense;
