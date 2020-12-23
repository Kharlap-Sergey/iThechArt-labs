import React, { PureComponent } from "react";
import "./dropdown-menu.scss";
class DropdownMenu extends PureComponent {
  render() {
    return (
      <div className="dropdown-menu1 dropdown-menu1-sw">
        {this.props.children}
      </div>
    );
  }
}

export default DropdownMenu;
