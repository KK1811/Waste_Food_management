import React, { Component } from 'react';
import axios from "axios";

class Create extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: [],
            name: "asd",
            category: "dairy",
            quantity: 10,
            addedMessage: "",
            delMessage: ""
        }
    
    }
    componentDidMount(){
            const url = "/postings";
            console.log("in getData")
            var token = localStorage.getItem("token");
            console.log(token)
            var config = {
            headers: { "token": token }
            };
            axios
                .get(url, config, { params: {isPicked: false} })
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
        const url = "/postings";
        // console.log("in getData")
        var token = localStorage.getItem("token");
        // console.log(token)
        var config = {
        headers: { "token": token }
        };
        axios
            .get(url, config)
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
        const url = "/postings";
        console.log("in postData")
        console.log(this.state)
        var token = localStorage.getItem("token");
        console.log(token)
        var config = {
        headers: { "token": token }
        };
        axios
          .post(url, {
              name: this.state.name,
              category:this.state.category,
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
      };

    handleAdd = () => {
        console.log("handleADD")
        this.postData();
    };  

    handleDelete = e => {
        const url = "/postings/"+e.target.value;
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

    render(){
        
        var items = this.state.items.map(item => {
            return(
                <div className="row container list-group" key={item._id}>
                    <div className="list-group-item">
                        <div className="col-md-4 float-left">{item.name}</div>
                        <div className="col-md-4 float-left">{item.category}</div>
                        <div className="col-md-3 float-left">{item.quantity}</div>
                        <button className="col-md-1 float-right btn btn-danger" value={item._id} onClick={this.handleDelete}>X</button>
                        <br/>
                    </div>
                </div>
            )
        })

        return(
            <div className="col-md-5 center container">

                <br/><br/><br/>
                <h3>Pending Pickup</h3>
                <br/>
                <div className="container">{items}</div>
                <br/>
                <p className="text-success">{this.state.addedMessage.toString()}</p>
                <p className="text-danger">{this.state.delMessage.toString()}</p>
                <br/><br/>
                <h4>Add Items</h4>
                <form className="center row float-left container">
                    <div className="col-md-4 float-left">
                    <label htmlFor="exampleInputEmail1">Item</label>
                    <input
                        className="form-control"
                        id="name"
                        onChange={this.handleChange}
                        type="text"
                        aria-describedby="emailHelp"
                        placeholder="Item"
                    />
                    </div>

                    <div className="col-md-4 float-left">
                    <label htmlFor="exampleInputEmail1">Category</label>
                    <select id="category" onChange={this.handleChange} className="form-control" defaultValue="dairy">
                        <option value="dairy">Dairy</option>
                        <option value="meats">Meat</option>
                        <option value="fruits">Fruits</option>
                        <option value="vegetables">Vegetables</option>
                    </select>
                    </div>

                    <div className="col-md-4 float-left">
                    <label htmlFor="exampleInputEmail1">Quantity</label>
                    <input
                        className="form-control"
                        id="quantity"
                        onChange={this.handleChange}
                        type="number"
                        min="5"
                        aria-describedby="emailHelp"
                        placeholder="Quantity"
                    />
                    </div>
                </form>
                <br/><br/><br/><br/>
                <button className="btn btn-primary center" onClick={this.handleAdd}>Add Item</button>
                <br/><br/><br/>
            </div>
        )
    }
}

export default Create