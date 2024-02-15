import { Dropdown } from "flowbite-react";
import React from "react";

const MonthRangeDropdown = ({ monthRange, setMonthRange }) => {
  const label = monthRange === 0 ? "All" : `${monthRange}-month`;

  return (
    <div className="flex justify-end text-baseline px-4 font-semibold text-gray-600">
      <Dropdown inline label={label}>
        <Dropdown.Item>
          <button
            onClick={() => {
              setMonthRange(0);
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            -All-
          </button>
        </Dropdown.Item>
        <Dropdown.Item>
          <button
            onClick={() => {
              setMonthRange(1);
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            1-month
          </button>
        </Dropdown.Item>
        <Dropdown.Item>
          <button
            onClick={() => {
              setMonthRange(3);
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            3-month
          </button>
        </Dropdown.Item>
        <Dropdown.Item>
          <button
            onClick={() => {
              setMonthRange(6);
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            6-month
          </button>
        </Dropdown.Item>
        <Dropdown.Item>
          <button
            onClick={() => {
              setMonthRange(12);
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            12-month
          </button>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default MonthRangeDropdown;
