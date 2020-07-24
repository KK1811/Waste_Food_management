import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { HomeNavbar } from '../home/homeNavbar'

class SellerLogin extends Component{
      constructor(props){
        super(props)
        this.state = {
          email: "",
          password: "",
          validEmail: true,
          emailError: "",
          invalidUser: false,
          invalidUserMessage: ""
        }
      }
    
      getData = () => {
        const url = "http://localhost:3005/auth/sellerLogin";
        // var self = this;
        console.log("in getData")
        console.log(this.state)
        axios
          .post(url, {
            email: this.state.email,
            password: this.state.password
          })
          .then((response) => {
            console.log(response);
            this.completeLogin(response);
          })
          .catch((error) => {
            console.log(error);
            this.errorLogin(error);
          });
      };

      errorLogin = e => {
        this.setState({
            invalidUser: true,
            invalidUserMessage: e
          });
      };

      completeLogin = response => {
        if (response.status === 200) {
          console.log("Login successful");
              console.log(response.data.token)
              localStorage.setItem('token',response.data[1].token)
              localStorage.setItem('id', response.data[0].id)
              localStorage.setItem('user', 'seller')
              console.log("Token Stored")  
              this.props.history.push(`/seller/create`) 
              this.props.location.aboutProps.update();
        }
      };

      handleLogin = e => {
        if(this.state.validEmail && !this.state.invalidUser){
          this.getData()
        }
      };

      handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
          });
      };


      handleEmail = e => {
        this.handleChange(e);
        if (
          e.target.value.match(
            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
          )
        ) {
          console.log("valid email");
          if (!this.state.validEmail) {
            this.setState({
              validEmail: true,
              emailError: ""
            });
          }
        } else {
          console.log("invalid email");
          if (this.state.validEmail) {
            this.setState({
              validEmail: false,
              emailError: "Please enter a valid email"
            });
          }
        }
      };

      render(){
          return(
            <div><HomeNavbar />
            <div className="col-md-4 center container">
            <h3 style={{"padding-top":"80px","padding-bottom":"30px"}}>Seller Login</h3>
            <form className="form-group center">

              <p className="text-danger">{this.state.invalidUserMessage.toString()}</p>

              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                className="form-control"
                id="email"
                onChange={this.handleEmail}
                type="email"
                aria-describedby="emailHelp"
                placeholder="Email"
              />

              <p className="text-danger">{this.state.emailError}</p>
              
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                className="form-control"
                id="password"
                onChange={this.handleChange}
                type="password"
                placeholder="Password"
              />
              
            </form>
            <button className="btn btn-success" onClick={this.getData}>Login</button>  
            <br/><br/>
            <Link to='/sellerRegister'>Don't have an account? Register as a seller!</Link>
            </div>
            </div>
          )
      }
}

export default SellerLogin