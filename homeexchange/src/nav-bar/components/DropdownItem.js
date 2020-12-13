import React, { PureComponent } from 'react'
import PropTypes from "prop-types"

class DropdownItem extends PureComponent {
    constructor(props) {
        super(props)
    
        this.dropdownMenuRef = React.createRef()
        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.handleMouseOut = this.handleMouseOut.bind(this)
    }
    
    static propTypes = {
        icon: PropTypes.object.isRequired,
        dropdownMenu: PropTypes.object.isRequired
    }

    handleMouseOver(event){
        console.log('event', event);
        event.preventDefault();
        const menu = this.dropdownMenuRef.current;
        menu.classList.remove("display-none");
    }
    handleMouseOut(event){
        console.log('event', event);
        event.preventDefault();
        const menu = this.dropdownMenuRef.current;
        menu.classList.add("display-none");
    }
    render() {
        console.log('this.props', this.props)
        return (
            
            <div onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} className="dropdown-item">
                <div className="deopdown-item__icon" onClick={this.handleNotificClick}>
                    {this.props.icon}
                </div>
                <div ref={this.dropdownMenuRef} className="display-none dropdown-item__menu">
                    {this.props.dropdownMenu}
                </div>
            </div>
        )
    }
}

export default DropdownItem
