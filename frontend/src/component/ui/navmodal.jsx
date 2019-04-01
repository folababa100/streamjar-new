import React,{Component} from  "react"
import {Button, Grid, Icon} from 'semantic-ui-react'
import {Link} from "react-router-dom"
export default class Navmodal extends Component{
    constructor(props){
        super(props)
    }


    render(){
     
        return(
                <div className="navmodal" data-aos="fade-in">
                    <div >
                    <Grid columns="equal" container textAlign="center">
                        <Grid.Column>
                        <div style={{}} >
                        <h2>  <Icon name="cancel" style={{float:"right"}} className="xcursor" onClick={()=>this.props.handleClose()}/></h2>
                        </div>
                        </Grid.Column>
                    <Grid.Row className="modal-links">
                        <Grid.Column>
                            <Grid textAlign="center">
                                <Grid.Row data-aos="zoom-in" data-aos="zoom-in">
                                <Grid.Column>
                                    <Link to="/">Home</Link>
                                </Grid.Column>
                                </Grid.Row>

                                <Grid.Row  data-aos="zoom-in" data-aos-delay="100">
                                <Grid.Column>
                                    <Link to="/about">About</Link>
                                </Grid.Column>
                                </Grid.Row>
                                <Grid.Row  data-aos="zoom-in" data-aos-delay="200">
                                <Grid.Column>
                                    <Link to="/find">Find User</Link>
                                </Grid.Column>
                                </Grid.Row>
                                <Grid.Row  data-aos="zoom-in" data-aos-delay="300">
                                <Grid.Column>
                                <a target="_blank" href="https://medium.com/@StreamJar.co">Blog</a>
                                </Grid.Column>
                                </Grid.Row>
                               {this.props.auth.isAuthenticated?
                                <Grid.Row  data-aos="zoom-in" data-aos-delay="300">
                                <Grid.Column>
                                    <Link to="/dashboard">Dashboard</Link>
                                </Grid.Column>
                                </Grid.Row>
                                
                               : <Grid.Row  data-aos="zoom-in" data-aos-delay="300">
                               <Grid.Column>
                                   <Link to="/signin">Sign In</Link>
                               </Grid.Column>
                               </Grid.Row>}
                                {this.props.auth.isAuthenticated?
                                <Grid.Row  data-aos="zoom-in" data-aos-delay="300">
                                <Grid.Column>
                                    <Link to="#" onClick={this.props.logout}>Logout</Link>
                                </Grid.Column>
                                </Grid.Row>
                               : <Grid.Row  data-aos="zoom-in" data-aos-delay="300">
                               <Grid.Column>
                                   <Link to="/dashboard">Sign Up</Link>
                               </Grid.Column>
                               </Grid.Row>}
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                   </div>
                </div>
        )
    }
}