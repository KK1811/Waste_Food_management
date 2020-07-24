import React, { Component } from 'react';
import axios from "axios";
import { BuyerNavbar } from '../navigation/buyerNavbar'

class buyerProfile extends Component{
    constructor(props){
        super(props)
        this.state = {
            profile: "",
            address: ""
        }
    
    }
    componentDidMount(){
        const url = "http://localhost:3002/buyers/myProfile";
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
                <BuyerNavbar />
                <div className="col-md-5 center container">
                    <br/><br/>
                    <h2>Customer Profile</h2>
                    <br/><br/><br/><br/>
                    <div className="col-md-6 float-left">
                    <h4>Name: </h4>
                    <h4>Email: </h4>
                    <h4>Phone: </h4>
                    <h4>Address: </h4>
                    <br/><br/><br/><br/>
                    <h4>Wallet Balance: </h4>
                    <h4>Outstanding Bill: </h4>
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
                    <h5>{this.state.profile.outStandingBill}{!this.state.profile.outStandingBill && (<h5>0</h5>)}</h5>

                    <form action="" method="POST">
                        <script src="https://checkout.razorpay.com/v1/checkout.js" 
                        data-key="rzp_test_Brb8XikYT4Alsv" 
                        data-amount={this.state.profile.outStandingBill}
                        data-currency="INR" 
                        data-order_id={this.state.profile.email}
                        data-buttontext="Pay with Razorpay" 
                        data-name="WFM"
                        data-description="Subscription" data-image="https://example.com/your_logo.jpg" 
                        // data-prefill.name=""
                        // data-prefill.email="" 
                        // data-prefill.contact="" 
                        // data-theme.color="#F37254" 
                        />
                        <input type="hidden" custom="Hidden Element" name="hidden" />
                        <button className="btn btn-success">Pay Now</button>
                    </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default buyerProfile