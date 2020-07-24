import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { HomeNavbar } from '../home/homeNavbar'

class BuyerLogin extends Component{
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
        const url = "http://localhost:3002/auth/buyerLogin";
        axios                                                           //posting user data for validation
          .post(url, {
            email: this.state.email,
            password: this.state.password
          })
          .then((response) => {
            this.completeLogin(response);
          })
          .catch((error) => {
            this.errorLogin(error);
          });
      };

      errorLogin = e => {                                               //checking for invalid user
        this.setState({
            invalidUser: true,
            invalidUserMessage: e
          });
      };

      completeLogin = response => {                                     //completing Login process and storing token
        if (response.status === 200) {
          localStorage.setItem('token',response.data[1].token)
          localStorage.setItem('id', response.data[0].id)
          localStorage.setItem('user', 'buyer')
          this.props.history.push(`/buyer/subscriptions`) 
          this.props.location.aboutProps.update();
        }
      };

      handleLogin = e => {
        if(this.state.validEmail && !this.state.invalidUser){
          this.getData()
        }
      };

      handleChange = e => {                                               //changing state according to the change in input fields
        this.setState({
            [e.target.id]: e.target.value
          });
      };


      handleEmail = e => {                                                 //checking if email is in correct format
        this.handleChange(e);
        if (
          e.target.value.match(
            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
          )
        ) {
          if (!this.state.validEmail) {
            this.setState({
              validEmail: true,
              emailError: ""
            });
          }
        } else {
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
                <h3 style={{"padding-top":"80px","padding-bottom":"30px"}}>Customer Login</h3>
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
                  
                  <Link to='/buyerRegister'>Don't have an account? Register now!</Link>
              </div>
            </div>
          )
      }
}

export default BuyerLogin