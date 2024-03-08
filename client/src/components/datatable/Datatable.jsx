import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const Datatable = () => {
  const [data, setData] = useState([]); // Initialize state for data

  // Function to fetch user data from the backend and set it to state
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users'); // Replace with your backend endpoint
      setData(response.data); // Set data to state
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  // Fetch data from backend when component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`); // Replace with your backend endpoint
      setData(data.filter((item) => item.id !== id)); // Update data in state after deletion
    } catch (error) {
      console.error('Failed to delete data:', error);
    }
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* Remove Link to /users/test */}
            <div className="viewButton">View</div>
            {/* Change onClick handler to handleDelete */}
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        {/* Link to the form for adding a new user */}
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      {/* Render the DataGrid with fetched data and action column */}
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;