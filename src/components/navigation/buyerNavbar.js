import React,{Component} from 'react'
import { Link, NavLink } from 'react-router-dom'

export class BuyerNavbar extends Component{ 

    logout(){
        localStorage.clear()
    }

    render(){
        return(
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to='/' className="navbar-brand" style={{ "fontSize":"2.2em" }}>WFM</Link>
                
            <div className="collapse navbar-collapse container">
            <ul className="navbar-nav">
                        <li className="nav-item active float-right">
                            <NavLink to='/buyer/subscriptions'>
                                <div className="float-right">
                                <button type="button" className="btn btn-success right" style={{ "fontSize":"1.8em","width":"280px", "color":"white" }}>My Subscriptions</button>
                                </div>
                            </NavLink>
                        </li>
                        <li className="nav-item active float-right">
                            <NavLink to='/buyer/addSubscription'>
                                <div className="float-right">
                                <button type="button" className="btn btn-success right" style={{ "fontSize":"1.8em","width":"280px", "color":"white" }}>New Subscription</button>
                                </div>
                            </NavLink>
                        </li>
                        <li className="nav-item active float-right">
                        
                            <NavLink to='/buyer/profile'>
                                <div className="float-right">
                                <button type="button" className="btn btn-success right" style={{ "fontSize":"1.8em","width":"180px", "margin-left":"300px", "color":"white" }}>Profile</button>
                                </div>
                            </NavLink>
                            
                        </li>
                        <li className="nav-item active float-right">
                        
                            <NavLink to='/'>
                                <div className="float-right">
                                <button type="button" className="btn btn-success right" style={{ "fontSize":"1.8em","width":"180px", "margin-left":"100px", "color":"white" }} onClick={this.logout}>Logout</button>
                                </div>
                            </NavLink>
                            
                        </li>
                    </ul>
                
            </div>
        </div>
        )
    }
}
