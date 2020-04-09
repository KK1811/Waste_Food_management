import React,{Component} from 'react'
import { Link, NavLink } from 'react-router-dom'

function updateNavbar(){
    if(localStorage.getItem('token') != null){
        this.setState({auth : true}); 
    }
    else{
        this.setState({auth : false});
    }
}

export class Navbar extends Component{ 
    constructor(props){
        super(props);
        this.state = {
            auth : false,
            update : updateNavbar.bind(this),
        };
        this.logout = this.logout.bind(this)
    }

    componentDidMount(){
        if(localStorage.getItem('token') != null){
            this.setState({auth : true}); 
        }
        else{
            this.setState({auth : false});
        }
    }

    componentDidUpdate(){
        if(localStorage.getItem('token') != null){
            if(!this.state.auth)
            this.setState({auth : true}); 
        }
        else{
            if(this.state.auth){
                this.setState({auth : false});
            }
        }
    }

    logout(){
        localStorage.clear()
        this.setState({auth: false})
    }

    render(){
        console.log("Nav: " + this.state.update)
        return(
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to='/' className="navbar-brand" style={{ "fontSize":"2.2em" }}>WFM</Link>
                
            <div className="collapse navbar-collapse container">
                { this.state.auth && (
                <div className="navbar-nav col-md-10">
                    <ul className="navbar-nav mr-auto float-left">

                        <li className="nav-item active">
                            <NavLink to='/seller'>
                                <div className="float-left">
                                    <button type="button" className="btn btn-success right" style={{ "fontSize":"1.8em","width":"180px" }}>Request</button>
                                </div>
                            </NavLink>
                        </li>  
                        <li className="nav-item active">
                            <NavLink to='/seller'>
                                <div className="float-left">
                                    <button type="button" className="btn btn-success right" style={{ "fontSize":"1.8em","width":"180px" }}>Orders</button>
                                </div>
                            </NavLink>
                        </li> 
                         
                    </ul>
                    <div className="container d-flex justify-content-end">    
                    <ul className="navbar-nav">
                        <li className="nav-item active float-right">
                            <NavLink to='/'>
                                <div className="float-right">
                                    <button type="button" className="btn btn-success right" style={{ "fontSize":"1.8em","width":"180px", "margin-left":"8000px" }} onClick={this.logout}>Logout</button>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                    </div>

                </div>
                )}
            </div>

            <div className="float-right container"> 
                { !this.state.auth && (
                <div className="container d-flex justify-content-end">
                <ul className="navbar-nav">

                    <li className="nav-item active float-right" style={{"margin-right":"40px"}}>
                        <NavLink className="navbar-brand" style={{"fontSize":"2.0em"}} to={{pathname: '/login', aboutProps:{update: this.state.update} }}>
                            Login
                        </NavLink>
                    </li>

                    <li className="nav-item active float-right" style={{"margin-right":"30px"}}>
                        <NavLink to='/register' className="navbar-brand" style={{"fontSize":"2.0em"}}>
                            Register
                        </NavLink>
                    </li>

                </ul>
                </div>
                )}
            </div> 
        </div>
        )
    }
}
