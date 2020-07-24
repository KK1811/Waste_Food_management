import React, { Component } from 'react';
import { BuyerNavbar } from '../navigation/buyerNavbar'

class Payment extends Component{

    paymentHandler = async (e) => {
        const API_URL = 'http://localhost:3002/'
        e.preventDefault();const orderUrl = `${API_URL}buyers/order`;
        const response = await Axios.get(orderUrl);
        const { data } = response;const options = {
          key: process.env.RAZOR_PAY_TEST_KEY,
          name: "Your App Name",
          description: "Some Description",
          order_id: data.id,
          handler: async (response) => {
            try {
             const paymentId = response.razorpay_payment_id;
             const url = `${API_URL}capture/${paymentId}`;
             const captureResponse = await Axios.post(url, {})
             console.log(captureResponse.data);
            } catch (err) {
              console.log(err);
            }
          },  theme: {
            color: "#686CFD",
          },
        };const rzp1 = new window.Razorpay(options);rzp1.open();};

    render(){
        
        return(
            <div>
                <BuyerNavbar />
            <div className="col-md-5 center container">
               
            <button onClick={paymentHandler}>Pay Now</button>
            </div>
            </div>
        )
    }
}

export default Payment