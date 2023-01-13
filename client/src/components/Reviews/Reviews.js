import React, { Component } from "react";

class Reviews extends Component {

    constructor(props) {

        super(props);

        this.state = {

            comments: []

        };

    }
  
    componentDidMount() {

        fetch(`http://localhost:8888/reviews/${this.props.id}`)
        .then(response => response.json())
        .then(comments => this.setState({ comments }));

    }
  
    render() {

        return (

            <div>
                {this.state.comments.map(comment => (
                    <div key={comment.id}>
                        <h3>{comment.title}</h3>
                        <p>{comment.body}</p>
                        <hr />
                    </div>
                ))}
            </div>

        );

    }

}
  

export default Reviews;
