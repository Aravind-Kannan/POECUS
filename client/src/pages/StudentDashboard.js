import axios from "axios";
import jwt from "jsonwebtoken";
import React from "react";

class StudentDashboard extends React.Component {
  state = {
    loading: true,
    formsFilled: [],
    formsHistory: [],
    user: {},
  };

  async componentDidMount() {
    const token = localStorage.getItem("token");
    const decoded = jwt.verify(token, "secret123");
    console.log(decoded);

    this.setState({ ...this.state, user: decoded });
    const formsFilled = await axios.post(
      "http://localhost:3000/studentDashboard/future",
      {
        id: decoded.id,
        registrationNumber: decoded.registrationNumber,
      }
    );

    console.log(formsFilled);

    this.setState({ ...this.state, formsFilled: formsFilled.data.forms });
  }

  render() {
    return (
      <div className="h-screen flex flex-col gap-6">
        <h1 className="text-center font-semibold text-2xl bg-indigo-500 text-white py-6">
          POECUS
        </h1>
        <h1 className="text-5xl font-semibold text-center">
          Hey {this.state.user.name}!
        </h1>
        <div className="mx-6">
          <h2 className="text-3xl">Forms to be filled: </h2>
          {this.state.formsFilled.length === 0 ? (
            <div className="border h-32 grid place-items-center rounded-xl bg-indigo-100 my-6">
              No forms left to be filled
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {this.state.formsFilled.map((form) => {
                return (
                  <div className="border p-4 flex justify-between items-center rounded shadow-lg">
                    <div>
                      <div className="font-semibold text-3xl">
                        {form.elective}
                      </div>
                      <div className="text-sm">
                        <p>Start Time: {form.startTime}</p>
                        <p>End Time: {form.endTime}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-2 font-semibold text-white bg-green-500 hover:bg-green-800 rounded ">
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span className="ml-6">Fill</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="mx-6">
          <h2 className="text-3xl">Forms History: </h2>
          {true && (
            <div className="border h-32 grid place-items-center rounded-xl bg-indigo-100 my-6">
              No forms filled yet
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default StudentDashboard;
