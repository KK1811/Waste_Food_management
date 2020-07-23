import React,{Component} from 'react'
import { Link, NavLink } from 'react-router-dom'

export class SellerNavbar extends Component{ 

    logout(){
        localStorage.clear()
        this.setState({auth: false})
    }

    render(){
        return(
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to='/' className="navbar-brand" style={{ "fontSize":"2.2em" }}>WFM</Link>
                
            <div className="collapse navbar-collapse container">
            <ul className="navbar-nav">
                        <li className="nav-item active float-right">
                            <NavLink to='/seller/create'>
                                <div className="float-right">
                                <button type="button" className="btn btn-success right" style={{ "fontSize":"1.8em","width":"180px", "color":"white" }}>Request</button>
                                </div>
                            </NavLink>
                        </li>
                        <li className="nav-item active float-right">
                            <NavLink to='/seller/orders'>
                                <div className="float-right">
                                <button type="button" className="btn btn-success right" style={{ "fontSize":"1.8em","width":"180px", "color":"white" }}>Orders</button>
                                </div>
                            </NavLink>
                        </li>
                        <li className="nav-item active float-right">
                            <NavLink to='/'>
                                <div className="float-right">
                                <   button type="button" className="btn btn-success right" style={{ "fontSize":"1.8em","width":"180px", "margin-left":"800px", "color":"white" }} onClick={this.logout}>Logout</button>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                
            </div>
        </div>
        )
    }
}
