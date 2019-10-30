import React,{Component} from 'react';
import { compose } from 'redux';
import {Panel,Row,Col,Label,Button,ButtonGroup,Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import {deleteFromCart,updateCart} from '../../store/actions/cartActions';
import {bindActionCreators} from 'redux';
import Aux from '../../hoc/auxillary'
class Cart extends Component{
    state={
        show:false
    }
    deleteCartItem=(_id)=>{
        const cartData= [...this.props.cart];
        const itemtoDelete=cartData.findIndex(cartArr=>{
            return cartArr._id === _id;
        })
        const dataAfterDelete= [...cartData.slice(0,itemtoDelete),...cartData.slice(itemtoDelete + 1)];
        this.props.deleteFromCart(dataAfterDelete);
    }
    onIncrement=(_id)=>{
        this.props.updateCart(_id,1,this.props.cart);
    }
    onDecrement=(_id, quantity)=>{
        if(quantity > 1){
            this.props.updateCart(_id,-1,this.props.cart);
        }
       
    }
    handleClose=()=>{
        this.setState({
            show:false
        })
    }
    handleShow=()=>{
        this.setState({
            show:true
        })
    }

    render(){
        const cart= this.props.cart.map((cartArr)=>{
            return(
                <Panel key={cartArr._id} style={{padding:'10px'}}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>Rs. {cartArr.price}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>Qty <Label bsStyle="success">{cartArr.quantity}</Label></h6>
                        </Col>
                        <Col xs={12} sm={4}>
                            <ButtonGroup style={{maxWidth:'300px'}}>
                                <Button bsStyle="default" bsSize="small" onClick={()=>this.onDecrement(cartArr._id, cartArr.quantity)}>-</Button>
                                <Button bsStyle="default" bsSize="small" onClick={()=>this.onIncrement(cartArr._id)}>+</Button>
                                <Button bsStyle="danger" bsSize="small" onClick={()=>this.deleteCartItem(cartArr._id)}>Delete</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel>
            )
           
        })
        return(
            <Aux>
                {this.props.cart[0] ? <Panel headers="Cart" bsStyle="primary" style={{padding:'10px'}}>
                    {cart}
                    <h6>Total quantity: {this.props.totalQuantity}</h6>
                    <h6>Total Price: {this.props.totalAmount}</h6>
                    <Button bsStyle="success" bsSize="small" onClick={this.handleShow}>
                         CheckOut
                    </Button>
                    </Panel>
                :null}
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <h6>Test</h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
            </Aux>
            
        )
    }
   
}
const mapStateToProps=(state)=>{
    return{
        cart:state.cart.cart,
        totalAmount:state.cart.totalAmount,
        totalQuantity:state.cart.totalQuantity
    }
}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({
        deleteFromCart:deleteFromCart,
        updateCart:updateCart
    },dispatch)
    
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);