import React,{Component} from 'react';
import {Navbar,Badge, Nav,NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {getCart} from '../../store/actions/cartActions'

class NavigationBar extends Component{  
    componentDidMount(){
        this.props.getCart();
    }
    render(){
        return(
            <Navbar inverse fixedTop>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="/">Book Shop</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                            <NavItem eventKey={1} href="/about">
                                About
                            </NavItem>
                            <NavItem eventKey={2} href="/contactus">
                             contactus
                            </NavItem>
                            </Nav>
                            <Nav pullRight>
                            <NavItem eventKey={1} href="/admin">
                                Admin
                            </NavItem>
                            <NavItem eventKey={2} href="/cart">
                                Your Cart {this.props.totalQuantity > 0? <Badge className="badge">{this.props.totalQuantity}</Badge>:null}
                            </NavItem>
                            </Nav>
                        </Navbar.Collapse>
            </Navbar>
        )
    }   
}
const mapStateToProps=(state)=>{
    return{
        totalQuantity:state.cart.totalQuantity
    }
}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({getCart:getCart},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(NavigationBar);