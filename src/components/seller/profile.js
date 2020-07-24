import React, { Component } from 'react';
import axios from "axios";
import { SellerNavbar } from '../navigation/sellerNavbar'

class sellerProfile extends Component{
    constructor(props){
        super(props)
        this.state = {
            profile: "",
            address: ""
        }
    
    }
    componentDidMount(){
        const url = "http://localhost:3005/sellers/myProfile";
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
                    profile: response.data[0],
                    address: response.data[0].address
                })
                console.log(this.state.profile)
                console.log(this.state.address)
            }) 
            .catch((error) => {
                console.log(error.response)
            })
    }

    render(){

        return(
            <div>
                <SellerNavbar />
                <div className="col-md-5 center container">
                    <br/><br/>
                    <h2>Seller Profile</h2>
                    <br/><br/><br/><br/>
                    <div className="col-md-6 float-left">
                    <h4>Name: </h4>
                    <h4>Email: </h4>
                    <h4>Phone: </h4>
                    <h4>Address: </h4>
                    <br/><br/><br/><br/>
                    <h4>Wallet Balance: </h4>
                   
                    </div>
                    <div className="col-md-6 float-left">
                    <h4>{this.state.profile.firstName} {this.state.profile.lastName}</h4>
                    <h4>{this.state.profile.email}</h4>
                    <h4>{this.state.profile.phone}</h4>
                    <br/>
                    
                    <h5>
                        {this.state.address.line1} , {this.state.address.line2}<br/>
                        {this.state.address.city} , {this.state.address.state}<br/>
                        Pincode: {this.state.address.pincode}<br/>
                    </h5> 
                    <br/>  
                    <h5>{this.state.profile.wallet}{!this.state.profile.wallet && (<p>0</p>)}</h5>
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default sellerProfile