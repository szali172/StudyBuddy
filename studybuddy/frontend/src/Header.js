import React from "react";
import Button from '@mui/material/Button';
import { Nav, NavLink, NavMenu } 
    from "./NavBarElements";

const Navbar = () => {
return (
<>
  <Nav>
    <NavMenu>
    <NavLink to="/" activeStyle>
        Home
      </NavLink>
      <NavLink to="/profile" activeStyle>
        My Profile
      </NavLink>
      <NavLink to="/findabuddy" activeStyle>
       Find A Buddy
      </NavLink>
      <NavLink to="/browse" activeStyle>
        Browse
      </NavLink>
      <NavLink to="/learnmore" activeStyle>
        Learn More
      </NavLink>


      <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
      
    </NavMenu>
  </Nav>
</>
);
};

export default Navbar;