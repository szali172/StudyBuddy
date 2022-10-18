import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavBarElements";

const Navbar = () => {
return (
<>
  <Nav>
    <NavMenu>
      <NavLink to="/profile" activeStyle>
        My Profile
      </NavLink>
      <NavLink to="/findabuddy" activeStyle>
       Find A Buddy
      </NavLink>
      <NavLink to="/browse" activeStyle>
        Browse
      </NavLink>
      
    </NavMenu>
  </Nav>
</>
);
};

export default Navbar;