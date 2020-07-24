import React, { Component } from 'react';
import axios from "axios";
import { SellerNavbar } from '../navigation/sellerNavbar'

class Orders extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: [],
            options: [],
            name: "",
            category: "",
            quantity: 0,
            addedMessage: "",
            delMessage: ""
        }
    
    }
    componentDidMount(){
            const url = "http://localhost:3005/postings/myPostings";
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
        const url = "http://localhost:3005/postings/myPostings";
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
                        <div className="col-md-4 float-left">{item.item.name}</div>
                        {/* <div className="col-md-4 float-left">{item.category}</div> */}
                        <div className="col-md-3 float-left">{item.quantity}</div>
                        <div className="col-md-3 float-left">
                            <div>{item.isPicked && (<p className="text-success">Picked up</p>)}</div>
                            <div>{!item.isPicked && (<p className="text-danger">Pickup Pending</p>)}</div>
                        </div>
                        {/* <button className="col-md-1 float-right btn btn-danger" value={item._id} onClick={this.handleDelete}>X</button> */}
                        <br/>
                    </div>
                </div>
            )
        })

        return(
            <div><SellerNavbar />
                <div className="col-md-5 center container">
                    <br/><br/><br/>
                    <h3>Past Orders</h3>
                    <br/>
                    <div className="container">{items}</div>
                    <br/><br/>
                </div>
            </div>
        )
    }
}

export default Orders