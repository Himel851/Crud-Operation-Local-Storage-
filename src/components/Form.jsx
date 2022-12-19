import { useNavigate, useParams } from "react-router-dom";
import { addEmployee, getEmployeeById } from "../service/localstorage";
import { useForm } from "../hooks/useForm";
import uuid from "react-uuid";
import { useState, useEffect } from "react";
import { editEmployee } from "../service/localstorage";
import { getListEmployees } from "../service/localstorage";

import './Form.css'

export const Form = () => {
  const [btn, setBtn] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [showAlert, setshowAlert] = useState(false);
  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    name: "",
    email: "",
    address: "",
    selector: ""
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(getListEmployees());
  }, []);

  useEffect(() => {
    if (id) {
      const employee = getEmployeeById(id);
      setForm(employee);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    id
      ? editEmployee(id, inputValues)
      : addEmployee({ id: uuid(), ...inputValues });
    resetForm();
    setshowAlert(true);
    setTimeout(() => {
      setshowAlert(false);
    }, 2000);
  };

  const checkHandler = (e)=>{
    if (e.target.checked) {
      setBtn(!btn);
    } else {
      setBtn(!btn);
    }
  }

  return (
    <div>
      <div className="d-flex my-5 justify-content-between">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <h1 className="text-center text-white">{id ? "Update" : "Add new"} User</h1>
        <div />
      </div>
      {showAlert && (
        <div className="px-5">
          <div className="alert alert-success">
            <strong>Well done!</strong> {id ? "Update" : "added a new"} User.
          </div>
        </div>
      )}

      <div className="card edit border-primary p-5 m-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label mt-2" htmlFor="inputValid">
              Name
            </label>
            <input
              name="name"
              type="text"
              required
              value={inputValues.name}
              onChange={handleInputChange}
              className="form-control"
              id="inputValid"
            />
          </div>

          {/* <div className="form-group">
            <label className="form-label mt-2" htmlFor="inputValid">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              value={inputValues.email}
              onChange={handleInputChange}
              className="form-control"
              id="inputValid"
            />
          </div> */}

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="inputValid">
              Selectors
            </label>
            {/* <input
              type="text"
              name="address"
              value={inputValues.address}
              onChange={handleInputChange}
              className="form-control"
              id="inputValid"
            /> */}
            <select
              className="form-select"
              aria-label="Default select example"
              name="selector"
              id="inputValid"
              required
              value={inputValues.selector}
              onChange={handleInputChange}
            >
              <option></option>
              <option>Manufacturing</option>
              <option>Construction materials</option>
              <option>Electronics and Optics</option>
              <optio>Food and Beverage</optio>
              <option>Bakery &amp; confectionery products</option>
              <option>Beverages</option>
              <option>Fish &amp; fish products </option>
              <option>Meat &amp; meat products</option>
              <option>Milk &amp; dairy products </option>
              <option>Other</option>
              <option>Sweets &amp; snack food</option>
              <option>Furniture</option>
              <option>Bathroom/sauna </option>
              <option>Bedroom</option>
              <option>Children’s room </option>
              <option>Kitchen </option>
              <option>Living room </option>
              <option>Office</option>
              <option>Other (Furniture)</option>
              <option>Outdoor </option>
              <option>Project furniture</option>
              <option>Machinery</option>
              <option>Machinery components</option>
              <option>Machinery equipment/tools</option>
              <option>Manufacture of machinery </option>
              <option>Maritime</option>
              <option>Aluminium and steel workboats </option>
              <option>Boat/Yacht building</option>
              <option>Ship repair and conversion</option>
              <option>Metal structures</option>
              <option>Other</option>
              <option>Repair and maintenance service</option>
              <option>Metalworking</option>
              <option>Construction of metal structures</option>
              <option>Houses and buildings</option>
              <option>Metal products</option>
              <option>Metal works</option>
              <option>CNC-machining</option>
              <option>Forgings, Fasteners </option>
              <option>Gas, Plasma, Laser cutting</option>
              <option>MIG, TIG, Aluminum welding</option>
              <optio>Plastic and Rubber</optio>
              <option>Packaging</option>
              <option>Plastic goods</option>
              <option>Plastic processing technology</option>
              <option>Blowing</option>
              <option>Moulding</option>
              <option>Plastics welding and processing</option>
              <option>Plastic profiles</option>
              <optio>Printing </optio>
              <option>Advertising</option>
              <option>Book/Periodicals printing</option>
              <option>Labelling and packaging printing</option>
              <option>Textile and Clothing</option>
              <option>Clothing</option>
              <option>Textile</option>
              <option>Wood</option>
              <option>Other (Wood)</option>
              <option>Wooden building materials</option>
              <option>Wooden houses</option>
              <option>Other</option>
              <option>Creative industries</option>
              <option>Energy technology</option>
              <option>Environment</option>
              <option>Service</option>
              <option>Business services</option>
              <option>Engineering</option>
              <option>Information Technology and Telecommunications</option>
              <option>Data processing, Web portals, E-marketing</option>
              <option>Programming, Consultancy</option>
              <option>Software, Hardware</option>
              <option>Telecommunications</option>
              <option>Tourism</option>
              <option>Translation services</option>
              <option>Transport and Logistics</option>
              <option>Air</option>
              <option>Rail</option>
              <option>Road</option>
              <option>Water</option>
            </select>
          </div>
          <div class="form-group form-check mt-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="check"
                  onChange={(e) => checkHandler(e)}
                />
                <label class="form-check-label" for="check">
                  Remember me
                </label>
              </div>

          <div className="text-center gap-2 mt-3">
            <button type="submit" className="btn btn-success"  disabled={btn}>
              {id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
