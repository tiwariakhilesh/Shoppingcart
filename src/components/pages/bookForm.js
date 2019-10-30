import React,{Component} from 'react';
import {Row,Col,Well,Panel,FormControl,ControlLabel,FormGroup,Button} from 'react-bootstrap';
import {postBooks} from '../../store/actions/bookActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';

class BookForm extends Component{
    handleSubmit=()=>{
        const book=[{
            title:findDOMNode(this.refs.title).value,
            description:findDOMNode(this.refs.description).value,
            price:findDOMNode(this.refs.price).value
        }]
        this.props.postBooks(book);
    }
    render(){
        return(
            <Well>
                <Panel style={{padding:'10px'}}>
                    <FormGroup controlId="title">
                        <ControlLabel>Title</ControlLabel>
                        <FormControl type="text" 
                            placeholder="Enter Title" 
                            ref="title"/>
                        </FormGroup>
               
                    <FormGroup controlId="description">
                        <ControlLabel>Description</ControlLabel>
                        <FormControl type="text" 
                            placeholder="Enter description" 
                            ref="description"/>
                    </FormGroup>
               
                    <FormGroup controlId="price">
                        <ControlLabel>Price</ControlLabel>
                        <FormControl type="text" 
                            placeholder="Enter price" 
                            ref="price"/>
                    </FormGroup>
               
                
                    <Button bsStyle="primary"  onClick={this.handleSubmit}>Save</Button>
                </Panel>
            </Well>
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({postBooks:postBooks},dispatch);
}
export default connect(null,mapDispatchToProps)(BookForm);
