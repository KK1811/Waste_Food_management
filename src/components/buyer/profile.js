import React, { Component } from 'react';
import axios from "axios";
import { BuyerNavbar } from '../navigation/buyerNavbar'
// import  {Payment}  from './payment'

class buyerProfile extends Component{
    constructor(props){
        super(props)
        this.state = {
            profile: "",
            address: "",
            paymentData: ""
        }
    
    }
    componentDidMount(){
        const url = "http://localhost:3002/buyers/myProfile";
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };
        axios                                                                                           //getting profile data
            .get(url, config)
            .then((response) =>{
                this.setState({
                    profile: response.data[0],
                    address: response.data[0].address
                })
            }) 
            .catch((error) => {
                console.log(error.response)
            })
    }

    paymentHandler = async (e) => {
        e.preventDefault();
        const orderUrl = `http://localhost:3002/buyers/order`;
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };
        const response = await axios.get(orderUrl, config).catch(e => console.log(e));                          //getting payment details
        const { data } = response;
        const options = {
          key: process.env.RAZOR_PAY_TEST_KEY,
          name: "Waste Food Management",
          description: "Customer Bill Payment",
          order_id: data.id,
          handler: async (response) => {
            try {
             const paymentId = response.razorpay_payment_id;
             const url = `http://localhost:3002/buyers/capture/${paymentId}`;
             const captureResponse = await axios.post(url, {amount: this.state.profile.outStandingBill}, config).catch(e => console.log(e))
             console.log(captureResponse)                                                                       //posting payment details
            } catch (err) {
              console.log(err);
            }
          },  theme: {
            color: "#686CFD",
          },
        };
        const rzp1 = new window.Razorpay(options);rzp1.open();};

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
                    <h5>{this.state.profile.outStandingBill}{!this.state.profile.outStandingBill && (<h5>0</h5>)}</h5>
                    {/* <Payment /> */}
                    <button className="btn btn-success" onClick={this.paymentHandler}>Pay Now</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default buyerProfile