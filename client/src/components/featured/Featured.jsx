import React, { useState, useEffect } from "react";
import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Featured = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(null);

  useEffect(() => {
    const selectedprojetId = 'Project 1'; // Adjust this variable to match the ID of the project you want to fetch progress for

    fetch(`/api/project/progress?selectedprojetId=${selectedprojetId}`)
      .then(response => response.json())
      .then(data => setProgressPercentage(data.progressPercentage))
      .catch(error => console.error(error));
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (projetId) => {
    // You can set the selected project ID here if needed
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">PROJECTS</h1>
        <MoreVertIcon fontSize="small" onClick={handleMenuClick} />
        <Menu
          id="project-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuItemClick("Project 1")}>
            Project 1
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("Project 2")}>
            Project 2
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("Project 3")}>
            Project 3
          </MenuItem>
        </Menu>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={progressPercentage ?? 0} text={`${progressPercentage ?? 0}%`} strokeWidth={5} />
        </div>
        <p className="title"> project progress </p>
        <p className="desc">
          Previous transactions processing. 
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">This week</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">30%</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">last week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">20%</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">20%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
