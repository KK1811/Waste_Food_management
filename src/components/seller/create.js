import React, { Component } from 'react';
import axios from "axios";
import { SellerNavbar } from '../navigation/sellerNavbar'

class Create extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: [],
            options: [],
            name: "",
            category: "",
            defaultPrice: 1,
            quantity: 0,
            addedMessage: "",
            delMessage: ""
        }
    
    }
    componentDidMount(){
            const url = "http://localhost:3005/postings/myPostings?isPicked=false";
            var token = localStorage.getItem("token");
            var config = {
            headers: { "token": token }
            };
            axios                                                                                               //getting postings
                .get(url, config, { params: {isPicked: false} })
                .then((response) =>{
                    this.setState({
                        items: response.data
                    })
                }) 
                .catch((error) => {
                    console.log(error.response)
                })
    }

    componentDidUpdate(){
        const url = "http://localhost:3005/postings/myPostings?isPicked=false";
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };
        axios                                                                                                   //getting postings
            .get(url, config, { params: {isPicked: false} })
            .then((response) =>{
                this.setState({
                    items: response.data,
                })
            }) 
            .catch((error) => {
                console.log(error.response)
            }) 
    }

    postData = () => {
        const url = "http://localhost:3005/postings";
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };
        axios                                                                                                     //posting new post
          .post(url, {
              item: {name: this.state.name, category: this.state.category, defaultPrice: this.state.defaultPrice},
              quantity:this.state.quantity
          }, config)
          .then((response) => {
            this.setState({ addedMessage: "Item Added", delMessage: "" })
          })
          .catch((error) => {
            console.log(error.response);
          });
      };

    handleChange = e => {                                                                                          //changing state according to the change in input fields
        this.setState({
            [e.target.id]: e.target.value
          });
          console.log("in change")
          const url2 = "http://localhost:3005/items/?category=" + e.target.value;
          var token = localStorage.getItem("token");
          var config = {
          headers: { "token": token }
          };
          axios
              .get(url2, config)
              .then((response) =>{
                  this.setState({
                      options: response.data
                  })
                  console.log(response)
              }) 
              .catch((error) => {
                  console.log(error.response)
              })   
      };

    handleAdd = () => {
        this.postData();
    };  

    handleDelete = e => {                                                                                       //deleting post
        const url = "http://localhost:3005/postings/"+e.target.value;
        var token = localStorage.getItem("token");
        axios
            .delete(url, {headers: {"token": token}})
            .then(() => {
                this.setState({ delMessage: "Item Deleted", addedMessage: "" })
            })
            .catch((error) => {
                console.log(error.response)
            })
    };

    createSelectItems() {                                                                                       //creating options
        let options = this.state.options;           
        for (let i = 0; i <= 1; i++) {             
        options.push(<option key={this.state.options[i]._id} value={this.state.options[i].name}>{this.state.options[i].name}</option>);   
        }
        return options;
    }  
   
    onDropdownSelected = e => {                                                                                   //selecting option
        this.setState({
            [e.target.id]: e.target.value,
            defaultPrice: e.target.selectedOptions[0].getAttribute("name")
          });

    }

    handleQuantity = e => {
        this.setState({
            [e.target.id]: e.target.value
          });
    }

    render(){
        
        var items = this.state.items.map(item => {
            return(
                <div className="row container list-group" key={item._id}>
                    <div className="list-group-item">
                        <div className="col-md-4 float-left">{item.item.name}</div>
                        <div className="col-md-3 float-left">{item.quantity}</div>
                        <div className="col-md-3 float-left">
                            <div>{item.isPicked && (<p className="text-success">Picked up</p>)}</div>
                            <div>{!item.isPicked && (<p className="text-danger">Pickup Pending</p>)}</div>
                        </div>
                        {!item.isPicked && (<button className="col-md-1 float-right btn btn-danger" value={item._id} onClick={this.handleDelete}>X</button>)}
                        <br/>
                    </div>
                </div>
            )
        })

        var optionItems = this.state.options.map((option) =>
                {return(<option name={option.defaultPrice} value={option.name}>{option.name}</option>)}
            );

           
        return(
            <div>
                <SellerNavbar />
            <div className="col-md-5 center container">

                <br/><br/><br/>
                <h3>Past Orders</h3>
                <br/>
                <div className="container">{items}</div>
                <br/>
                <p className="text-success">{this.state.addedMessage.toString()}</p>
                <p className="text-danger">{this.state.delMessage.toString()}</p>
                <br/><br/>
                <h4>Add Items</h4>

                <form className="center row float-left container">
                    
                    <div className="col-md-4 float-left">
                        <label htmlFor="exampleInputEmail1">Category</label>
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
                        <label htmlFor="exampleInputEmail1">Item</label>
                        <select id="name" onChange={this.onDropdownSelected} className="form-control">
                        <option value="" selected disabled hidden> 
                            Select an Option 
                        </option> 
                            {optionItems}
                        </select>
                    </div>    

                    <div className="col-md-4 float-left">
                    <label htmlFor="exampleInputEmail1">Quantity</label>
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
                <br/><br/><br/><br/>
                <button className="btn btn-primary center" onClick={this.handleAdd}>Add</button>
                <br/><br/><br/>
            </div>
            </div>
        )
    }
}

export default Create