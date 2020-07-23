import React, { Component } from 'react';
import axios from "axios";

class addSubscription extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: [],
            subname: "",
            name: "",
            category: "",
            quantity: 0,
            addedMessage: "",
            delMessage: ""
        }
    }

    postData = () => {
        const url = "/subscriptions";
        console.log("in postData")
        console.log(this.state)
        var token = localStorage.getItem("token");
        console.log(token)
        var config = {
        headers: { "token": token }
        };
        axios
          .post(url, {
              name: this.state.subname,
              details: {
                name: this.state.name,
                category:this.state.category,
                quantity:this.state.quantity
              }
          }, config)
          .then((response) => {
            console.log(response);
            this.setState({ addedMessage: "Item Added", delMessage: "" })
            // this.props.history.push(`/subscriptions`)
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

    // componentDidMount(){
    //     console.log(this.state.category)
    //     const url = "http://localhost:3002/items/?category=" + this.state.category;
    //     console.log("in getData")
    //     var token = localStorage.getItem("token");
    //     console.log(token)
    //     var config = {
    //     headers: { "token": token }
    //     };
    //     axios
    //         // .get(url, config, { params: {isPicked: false} })
    //         .get(url, config)
    //         .then((response) =>{
    //             console.log(response.data)
    //             this.setState({
    //                 items: response.data
    //             })
    //         }) 
    //         .catch((error) => {
    //             console.log(error.response)
    //         })  
    // }

    componentDidUpdate(){
        console.log(this.state.category)
        const url = "http://localhost:3002/items/?category=" + this.state.category;
        console.log(url)
        var token = localStorage.getItem("token");
        console.log(token)
        var config = {
        headers: { "token": token }
        };
        axios
            // .get(url, config, { params: {isPicked: false} })
            .get(url, config)
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

    handleAdd = () => {
        console.log("handleADD")
        this.postData();
    };  

    createSelectItems() {
        let items = this.state.items;         
        for (let i = 0; i <= this.props.maxValue; i++) {             
             items.push(<option key={i} value={i}>{i}</option>);   
        }
        return items;
    }  
   
    onDropdownSelected(e) {
        console.log("THE VAL", e.target.value);
    }

    render(){
        return(
            <div className="col-md-5 center container">
                <br/><br/><br/>
                <h3>Pending Pickup</h3>
                <br/>
                {/* <div className="container">{items}</div> */}
                <br/>
                <p className="text-success">{this.state.addedMessage.toString()}</p>
                <p className="text-danger">{this.state.delMessage.toString()}</p>

                <form className="center row float-left container">
                    
                    <div className="col-md-4 float-left">
                        <label htmlFor="exampleInputEmail1">Category</label>
                        <select id="category" onChange={this.handleChange} className="form-control">
                            <option value="dairy">Dairy</option>
                            <option value="meats">Meat</option>
                            <option value="fruits">Fruits</option>
                            <option value="vegetables">Vegetables</option>
                        </select>
                    </div>
                    
                    {/* <div className="col-md-4 float-left">
                    <label htmlFor="exampleInputEmail1">Item</label>
                    <input
                        className="form-control"
                        id="name"
                        onChange={this.handleChange}
                        type="text"
                        aria-describedby="emailHelp"
                        placeholder="Item"
                    />
                    </div> */}

                    <select onChange={this.onDropdownSelected} className="form-control" label="Multiple Select" multiple>
                        {this.createSelectItems()}
                    </select>

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
                <button className="btn btn-primary center" onClick={this.handleAdd}>Subscribe</button>
                <br/><br/><br/>
            </div>
        )
    }
}

export default addSubscription