import React, { Component } from 'react';
import { Link } from "react-router-dom"
import axios from "axios"
import setAuthorizationToken from "./auth"
import apiUrl from "../config.js"
import jwt from "jsonwebtoken"
import { Button,Form,Checkbox,Select,Message, Grid } from 'semantic-ui-react';
import { countries } from './forms/countries';
import Twitchlogin from './ui/twitchlogin';
import Googlelogin from './ui/googleLogin';
export default class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            isLoading: false,
            error: "",
            success: ""
        }
        this.reset = this.reset.bind(this)
        this.typing = this.typing.bind(this)
    }
    componentWillMount() {
       
    }
    reset(e) {
        e.preventDefault();
        this.setState({ isLoading: true, error:"" ,success:""})
        axios.post(`${apiUrl}/api/reset`,this.state).then((res) => {
            if (res.data.success) {
                    this.setState({ success: res.data.success,isLoading:false,email:""});
                }else  {
                    this.setState({ ...this.state, error: res.data.error ,isLoading:false});
                }
        }).catch((err) => {
                this.setState({ isLoading: false, error: "Please try again later. an error has occured" })
        })
    }
    typing(e,data) {
        
        this.setState({
            [data.name]: data.value
        })
    }
    render() {
        return (
           <div className="signin" >
                <Grid columns="equal">
                    <Grid.Column width="4"  tablet="4" computer="4" only="tablet computer">
                        <div className="left-grid">
                            <div className="brand">
                                <i className="cube icon"></i>
                            <h2>StreamJar</h2>
                            </div>
                            <div style={{fontSize:"1em"}}>A tip jar for streamers aimed at helping streamers increase their revenue and keep fans more engaged</div>
                            <div style={{padding:"20px 0px"}}>
                                <p>Sign in with</p>
                                <Googlelogin />
                            <Twitchlogin />
                            
                            </div>
                        </div>
                    </Grid.Column>
                    <Grid.Column width="12" mobile="16" tablet="12" computer="12" className="no-xspadding">
                    <div className="right-grid">
                            <Grid columns="equal" container>
                                <Grid.Column  mobile="16" only="mobile" style={{padding:"0px"}}>
                                <div className="brand " style={{textAlign:"center"}}>
                                    <i className="cube icon"></i>
                                    <h2>SteamJar</h2>
                                </div>
                                </Grid.Column>
                                <Grid.Column  only="tablet computer">
                                </Grid.Column>
                                <Grid.Column width="8" mobile="16" tablet="8" computer="8" classN="no-xspadtop">
                                    <Form onSubmit={this.reset} loading={this.state.isLoading} warning success>
                                    <h3 style={{color:"#555",marginBottom:"15px"}} >Reset Password</h3>
                                    {this.state.error?
                                <div class='ui warning message'>
                                <small>{this.state.error}</small>
                                </div>
                                :null}
                                {this.state.success?
                                <div class='ui success message'>
                                <small>{this.state.success}</small>
                                </div>
                                :null}
                                    <Form.Group widths='equal'>
                                    
                                        </Form.Group>
                                        
                                        <Form.Field>
                                        <Form.Input
                                            fluid
                                            id='form-subcomponent-shorthand-input-first-name'
                                            label='Email'
                                            name="email"
                                            onChange={this.typing}
                                            required
                                        />
                                        </Form.Field>

                                    <Button type='submit' color="red">Submit</Button>
                                    <div className="bottom-text">
                                    Already a member? <Link to="/signin">Sign in</Link>
                                    <br/>

                                </div>
                                </Form>
                                </Grid.Column>
                                <Grid.Column >
                                
                                </Grid.Column>
                            </Grid>
                        
                        </div>
                    </Grid.Column>
                </Grid>
           </div>
        );
    }
}

