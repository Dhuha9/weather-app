import React, { useState, useEffect, useRef } from "react";
import "../Styles/TableStyle.css";

const DropdownMenu = ({ weather, label, handleCheckBox, i }) => {
  const [toggle, settoggle] = useState(false);
  const [checked, setchecked] = useState({
    filterdItems: {},
    checkedOptions: {},
  });
  const [weatherFilterOptions, setweatherFilterOptions] = useState({});

  const handleDropdown = () => {
    settoggle((oldtogle) => !oldtogle);
  };

  //trigger only when mouse clicked outside of menu, then close it
  const outside = useRef();
  const handleOutsideClick = (e) => {
    if (outside.current.contains(e.target)) {
      return;
    }
    settoggle(false);
  };

  useEffect(() => {
    //get rid of duplicated values
    setweatherFilterOptions(Array.from(new Set(weather)));
    //
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //for filtering: to Know which row to hide based on the checked item
  const bindCheckWithItem = (itemChecked) => {
    let tempObj = {
      filterdItems: { ...checked.filterdItems },
      checkedOptions: { ...checked.checkedOptions },
    };
    //find the weather value that equals checked value and save the position of the weather array with its check state true/false
    weather.map((item, j) =>
      itemChecked === item
        ? (tempObj.filterdItems = {
            ...tempObj.filterdItems,
            [j]: !tempObj.filterdItems[j],
          })
        : ""
    );
    return tempObj;
  };

  //to save the options with checks even if closing and opining the menu
  const saveCheck = (newState, i) => {
    newState.checkedOptions = {
      ...newState.checkedOptions,
      [i]: !newState.checkedOptions[i],
    };
    return newState;
  };

  return (
    <div className="dropdown " key={"arrow" + label} ref={outside}>
      <div className="table-header">
        <div className="blue-center-text make-cell-table">
          <span>{label}</span>
        </div>
        <div className="make-cell-table">
          <i
            className="arrow down"
            key={"arrow" + label}
            onClick={handleDropdown}
          ></i>
        </div>
      </div>
      {toggle ? (
        <div
          id={"filterDropdown" + label}
          className="dropdown-content"
          key={"d" + label}
        >
          {weatherFilterOptions.map((option, i) => (
            <label htmlFor={i + label + "id"} key={i + label + "lb"}>
              <input
                onChange={() =>
                  setchecked((prev) => {
                    let firstNewState = bindCheckWithItem(option);
                    let newState = saveCheck(firstNewState, i);
                    return { ...prev, ...newState };
                  })
                }
                type="checkbox"
                key={i + label + "cb"}
                id={i + label + "id"}
                value={option}
                checked={checked.checkedOptions[i] || false}
              />
              {option}
            </label>
          ))}
          <div className="center-item" key={"bt" + label}>
            <button
              className="blue-center-text btn-shape"
              onClick={() => {
                settoggle(false);
                handleCheckBox(checked.filterdItems);
              }}
            >
              OK
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
//to prevent unnessary rerending , only render if the object values changed
const checkEquality = (prevDropdownMenu, NextDropdownMenu) =>
  JSON.stringify(prevDropdownMenu) === JSON.stringify(NextDropdownMenu);
export default React.memo(DropdownMenu, checkEquality);
