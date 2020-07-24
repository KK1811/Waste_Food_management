import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { HomeNavbar } from '../home/homeNavbar'

class BuyerRegister extends Component{
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: 0,
        address: {
            line1: "",
            line2: "",
            city: "",
            state: "",
            pincode: 0
        },
        location: {
            lat: 0.0,
            long: 0.0
        },
        confPassword: "",
        existingEmail: false,
        existingEmailMessage: "",
        validEmail: true,
        emailError: "",
        validName: true,
        nameError: "",
        matchPassword: true,
        passwordError: "",
        validPhone: true,
        phoneError: "",
        validPincode: true,
        pincodeError: ""
      };
    
      getData = () => {
        const url = "http://localhost:3002/auth/registerBuyer";
        axios                                                                         //sending user data for registration
          .post(url, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            address: this.state.address,
            location: this.state.location
          })
          .then((response) => {
            this.completeRegister(response);
          })
          .catch((error) => {
            this.handleExistingEmail(error.response)
          });
      };

      handleExistingEmail = (response) => {                                             //checking for existing user
          if(response.status == 409){
              this.setState({
                  existingEmail: true,
                  existingEmailMessage: "User with this email already exists"
              });
          }else{
            this.setState({
                existingEmail: false,
                existingEmailMessage: ""
            });    
          }
      };

      completeRegister = response => {                                                 //completing registration and storing token
        if (response.status === 200) {
            localStorage.setItem('token',response.data[1].token)
            localStorage.setItem('id', response.data[0].id)
            localStorage.setItem('user', 'buyer')
            this.props.history.push(`/buyer/subscriptions`) 
        }
      };

      handleChange = e => {                                                           //changing state according to the change in input fields
        this.setState({
            [e.target.id]: e.target.value 
          });
      };

      handleChangeAddress = e => {
        this.setState({
            address: { ...this.state.address, [e.target.id]: e.target.value }
          });
      };

      handleEmail = e => {                                                            //checking if email is in correct format
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

      handlePassword = e => {                                                       //checking if passwords match
          this.handleChange(e)
          if(this.state.password === e.target.value){
            this.setState({
                matchPassword: true,
                passwordError: ""
            });
          }else{
              this.setState({
                  matchPassword: false,
                  passwordError: "Passwords don't match"
              });
          }
      };

      handleName = e => {                                                           //checking validity of name
        this.handleChange(e);
        if (e.target.value.match(/^[A-Za-z\d_]*$/)) {
          this.setState({
            validName: true,
            nameError: ""
          });
        } else {
            this.setState({
                validName: false,
                nameError: "Please enter a valid name"
            });
        }
      };

      handlePhone = e => {                                                            //checking validity of phone number
        this.handleChange(e); 
        if (isNaN(e.target.value) || Number(e.target.value) < 0 || Number(e.target.value) < 1000000000 || Number(e.target.value) > 9999999999) {
          this.setState({
            validPhone: false,
            phoneError: "Please enter a valid phone number"
          });
        } else {
          this.setState({
            validPhone: true,
            phoneError: ""
          });
        }
      };

      handlePincode = e => {                                                          //checking validity of phone number
        this.setState({
          address: { ...this.state.address, [e.target.id]: e.target.value }
        });
        if (isNaN(e.target.value) || Number(e.target.value) < 0 || Number(e.target.value) < 100000 || Number(e.target.value) > 999999) {
          this.setState({
            validPincode: false,
            pincodeError: "Please enter a valid pincode"
          });
        } else {
          this.setState({
            validPincode: true,
            pincodeError: ""
          });
        }
      };

      handleRegister = () => {
          if(this.state.validEmail && this.state.validName && this.state.validPhone && this.state.validPincode && this.state.matchPassword){
              this.getData()
          }
      }

      render(){
          return(
            <div><HomeNavbar />
            <div className="col-md-4 center container">
                <h3 style={{"padding-top":"80px","padding-bottom":"30px"}}>Customer Registration</h3>
                <form className="form-group center">

                    <p className="text-danger">{this.state.existingEmailMessage}</p>

                    <label htmlFor="exampleInputEmail1">First Name</label>
                    <input
                        className="form-control"
                        id="firstName"
                        onChange={this.handleName}
                        type="text"
                        aria-describedby="emailHelp"
                        placeholder="First Name"
                    />

                    <label htmlFor="exampleInputEmail1">Last Name</label>
                    <input
                        className="form-control"
                        id="lastName"
                        onChange={this.handleName}
                        type="text"
                        aria-describedby="emailHelp"
                        placeholder="Last Name"
                    />

                    <p className="text-danger">{this.state.nameError}</p>
                    
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

                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input
                        className="form-control"
                        id="confPassword"
                        onChange={this.handlePassword}
                        type="password"
                        placeholder="Password"
                    />

                    <p className="text-danger">{this.state.passwordError}</p>

                    <h5>Address</h5>

                    <label htmlFor="exampleInputEmail1">Line 1</label>
                    <input
                        className="form-control"
                        id="line1"
                        onChange={this.handleChangeAddress}
                        type="text"
                        aria-describedby="emailHelp"
                        placeholder="Line 1"
                    />

                    <label htmlFor="exampleInputEmail1">Line 2</label>
                    <input
                        className="form-control"
                        id="line2"
                        onChange={this.handleChangeAddress}
                        type="text"
                        aria-describedby="emailHelp"
                        placeholder="Line 2"
                    />

                    <label htmlFor="exampleInputEmail1">City</label>
                    <input
                        className="form-control"
                        id="city"
                        onChange={this.handleChangeAddress}
                        type="text"
                        aria-describedby="emailHelp"
                        placeholder="City"
                    />

                    <label htmlFor="exampleInputEmail1">State</label>
                    <input
                        className="form-control"
                        id="state"
                        onChange={this.handleChangeAddress}
                        type="text"
                        aria-describedby="emailHelp"
                        placeholder="State"
                    />

                    <label htmlFor="exampleInputEmail1">Pincode</label>
                    <input
                        className="form-control"
                        id="pincode"
                        onChange={this.handlePincode}
                        type="number"
                        aria-describedby="emailHelp"
                        placeholder="Pincode"
                    />

                    <p className="text-danger">{this.state.pincodeError}</p>

                    <label htmlFor="exampleInputEmail1">Phone</label>
                    <input
                        className="form-control"
                        id="phone"
                        onChange={this.handlePhone}
                        type="number"
                        aria-describedby="emailHelp"
                        placeholder="Phone"
                    />

                    <p className="text-danger">{this.state.phoneError}</p>
                </form>
                <button className="btn btn-success" onClick={this.handleRegister}>Register</button> 
                <br/><br/>
                <Link to='/buyerLogin'>Already have an account? Login now!</Link> 
                <br/><br/><br/><br/>
            </div>
            </div>
          )
      }
}

export default BuyerRegister