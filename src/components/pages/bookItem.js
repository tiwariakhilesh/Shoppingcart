import React,{Component} from 'react';
import Aux from '../../hoc/auxillary';
import {Button, Well, Row,Col} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {addToCart,updateCart} from '../../store/actions/cartActions';

class BookItem extends Component{
    addToCart=()=>{
        const book=[...this.props.cart,{
            _id:this.props._id,
            description:this.props.description,
            price:this.props.price,
            title:this.props.title,
            quantity:1
        }]
        if(this.props.cart.length > 0){
            const index= this.props.cart.findIndex(cartArr=>{
                return cartArr._id === this.props._id;
            }) 
            if(index === -1){
                this.props.addToCart(book);
            }
            else{
                this.props.updateCart(this.props._id,1,this.props.cart)
            }
        }
        else{
            this.props.addToCart(book);
        }
       
    }
    render(){
        return(
            <Aux>
                <Well>
                    <Row>
                        <Col xs={12}>
                            <h2>{this.props.title}</h2>
                            <p>{this.props.description}</p>
                            <h2>{this.props.price}</h2>
                            <Button bsStyle="primary" onClick={this.addToCart}>Buy Now</Button>
                        </Col>
                    </Row>
                </Well>
            </Aux>
        )
    }
    
}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({
        addToCart:addToCart,
        updateCart:updateCart
    },dispatch);
}
const mapStateToProps=(state)=>{
    return{
        cart:state.cart.cart
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(BookItem);