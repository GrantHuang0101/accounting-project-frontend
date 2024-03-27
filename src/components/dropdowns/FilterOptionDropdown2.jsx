import { Dropdown } from "flowbite-react";
import React from "react";

const FilterOptionDropdown2 = ({ filterOption, setFilterOption }) => {
  return (
    <div className="flex justify-end text-baseline px-4 font-semibold text-gray-600">
      <Dropdown inline label={`${filterOption}`}>
        <Dropdown.Item>
          <button
            onClick={() => {
              setFilterOption("Net");
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Net
          </button>
        </Dropdown.Item>
        <Dropdown.Item>
          <button
            onClick={() => {
              setFilterOption("Inflow");
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Inflow
          </button>
        </Dropdown.Item>
        <Dropdown.Item>
          <button
            onClick={() => {
              setFilterOption("Outflow");
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Outflow
          </button>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default FilterOptionDropdown2;
