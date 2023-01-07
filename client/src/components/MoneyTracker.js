import React, { useState, useEffect } from "react";
import axios from "axios";
import Friends from "./Friends";

const MoneyTracker = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const todayDate = `${year} / ${
    month < 10 ? `0${month}` : `${month}`
  } / ${date}`;

  const [accInfo, setAccInfo] = useState("");
  const [expenseInfo, setExpesneInfo] = useState([]);
  const [budgetInfo, setBudgetInfo] = useState({
    handler_id: "",
    budget: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/getdata", {
        withCredentials: true,
      })
      .then((res) => {
        setExpesneInfo(res.data.rootUser);
        setAccInfo(res.data.acc_info);
      });
  }, []);

  const [expense, setExpense] = useState({
    handler_id: "",
    category: "",
    description: "",
    amount: 0,
    date: todayDate,
  });

  const handleBudget = (e) => {
    const { name, value } = e.target;
    setBudgetInfo({
      ...budgetInfo,
      [name]: value,
      handler_id: accInfo.email,
      date: todayDate,
    });
  };

  const handleExpense = (e) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: value,
      handler_id: accInfo.email,
      date: todayDate,
    });
  };

  const saveBudget = () => {
    axios.post("http://localhost:4000/budget", budgetInfo).then(() => {
      document.location.reload();
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
      axios.post("http://localhost:4000/expense", expense).then((res) => {
        
        setExpense({
          category: "",
          description: "",
          amount: "",
        });
        document.location.reload();
      });
    }
  };

  const totalExpense = expenseInfo.reduce(
    (total, currentValue) => total = total + currentValue.amount,0
  );

  const totalRemaining = accInfo.budget - totalExpense;

  const deleteItem = (id) => {
    axios.post("http://localhost:4000/deleteItem", { id }).then((res) => {
      alert(res.data.message);
      document.location.reload();
    });
  };

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex mb-3">
          <div className="me-auto p-2">
            <h3>{accInfo.name}</h3>
          </div>
          <div className="p-2 mx-4 m-2 ">
            <h5>
              Budget - <span>&#8377; {accInfo.budget}</span>
            </h5>
          </div>
          <div className="p-2 mx-4 m-2 ">
            <h5>
              Remaining - <span>&#8377; {totalRemaining}</span>
            </h5>
          </div>
          <div className="p-2 m-2">
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#budgetBtn"
              data-bs-whatever="@mdo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </button>
            <div
              className="modal fade"
              id="budgetBtn"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Set Your Budget
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
                      <label htmlFor="message-text" className="col-form-label">
                        Budget:
                      </label>
                      <div className="input-group mb-3">
                        <span className="input-group-text"> &#8377; </span>
                        <input
                          type="number"
                          className="form-control"
                          name="budget"
                          value={budgetInfo.budget}
                          onChange={handleBudget}
                        />
                        <span className="input-group-text">.00</span>
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
                      onClick={saveBudget}
                      type="button"
                      className="btn btn-primary"
                    >
                      Save Budget
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end my-4">
          <div className="mx-2 d-block">
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
            >
              Add expense
            </button>
          </div>
          
          <div className="mx-2">
            <Friends />
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
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
                    <label htmlFor="recipient-name" className="col-form-label">
                      Description:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
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
                        defaultValue={todayDate}
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

        <hr className="bg-dark border-2 border-top border-dark"></hr>

        <table className="table table-striped" style={{ marginBottom: "7rem" }}>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenseInfo.map((data, index) => (
              <tr key={index}>
                <td className="text-wrap" style={{ width: "25rem" }}>
                  {data.category}
                </td>
                <td className="text-wrap" style={{ width: "25rem" }}>
                  {data.description}
                </td>
                <td className="text-wrap" style={{ width: "25rem" }}>
                  {data.amount}
                </td>
                <td className="text-wrap" style={{ width: "25rem" }}>
                  {data.date}
                </td>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="blue"
                    className="bi bi-trash3"
                    viewBox="0 0 16 16"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteItem(data._id)}
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="fixed-bottom d-flex justify-content-center py-4 px-4 bg-light">
          <h4 className="fw-bold">Total expense = &#8377; {totalExpense}</h4>
        </div>
      </div>
    </>
  );
};

export default MoneyTracker;
