import React from 'react'

const Navbar = (props) => {
  return (
    <nav 
      className={"navbar navbar-dark" + (props.fixed ? " sticky-top" : "")}
      style={{backgroundColor:"#008aff"}} 
    >
      <a className="navbar-brand"
          onClick={()=>{props.history.push("/")}}
      >
        <strong className="text-white">Company Name</strong>
      </a>
    </nav>
  );
}

export default Navbar;
