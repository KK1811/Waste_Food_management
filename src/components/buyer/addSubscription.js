import React, { Component } from 'react';
import axios from "axios";
import { BuyerNavbar } from '../navigation/buyerNavbar'

class Create extends Component{
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

    postData = () => {
        const url = "http://localhost:3002/subscriptions";
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };
        axios                                                                           //posting a new subscription
          .post(url, {
           details:{
               name: this.state.name,
               category: this.state.category,
               quantity: this.state.quantity
           }
          }, config)
          .then((response) => {
            this.setState({ addedMessage: "Item Added", delMessage: "" })
          })
          .catch((error) => {
            console.log(error.response);
          });
      };

    handleChange = e => {                                                             //changing state according to the change in input fields
        this.setState({
            [e.target.id]: e.target.value
          });

          const url2 = "http://localhost:3005/items/?category=" + e.target.value;
          var token = localStorage.getItem("token");
          var config = {
          headers: { "token": token }
          };
          axios                                                                         //getting options
              .get(url2, config)
              .then((response) =>{
                  this.setState({
                      options: response.data
                  })
              }) 
              .catch((error) => {
                  console.log(error.response)
              })   

      };

    handleAdd = () => {
        this.postData();
    };  

    createSelectItems() {                                                           //create selected items according to category
        let options = this.state.options;      
        for (let i = 0; i <= 1; i++) {             
        options.push(<option key={this.state.options[i]._id} value={this.state.options[i].name}>{this.state.options[i].name}</option>);   
        }
        return options;
    }  
   
    onDropdownSelected = e => {
        this.setState({
            [e.target.id]: e.target.value
          });

    }

    handleQuantity = e => {                                                         
        this.setState({
            [e.target.id]: e.target.value
          });

    }

    render(){

        var optionItems = this.state.options.map((option) =>
                {return(<option key={option.name} value={option.name}>{option.name}</option>)}
            );

           
        return(
            <div>
                <BuyerNavbar />
            <div className="col-md-5 center container">
                <br/>
                <p className="text-success">{this.state.addedMessage.toString()}</p>
                <p className="text-danger">{this.state.delMessage.toString()}</p>
                <br/><br/>
                <h4>Add Items</h4>
                <br/><br/>

                <form className="center row float-left container">
                    
                    <div className="col-md-4 float-left">
                        <label htmlFor="exampleInputEmail1">Category</label><br/>
                        <select id="category" onChange={this.handleChange} className="form-control">
                            <option value="none" selected disabled hidden> 
                                Select an Option 
                            </option> 
                            <option value="dairy">Dairy</option>
                            <option value="meats">Meat</option>
                            <option value="fruits">Fruits</option>
                            <option value="vegetables">Vegetables</option>
                        </select>
                    </div>
                    
                    <div className="col-md-4 float-left">
                        <label htmlFor="exampleInputEmail1">Item</label><br/>
                        <select id="name" onChange={this.onDropdownSelected} className="form-control">
                        <option value="" selected disabled hidden> 
                            Select an Option 
                        </option> 
                            {optionItems}
                        </select>
                    </div>    

                    <div className="col-md-4 float-left">
                    <label htmlFor="exampleInputEmail1">Quantity</label><br/>
                    <input
                        className="form-control"
                        id="quantity"
                        onChange={this.handleQuantity}
                        type="number"
                        min="5"
                        max="100"
                        aria-describedby="emailHelp"
                        placeholder="Quantity"
                    />
                    </div>
                </form>
                <br/><br/><br/><br/><br/>
                <button className="btn btn-primary center" onClick={this.handleAdd}>Add</button>
                <br/><br/><br/>
            </div>
            </div>
        )
    }
}

export default Create