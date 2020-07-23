import React, { Component } from 'react';
import axios from "axios";

class Subscriptions extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: []
        }
    
    }
    componentDidMount(){
        const url = "http://localhost:3002/subscriptions/mySubscriptions/";
        console.log("in getData")
        var token = localStorage.getItem("token");
        console.log(token)
        var config = {
        headers: { "token": token }
        };
        axios
            // .get(url, config, { params: {isPicked: false} })
            .get(url, config)
            .then((response) =>{
                console.log(response.data)
                this.setState({
                    items: response.data
                })
            }) 
            .catch((error) => {
                console.log(error.response)
            })
    }

    componentDidUpdate(){
        const url = "http://localhost:3002/subscriptions/mySubscriptions/";
        // console.log("in getData")
        var token = localStorage.getItem("token");
        // console.log(token)
        var config = {
        headers: { "token": token }
        };
        axios
            .get(url, config)
            .then((response) =>{
                // console.log(response.data)
                this.setState({
                    items: response.data,
                })
            }) 
            .catch((error) => {
                console.log(error.response)
            })
    }

    render(){
        


        var items = this.state.items.map(item => {
            return(
                <div className="row container list-group" key={item._id}>
                    <div className="list-group-item">
                        <div className="col-md-4 float-left">{item.name}</div>
                        {/* <div className="col-md-4 float-left">{item.category}</div> */}
                        <div className="col-md-3 float-left">{item.quantity}</div>
                        {/* <button className="col-md-1 float-right btn btn-danger" value={item._id} onClick={this.handleDelete}>X</button> */}
                        <br/>
                    </div>
                </div>
            )
        })

        return(
            <div className="col-md-5 center container">
                <br/><br/><br/>
                {this.state.items.length == 0 &&(<h4 className="text-danger"> You have no active Subscriptions</h4>)}
            </div>
        )
    }
}

export default Subscriptions