import React, { Component } from 'react';
import { Link } from "react-router-dom"
import axios from "axios"
import setAuthorizationToken from "./auth"
import apiUrl from "../config.js"
import jwt from "jsonwebtoken"
import { Button,Form,Checkbox, Image,Select,Message, Grid, Divider } from 'semantic-ui-react';
import { countries } from './forms/countries';
import Twitchlogin from './ui/twitchlogin';
import Googlelogin from './ui/googleLogin';
export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isLoading: false,
            error: "",
            success: ""
        }
        this.login = this.login.bind(this)
        this.typing = this.typing.bind(this)
    }
    componentWillMount() {
       
    }
    login(e) {
        e.preventDefault();
        this.setState({ isLoading: true, error:"" })
        axios.post(`${apiUrl}/api/login`,this.state).then((res) => {
                if (res.data.error) {
                    this.setState({ ...this.state, error: res.data.error });
                } else if (res.data.token) {
                    var userData = jwt.verify(res.data.token, "streamers")
                    if (userData) {
                        var data = jwt.decode(res.data.token,"streamers");
                        localStorage.setItem("jartoken", res.data.token);
                        localStorage.setItem("username", data.username);
                        setAuthorizationToken(res.data.token);
                        window.location.assign(`/dashboard`)
                    }
                }
                this.setState({ isLoading: false }) 
        }).catch((err) => {
                this.setState({ isLoading: false, error: "Please try again later. an error has occured" })
        })
    }
  
    typing(e,data) {
        var name= data.name;
        if(data.name=="tos"){
            this.setState({tos:data.checked})
        }
        else
        this.setState({
            [name]: data.value
        })
    }
    render() {
        return (
           <div className="signin" >
                <Grid columns="equal">
                    <Grid.Column width="4"  tablet="4" computer="4" only="tablet computer">
                        <div className="left-grid">
                            <div className="brand" >
                    <Link to="/" style={{textAlign:"center"}}><Image src={`${apiUrl}/images/logo.png`} style={{display:"inherit"}} size="tiny" /></Link>
                           
                                
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
                                  
                                    <Link to="/" style={{textAlign:"center"}}><Image src={`${apiUrl}/images/logo.png`} style={{display:"inherit"}} size="mini" /></Link>
                                    <h2>SteamJar</h2>
                                </div>
                                <center style={{padding:"20px 0px"}}>
                                <p>Sign in with</p>
                                <Googlelogin />
                            <Twitchlogin />
                            </center>
                            <Divider horizontal>Or</Divider>

                                </Grid.Column>
                                <Grid.Column  only="tablet computer">
                                </Grid.Column>
                                <Grid.Column width="8" mobile="16" tablet="8" computer="8" classN="no-xspadtop">
                                    <Form onSubmit={this.login} loading={this.state.isLoading} warning >
                                    <h3 style={{color:"#555",marginBottom:"15px"}} className="hide-xs">Sign in</h3>
                                    {this.state.error?
                                    <div class='ui warning message'>
                                    <small>{this.state.error}</small>
                                    </div>
                                    :null}
                                    <Form.Group widths='equal'>
                                    
                                        </Form.Group>
                                        
                                        <Form.Field>
                                        <Form.Input
                                            fluid
                                            id='form-subcomponent-shorthand-input-first-name'
                                            label='Username'
                                            name="username"
                                            onChange={this.typing}
                                            required
                                        />
                                        <Form.Input
                                            id='form-subcomponent-shorthand-input-password'
                                            label='Password'
                                            type="password"
                                            name="password"
                                            onChange={this.typing}
                                            required
                                        />
                                        </Form.Field>

                                        <Form.Field>
                                        <Checkbox  label='Remember me'   
                                            name="tos"
                                            onChange={this.typing}
                                            required/>
                                        </Form.Field>
                                    <Button type='submit' color="red">Submit</Button>
                                    <div className="bottom-text">
                                    Not a member? <Link to="/signup">Create an account</Link>
                                    <br/>
                                    <Link to="/forgot-password">Forgot password? click here</Link>

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

