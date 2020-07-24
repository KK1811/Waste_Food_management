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
            quantity: 0,
            addedMessage: "",
            delMessage: ""
        }
    
    }
    componentDidMount(){
            const url = "http://localhost:3005/postings/myPostings?isPicked=false";
            console.log("in getData")
            var token = localStorage.getItem("token");
            console.log(token)
            var config = {
            headers: { "token": token }
            };
            axios
                .get(url, config, { params: {isPicked: false} })
                // .get(url, config)
                .then((response) =>{
                    console.log(response.data)
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
        // console.log("in getData")
        var token = localStorage.getItem("token");
        // console.log(token)
        var config = {
        headers: { "token": token }
        };
        axios
            .get(url, config, { params: {isPicked: false} })
            // .get(url, config)
            .then((response) =>{
                // console.log(response.data)
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
        console.log("in postData")
        console.log(this.state)
        var token = localStorage.getItem("token");
        console.log(token)
        var config = {
        headers: { "token": token }
        };
        axios
          .post(url, {
              item: {name: this.state.name, category: this.state.category},
            //   category:this.state.category,
              quantity:this.state.quantity
          }, config)
          .then((response) => {
            console.log(response);
            this.setState({ addedMessage: "Item Added", delMessage: "" })
            // this.completeLogin(response);
          })
          .catch((error) => {
            console.log(error.response);
            // this.errorLogin(error);
          });
      };

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
          });

          console.log(this.state.category)
          console.log(e.target.value)
          const url2 = "http://localhost:3005/items/?category=" + e.target.value;
          console.log(url2)
          var token = localStorage.getItem("token");
          console.log(token)
          var config = {
          headers: { "token": token }
          };
          axios
              // .get(url, config, { params: {isPicked: false} })
              .get(url2, config)
              .then((response) =>{
                  console.log(response.data)
                  this.setState({
                      options: response.data
                  })
                  console.log(this.state.options)
              }) 
              .catch((error) => {
                  console.log(error.response)
              })   

      };

    handleAdd = () => {
        console.log("handleADD")
        this.postData();
    };  

    handleDelete = e => {
        const url = "http://localhost:3005/postings/"+e.target.value;
        console.log(url)
        console.log("in deleteData")
        var token = localStorage.getItem("token");
        console.log(token)
        axios
            .delete(url, {headers: {"token": token}})
            .then(() => {
                console.log("deleted")
                this.setState({ delMessage: "Item Deleted", addedMessage: "" })
            })
            .catch((error) => {
                console.log(error.response)
            })
    };

    createSelectItems() {
        let options = this.state.options;   
        console.log(options)      
        for (let i = 0; i <= 1; i++) {             
        options.push(<option key={this.state.options[i]._id} value={this.state.options[i].name}>{this.state.options[i].name}</option>);   
        }
        return options;
    }  
   
    onDropdownSelected = e => {
        console.log("THE VAL", e.target.value);
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
        
        var items = this.state.items.map(item => {
            return(
                <div className="row container list-group" key={item._id}>
                    <div className="list-group-item">
                        <div className="col-md-4 float-left">{item.item.name}</div>
                        {/* <div className="col-md-4 float-left">{item.category}</div> */}
                        <div className="col-md-3 float-left">{item.quantity}</div>
                        <div className="col-md-3 float-left">
                            <div>{item.isPicked && (<p className="text-success">Picked up</p>)}</div>
                            <div>{!item.isPicked && (<p className="text-danger">Pickup Pending</p>)}</div>
                        </div>
                        {!item.isPicked && (<button className="col-md-1 float-right btn btn-danger" value={item._id} onClick={this.handleDelete}>X</button>)}
                        {/* <button className="col-md-1 float-right btn btn-danger" value={item._id} onClick={this.handleDelete}>X</button> */}
                        <br/>
                    </div>
                </div>
            )
        })

        var optionItems = this.state.options.map((option) =>
                {return(<option key={option.name} value={option.name}>{option.name}</option>)}
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