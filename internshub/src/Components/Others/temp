import React, { useState, useEffect } from "react";
import { showAlert } from "../Utilities/Alerts";

function Check() {
  const [info, setInfo] = useState({
    subinfo: [],
    count: 0
  });
  useEffect(() => {
    document.title = "InternsHub | Check";
  }, []);
  const alphas = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const addTextbox = () => {
    if (info.count >= 8) {
      showAlert("primary", "Info! Only 8 fields can be added.");
    }
    if (info.count < 8)
      setInfo({
        count: info.count + 1,
        subinfo: [...info.subinfo, ""]
      });
  };
  const removeTextbox = () => {
    if (info.count <= 3) {
      showAlert("primary", "Info! Minimum 3 fields will be added.");
    } else {
      info.subinfo.pop();
      if (info.count > 0)
        setInfo({
          subinfo: info.subinfo,
          count: info.count - 1
        });
    }
  };
  const addSubInfoValue = (e, index) => {
    info.subinfo[index] = e.target.value || "";
    //console.log(e.target.value);
    //console.log(info.subinfo);
    setInfo({ ...info, subinfo: info.subinfo });
  };
  return (
    <div className="container">
      {info.count < 3 ? addTextbox() : ""}
      <div className="form-group">
        <label htmlFor="infoButton">Information:</label>
        <br />
        <button
          id="infoButton"
          className="btn btn-primary btn-sm p-2 px-4"
          onClick={addTextbox}
        >
          <i className="fas fa-plus"></i>
        </button>
        <br />
        <br />
        <button
          id="infoButton"
          className="btn btn-primary btn-sm p-2 px-4 "
          onClick={removeTextbox}
        >
          <i className="fas fa-minus"></i>
        </button>
      </div>
      <hr />
      {info.subinfo.map((info, index) => {
        return (
          <div className="form-group" key={index}>
            <label htmlFor={index}>{alphas[index]}:</label>
            {` `}
            <input
              id={index}
              type="text"
              value={info}
              onChange={e => addSubInfoValue(e, index)}
            />
          </div>
        );
      })}
      {/* {console.log(info)} */}

      {info.subinfo.map((data, index) => {
        return (
          <div key={index}>
            {index + 1}: {data}
            <br />
          </div>
        );
      })}
    </div>
  );
}
export default Check;
