import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CL from "./countries.json";

function App() {
  const [countries, setCountries] = useState([]);
  const [data, setData] = useState("");
  const [country, setCountry] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");

  const getUniversities = async () => {
    if (country) {
      const { data } = await axios.get(
        `http://universities.hipolabs.com/search?country=${country}`
      );
      setData(data);
    }
  };

  const getUniversityInfo = async (university) => {
    const { data } = await axios.get(
      `http://universities.hipolabs.com/search?name=${university}&country=${country}`
    );
    setSelectedUniversity(data);
  };

  useEffect(() => {
    getUniversities();
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
            <select
              className="form-control"
              id="name"
              onChange={(e) => getUniversityInfo(e.target.value)}
            >
              <option>Select university</option>
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
      </div>
      <div className="row">
        <div className="col-ms-12 col-md-6">
          <fieldset className="border p-2">
            <legend>Domains</legend>
            <ul>
              {selectedUniversity ? (
                selectedUniversity.map((item, i) => {
                  if (item.domains[1]) {
                    return item.domains.map((element, i) => (
                      <li key={i}>
                        <a href={`https://${element}`} key={i}>
                          {element}
                        </a>
                      </li>
                    ));
                  } else {
                    return (
                      <li key={i}>
                        <a
                          target="_blank"
                          href={`https://${item.domains[0]}`}
                          key={i}
                        >
                          {item.domains[0]}
                        </a>
                      </li>
                    );
                  }
                })
              ) : (
                <p>{selectedUniversity}</p>
              )}
            </ul>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default App;
