//import useState hook to create menu collapse state
import React, { useState } from "react";
//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";


const Header = () => {
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)
    const navigate = useNavigate();

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const handleBookmarkIcon = (e) => {
    e.target.active = true;
    console.log("bookmark icon clicked")
    navigate('/bookmarks')
  }

  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "SE" : "Share Egypt"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}>
                Home
              </MenuItem>

              {localStorage.getItem("Type") === "user" && (
                <div className="profile-userSidebar">
                  <div onClick={handleBookmarkIcon}><MenuItem icon={<FaList />}>Bookmarks</MenuItem></div>
                  <MenuItem icon={<RiPencilLine />}>My Reviews</MenuItem>
                  <MenuItem icon={<BiCog />}>Edit Profile</MenuItem>
                </div>
              )}

              {localStorage.getItem("Type") === "charity" && (
                <div className="profile-userSidebar">
                  <div onClick={handleBookmarkIcon}><MenuItem icon={<FaList />}>Bookmarks</MenuItem></div>
                  <MenuItem icon={<RiPencilLine />}>Blog</MenuItem>
                  <MenuItem icon={<BiCog />}>Edit Profile</MenuItem>
                </div>
              )}

            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem href = "/charities" icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;