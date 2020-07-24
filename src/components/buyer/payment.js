import React, { Component } from 'react';
import Axios from "axios";
import { BuyerNavbar } from '../navigation/buyerNavbar'

export default class Payment extends Component{

    paymentHandler = async (e) => {
      console.log("in payment")
      e.preventDefault();
      const orderUrl = `http://localhost:3002/buyers/order`;
      const response = await Axios.get(orderUrl);
      const { data } = response;
      console.log(data)
      const options = {
        key: process.env.RAZOR_PAY_TEST_KEY,
        name: "Your App Name",
        description: "Some Description",
        order_id: data.id,
        handler: async (response) => {
          try {
           const paymentId = response.razorpay_payment_id;
           const url = `http://localhost:3002/buyers/capture/${paymentId}`;
           const captureResponse = await Axios.post(url, {})
           console.log(captureResponse.data);
          } catch (err) {
            console.log(err);
          }
        },  theme: {
          color: "#686CFD",
        },
      };
      const rzp1 = new window.Razorpay(options);rzp1.open();}

    render(){
        
        return(
            <div>
                <BuyerNavbar />
            <div className="col-md-5 center container">
               
            <button className="btn btn-success" onClick={this.paymentHandler}>Pay Now</button>
            </div>
            </div>
        )
    }
}
