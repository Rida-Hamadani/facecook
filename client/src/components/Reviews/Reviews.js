import React, { Component, Fragment } from "react";
import Label from "../label/Label";
import './Reviews.css';

class Reviews extends Component {

    constructor(props) {

        super(props);

        this.state = {

            reviews: [],
            editing: null,
            errors: null,
            formData: {

                title: '',
                body: '',
                stars: 0

            }

        };

    }

    handleEdit = id => {
        let review = this.state.reviews.find(review => review.id === id);
        this.setState({editing: id, formData: {title: review.title, body: review.body, stars: review.stars}});
    }

    handleDelete = async id => {
        
        let response = await fetch(`http://localhost:8888/reviews/${this.props.id}/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'},
        });

        response = await response.json();

        if (response.message && response.message === `Review ${id} deleted`) {

            this.fetchReviews();

        }

        if (response.errors) {

            this.setState({

                errors: response.errors

            })

        }

    }

    changeEdit = event => {
        const {name, value} = event.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }));
    }

    saveEdit = async event => {
        event.preventDefault();
        let review = this.state.reviews.find(review => review.id === this.state.editing);
        let response = await fetch(`http://localhost:8888/reviews/${this.props.id}/${review.id}`, {
            method: 'PATCH',
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'},
            body: new URLSearchParams({

                "title": this.state.formData.title,
                "stars": this.state.formData.stars,
                "body": this.state.formData.body,

            })
        });
        response = await response.json();

        if (response.review && response.review === `Review ${review.id} updated`) {

            this.fetchReviews();
            this.cancelEditing();

        }

        if (response.errors) {
            this.setState({
                errors: response.errors
            })
        }

    }

    cancelEditing = () => {
        this.setState({
            editing: null,
            errors: null
        });
    }

    reviewStars = num => {
        let stars = [];
        for(let i= 0; i < num; ++i) {

          stars.push(<i key={i} className="fa fa-star colored-star" aria-hidden="true"></i>);

        }

        if (num < 5) {

            for(let i = num; i < 5; ++i) {

                stars.push(<i key={i} className="fa fa-star uncolored-star" aria-hidden="true"></i>);

            }

        }  
        return (
          <div>{stars}</div>
        );
      };

      fetchReviews = () => {

        fetch(`http://localhost:8888/reviews/${this.props.id}`)
        .then(response => response.json())
        .then(reviews => this.setState({ reviews }));

      }
  
    componentDidUpdate(prevProps, prevState) {

        if (prevState.reviews.length === 0 && this.state.reviews.length === 0) {
            this.fetchReviews();
        }
    }
  
    render() {

        const { reviews, formData, errors, editing } = this.state;

        return (

            (reviews && !('messages' in reviews)) ? (<div className="reviews-container">
                {reviews.map(review => (
                    <div key={review.id} className='review'>
                        <div className="profile">
                            <i className="fa fa-user" /> <p className="review-user">{review.uid}</p>
                        </div>
                        {editing === review.id ? (
                            <form onSubmit={this.saveEdit}>
                                <div className="edit-container">
                                <div className="edit-title">
                                    <p>Title:</p> <input 
                                        type='text'
                                        name='title'
                                        value={formData.title}
                                        onChange={this.changeEdit}
                                        required
                                    />
                                    <p>Rating:</p><select
                                        name='stars'
                                        value={formData.stars}
                                        onChange={this.changeEdit}
                                    >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                </div>
                                <div className="edit-body">
                                    <p>Body:</p><textarea
                                        rows="5" 
                                        type='text'
                                        name='body'
                                        value={formData.body}
                                        onChange={this.changeEdit}
                                        required
                                    />
                                </div>
                                <div className="edit-buttons">
                                    <button type='submit'>Save</button>
                                    <button onClick={this.cancelEditing}>Cancel</button>
                                </div>
                                <div>{errors && <Label message={errors[0]}/>}</div>
                                </div>
                            </form>
                        ) : (
                            <Fragment>
                                <div className="review-header">
                                    <h3 className="review-title">{review.title}</h3> 
                                    <div className="review-stars">{this.reviewStars(review.stars)}</div>
                                </div>
                                <p className="review-body">{review.body}</p>
                                {localStorage.getItem('user') && localStorage.getItem('user').slice(1,-1) === review.uid ? (
                                    <div className="edit-buttons">
                                        <button className='edit' onClick={() => {this.handleEdit(review.id)}}>
                                            <i className="fa fa-edit" /> Edit
                                        </button>
                                        <button className='edit' onClick={() => {this.handleDelete(review.id)}}>
                                            <i className="fa fa-trash" /> Delete
                                        </button>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </Fragment>
                        )}
                        <hr className="review-divider" />
                    </div>
                ))}
            </div>
        ) : (
            ''
        )

        );
        
    }
    

}
  

export default Reviews;
