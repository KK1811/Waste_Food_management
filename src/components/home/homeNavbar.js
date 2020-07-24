import React,{Component} from 'react'
import { Link, NavLink } from 'react-router-dom'

export class HomeNavbar extends Component{ 
    render(){
        return(
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to='/' className="navbar-brand" style={{ "fontSize":"2.2em" }}>WFM</Link>     

            <div className="float-right container"> 
       
                <div className="container d-flex justify-content-end">
                <ul className="navbar-nav">

                    <li className="nav-item active float-right" style={{"margin-right":"40px"}}>
                        <NavLink className="navbar-brand" style={{"fontSize":"2.0em"}} to={{pathname: '/buyerLogin' }}>
                            Customer
                        </NavLink>
                    </li>

                    <li className="nav-item active float-right" style={{"margin-right":"30px"}}>
                        <NavLink to={{pathname: '/sellerLogin'}} className="navbar-brand" style={{"fontSize":"2.0em"}}>
                            Seller
                        </NavLink>
                    </li>

                </ul>
                </div>
                
            </div> 
        </div>
        )
    }
}
