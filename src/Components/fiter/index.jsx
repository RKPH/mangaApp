import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "primereact/dropdown";

import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import "./index.css";
const Filter = ({ sortingOrder, handleFilterChange, statusFilter }) => {
  const sortingOptions = [
    { label: "Mới nhất", value: "moi-nhat" },
    { label: "Cũ nhất", value: "cu-nhat" },
  ];

  const statusOptions = [
    { label: "Tất cả", value: "" },
    { label: "Đã hoàn thành", value: "hoan-thanh" },
    { label: "Đang phát hành", value: "dang-phat-hanh" },
  ];

  return (
    <div className="flex flex-col dark:bg-[#18191A] bg-white rounded-lg p-4 my-5">
      <div className="flex items-center mb-5">
        <span className="font-normal text-black dark:text-[whitesmoke] opacity-35 uppercase text-lg text-left mr-2">
          Sắp xếp theo:{" "}
        </span>
        <Dropdown
          className=" border  text-lg border-black bg-white"
          value={sortingOrder}
          options={sortingOptions}
          onChange={handleFilterChange}
          placeholder="Chọn thứ tự"
        />
      </div>
      <div className="flex items-center">
        <span className="font-normal  text-black text-lg dark:text-[whitesmoke] opacity-35 uppercase text-left mr-6">
          Trạng thái:{" "}
        </span>
        <Dropdown
          className="flex items-center border  text-lg border-black bg-white"
          value={statusFilter}
          options={statusOptions}
          onChange={handleFilterChange}
          placeholder="Chọn trạng thái"
        />
      </div>
    </div>
  );
};

Filter.propTypes = {
  sortingOrder: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  statusFilter: PropTypes.string.isRequired,
};

export default Filter;
