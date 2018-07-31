
import React, { Component } from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import SNModal from "./modals/snmodal"
import SUModal from "./modals/sumodal"

export default class nav extends React.Component{

 constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }



  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink href="/" active>SneakerBloc.</NavLink>
          </NavItem>
          <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret>
              Services
            </DropdownToggle>
            <DropdownMenu>
             <DropdownItem  href="/">Start Selling</DropdownItem>
             <DropdownItem  href="/">Become a buyer</DropdownItem>
              <DropdownItem  href="/">Become a verifier!</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavItem>
            <NavLink href="#">Support</NavLink>
          </NavItem>
          <NavItem>
            <NavLink><SUModal/></NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="login" ><SNModal/></NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}