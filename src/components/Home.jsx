import { useEffect, useState } from "react";
import { getListEmployees } from "../service/localstorage";
import { useNavigate } from "react-router-dom";
import { View } from "./View";
import './Form.css'

export const Home = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setEmployees(getListEmployees());
  }, []);

  return (
    <div>
      <h1 className="my-5 text-center">
        <button
          className="btn btn-success my-2 my-sm-0"
          onClick={() => navigate("/create")}
        >
          Create 
        </button>
      </h1>

      {employees.length > 0 ? (
        <div className="card  p-4">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                {/* <th scope="col">Email</th> */}
                <th scope="col">Selectors</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <View
                  employee={employee}
                  key={employee.id}
                  setEmployees={setEmployees}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3 className="text-center text-white ">No employees</h3>
      )}
    </div>
  );
};
