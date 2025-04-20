import React, { useState, useEffect } from "react"; 
import "../css/DetailedReport.css";
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { PiLessThan } from "react-icons/pi";
import { PiGreaterThan } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import EditModal from "./EditModal";

const DetailedReport = () => {
 
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "users.json"
        );
        const data = await res.json();
        setUsers(data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  const getStatusBadge = (status) => {
    let className = "status-badge ";
    switch (status) {
      case "New":
        className += "bg-blue-100 text-blue-600";
        break;
      case "In-progress":
        className += "bg-yellow-100 text-yellow-700";
        break;
      case "Completed":
        className += "bg-green-100 text-green-700";
        break;
      default:
        className += "bg-gray-100 text-gray-600";
    }
    return <span className={className}>{status}</span>;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container-detailed-report">
      <div className="header-detailed-report">
        <div className="logo-detailed-report">
          <img src="../../img/File text 1.png" alt="" />
          Detailed Report
        </div>
        <div className="button-ex-im">
        <button className="button-import" onClick={handleAddUser}>  
            <FaRegUserCircle /> Add user
          </button>
          <button className="button-import">
            <CiImport /> Import
          </button>
          <button className="button-export">
            <CiExport /> Export
          </button>
        </div>
      </div>
      <div className="main-detailed-report">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="" id="" />
              </th>
              <th>CUSTOMER NAME</th>
              <th>COMPANY</th>
              <th>ORDER VALUE</th>
              <th>ORDER DATE</th>
              <th style={{ textAlign: "center" }}>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" name="" id="" />
                </td>
                <td>
                  <img
                    src="../../img/Avatar 313.png"
                    alt=""
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      marginRight: "10px",
                    }}
                  />
                  {user.customerName}
                </td>
                <td>{user.company}</td>
                <td>{user.orderValue}</td>
                <td>{user.orderDate}</td>
                <td style={{ textAlign: "center" }}>
                  {getStatusBadge(user.status)}
                </td>
                <td>
                  <button>
                    <GoPencil />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <div className="footer-detailed-report">
        <p>63 results</p>
        <div className="number-page-navigation">
          <PiLessThan />
          <button>
            <span>1</span>
          </button>
          <button>
            <span>2</span>
          </button>
          <button>
            <span>3</span>
          </button>
          <button>
            <span>4</span>
          </button>
          <button>
            <span>...</span>
          </button>
          <button>
            <span>10</span>
          </button>
          <button>
            <span>11</span>
          </button>
          <PiGreaterThan />
        </div>
      </div>
    </div>
  );
};

export default DetailedReport;
