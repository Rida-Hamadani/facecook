import React, { Component } from "react";
import './Reviews.css';

class Reviews extends Component {

    constructor(props) {

        super(props);

        this.state = {

            reviews: []

        };

    }

    reviewStars(num) {
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
  
    componentDidMount() {

        fetch(`http://localhost:8888/reviews/${this.props.id}`)
        .then(response => response.json())
        .then(reviews => this.setState({ reviews }));

    }
  
    render() {

        return (

            <div className="reviews-container">
                {this.state.reviews.map(review => (
                    <div key={review.id} className='review'>
                        <div className="profile">
                            <i className="fa fa-user" /> <p className="review-user">{review.uid}</p>
                        </div>
                        <div className="review-header">
                            <h3 className="review-title">{review.title}</h3> 
                            <div className="review-stars">{this.reviewStars(review.stars)}</div>
                        </div>
                        <p className="review-body">{review.body}</p>
                        {localStorage.getItem('user').slice(1,-1)===review.uid ? (
                            <button className='edit'><i class="fa fa-edit" /> Edit</button>
                        ) : (
                            ''
                        )}
                        <hr className="review-divider" />
                    </div>
                ))}
            </div>

        );

    }


}
  

export default Reviews;
