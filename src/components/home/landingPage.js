import React,{Component} from 'react';
import '../../styles/landingPage.css'
import savefoodlogo from '../../assets/save-food-logo.png'
import fruits from '../../assets/vegetables2.png'
import dairy from '../../assets/dairy3.png'
import meat from '../../assets/meat3.png'
import savefood from '../../assets/save-food.png'

class LandingPage extends Component{
    render(){
        return(
            <div>
                <section id="banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h1>Waste Food Management</h1>
                                <br/><br/>
                                <p style={{"fontSize":"30px"}}>Our goal is to minimize food wastage by making use of perishable items that are about to go stale</p>
                            </div>
                            <div className="col-md-6">
                                <img src={savefoodlogo} id="logo-image" />
                            </div>
                        </div>    
                    </div>
                </section>

                <section id="categories">
                    <div className="container">
                        <h3>Things we try to save</h3><br/><br/>
                        <div className="row">
                            <div className="col-md-4">
                                <img src={fruits} id="category-image" />
                                <br/>
                                <h4>Fruits and vegetables</h4>
                            </div>
                            <div className="col-md-4">
                                <img src={dairy} id="category-image" style={{"width":"250px","padding":"17px 0"}}/>
                                <br/>
                                <h4>Dairy Products</h4>
                            </div>
                            <div className="col-md-4">
                                <img src={meat} style={{"width":"250px","padding":"28px 0"}}/>
                                <br/>
                                <h4>Meat</h4>
                            </div>
                        </div>
                    </div>
                </section>  

                <section id="achievements">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                            <br/><br/><br/><br/><br/><br/><br/><br/>
                                <h2>What we have saved so far</h2>
                                <br/>
                                <ul id="list">
                                    <li id="list-item"><h5>467 Kg Fruits and Vegetables</h5></li>
                                    <li id="list-item"><h5>326 Liters of Milk</h5></li>
                                    <li id="list-item"><h5>338 Kg Meat</h5></li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <img src={savefood} id="save-food" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default LandingPage