import React, { Component } from 'react';
import axios from "axios";
import { BuyerNavbar } from '../navigation/buyerNavbar'

class Subscriptions extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: [],
            delMessage: ""
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
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };
        axios
            .get(url, config)
            .then((response) =>{
                this.setState({
                    items: response.data,
                })
            }) 
            .catch((error) => {
                console.log(error.response)
            })
    }

    handleDelete = e => {
        const url = "http://localhost:3002/subscriptions/"+e.target.value;
        console.log(url)
        console.log("in deleteData")
        var token = localStorage.getItem("token");
        console.log(token)
        axios
            .delete(url, {headers: {"token": token}})
            .then(() => {
                console.log("deleted")
                this.setState({ delMessage: "Item Deleted", addedMessage: "" })
            })
            .catch((error) => {
                console.log(error.response)
            })
    };


    render(){
        
        var items = this.state.items.map(item => {
            return(
                <div className="row container list-group" key={item._id}>
                    <div className="list-group-item">
                    <div className="col-md-4 float-left">{item.name}</div>
                        <div className="col-md-4 float-left">{item.details.name}</div>
                        <div className="col-md-3 float-left">{item.details.quantity}</div>
                        <button className="col-md-1 float-right btn btn-danger" value={item._id} onClick={this.handleDelete}>X</button>
                        <br/>
                    </div>
                </div>
            )
        })

        return(
            <div>
                <BuyerNavbar />
                <div className="col-md-5 center container">
                    <br/><br/>
                    <h4>My Subscriptions</h4>
                    <br/><br/><br/>
                    {this.state.items.length == 0 &&(<h4 className="text-danger"> You have no active Subscriptions</h4>)}
                    
                    {items}
                </div>
            </div>
        )
    }
}

export default Subscriptions