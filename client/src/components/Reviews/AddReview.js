import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Label from '../../components/label/Label';
import './Reviews.css';

class AddReview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            response: null,
            formData: {
                title: '',
                body: '',
                stars: 5
            }
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        if (!this.state.submitting) {
            this.setState({submitting: true});
            fetch(`https://facecookwalter.000webhostapp.com/reviews/${this.props.id}`, {
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'},
                body: new URLSearchParams({
                        "uid": localStorage.getItem("user").slice(1, -1),
                        "title": this.state.formData.title,
                        "stars": this.state.formData.stars,
                        "body": this.state.formData.body
                })
            })
            .then(response => response.json())
            .then(data => {
                this.setState({

                    response: data,
                    formData: {
                        title: '',
                        body: '',
                        stars: 5
                    }      

                });
            })
            .then(() => window.location.reload())
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


    render() {

        const { formData, response } = this.state;

        return (

            <div className="reviews-container">
                <form onSubmit={this.handleSubmit}>
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
                        {localStorage.getItem('user') ? 
                        <button type='submit'>Add Review</button>
                        : <Link to='/login'><button>Log in</button></Link>}
                    </div>
                    <div>{response && response.errors && <Label message={response.errors[0]}/>}</div>
                    </div>
                </form>
            </div>

        );
        
    }

}

export default AddReview;
