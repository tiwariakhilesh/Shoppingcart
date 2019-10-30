import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../store/actions/bookActions';
import {Row,Col, Grid} from 'react-bootstrap';
import BookItem from './bookItem';
import BookForm from './bookForm';
import Cart from './cart';

class BookList extends Component{
    componentDidMount(){
        this.props.getBooks();
    }
    render(){
        const bookElement= this.props.books.map((book)=>{
                return(
                    <Col key={book._id} xs={12} sm={6} md={4} lg={4} >
                        <BookItem _id={book._id} 
                        title={book.title}
                        description={book.description} 
                        price={book.price}/>
                    </Col>
                )
        })
        return(
            <Grid>
                <Row>
                    <Cart/>
                </Row>
                <Row>
                    <Col  xs={12} sm={6} md={4} lg={4}>
                        <BookForm/>
                    </Col>
                    {this.props.error?null: bookElement}
                </Row>
           </Grid>
        )
    }
}
function mapStateToProps(state){
return{
    books:state.books.books,
    error:state.books.error
}
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({getBooks:getBooks},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(BookList);