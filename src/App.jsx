import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CL from "./countries.json";

function App() {
  const [countries, setCountries] = useState([]);
  const [data, setData] = useState("");
  const [country, setCountry] = useState("");

  const getList = async () => {
    if (country) {
      const { data } = await axios.get(
        `http://universities.hipolabs.com/search?country=${country}`
      );
      setData(data);
      console.log(data);
    }
  };
  useEffect(() => {
    getList();
    setCountries(CL.countries);
  }, [country]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="form-group col-ms-12 col-md-6">
          <fieldset className="border p-2">
            <legend>Select Country</legend>
            <select
              onChange={(e) => setCountry(e.target.value)}
              className="form-control"
              id="name"
            >
              <option value="">Please select country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </fieldset>
        </div>
        <div className="form-group col-ms-12 col-md-6">
          <fieldset className="border p-2">
            <legend>Select University</legend>
            <select className="form-control" id="name">
              {data ? (
                data.map((university, i) => (
                  <option key={i} value={university.name}>
                    {university.name}
                  </option>
                ))
              ) : (
                <option value="">...</option>
              )}
            </select>
          </fieldset>
        </div>
        <div className="col-ms-12">
          <div>
            <p>loading another infos...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
