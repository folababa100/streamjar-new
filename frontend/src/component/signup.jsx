import React, { Component } from 'react';
import { Link } from "react-router-dom"
import axios from "axios"
import setAuthorizationToken from "./auth"
import apiUrl from "../config.js"
import jwt from "jsonwebtoken"
import { Button,Form,Checkbox,Select,Grid, Icon, Divider, Image } from 'semantic-ui-react';
import { countries } from './forms/countries';
import { GoogleLogin } from 'react-google-login';
import Googlelogin from './ui/googleLogin';
import Twitchlogin from './ui/twitchlogin';
export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tos:false,
            username: "",
            password: "",
            email:"",
            isLoading: false,
            error: "",
            success: "",
        }
        this.signup = this.signup.bind(this)
        this.typing = this.typing.bind(this)
    }
    componentWillMount() {
      if(window.location.search){
          var href = new URL(window.location.href)
          var url = new URLSearchParams(href.search)
          var r = url.get("r")
          if(r) window.localStorage.setItem("r",r)
        } else window.localStorage.removeItem("r")
    }
    signup(e) {
        e.preventDefault();
        var rID = window.localStorage.getItem("r");
        this.setState({ isLoading: true, error:"" ,success:""})
        if(this.state.tos)
        axios.post(`${apiUrl}/api/signup`,{...this.state,rID}).then((res) => {
                if (res.data.success) {
                    this.setState({ success: res.data.success,isLoading:false,email:"",username:"",password:"",tos :""});
                }else  {
                    this.setState({  error: res.data.error ,isLoading:false});
                }
        }).catch((err) => {
                this.setState({ isLoading: false, error: "Please try again later. an error has occured" })
        })
        else this.setState({error:"Please accept our terms and conditions",isLoading:false})
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
    //    console.log( jwt.decode(""))
        var {email,username,password} = this.state;
        return (
           <div className="signin" >
            <Grid columns="equal">
                    <Grid.Column width="4"  tablet="4" computer="4" only="tablet computer">
                        <div className="left-grid">
                            <div className="brand">
                    <Link to="/" style={{textAlign:"center"}}><Image src={`${apiUrl}/images/logo.png`} style={{display:"inherit"}} size="tiny" /></Link>
                            <h2>StreamJar</h2>
                            </div>
                            <div style={{fontSize:"1em"}}>A tip jar for streamers aimed at helping streamers increase their revenue and keep fans more engaged</div>
                           
                        </div>
                    </Grid.Column> 
                    <Grid.Column width="12" mobile="16" tablet="12" computer="12" className="no-xspadding">
                    <div className="right-grid">
                            <Grid columns="equal" container>
                                <Grid.Column width="4" mobile="16" only="mobile" className="no-xspadding">
                                <div className="brand " style={{textAlign:"center"}}>
                                    <Link to="/" style={{textAlign:"center"}}><Image src={`${apiUrl}/images/logo.png`} style={{display:"inherit"}} size="mini" /></Link>
                                    <h2>StreamJar</h2>
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
                                <Grid.Column width="8" mobile="16" tablet="8" computer="8">
                                <Form onSubmit={this.signup} loading={this.state.isLoading} warning success  >
                                <h3 style={{color:"#555",marginBottom:"15px"}} className="hide-xs">Create an Account</h3>
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
                                    <Form.Input
                                        fluid
                                        id='form-subcomponent-shorthand-input-first-name'
                                        label='Username'
                                        name="username"
                                        onChange={this.typing}
                                        value={username}
                                        required
                                    />
                                  
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                    <Form.Input
                                        id='form-subcomponent-shorthand-input-password'
                                        label='Email'
                                        name="email"
                                        onChange={this.typing}
                                        value={email}
                                        required
                                    />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                   
                                    <Form.Input
                                        id='form-subcomponent-shorthand-input-password'
                                        label='Password'
                                        name="password"
                                        type="password"

                                        onChange={this.typing}
                                        value={password}
                                        required
                                    />
                                  
                                    </Form.Group>
                                 
                                    <Form.Field>
                                    <Checkbox defaultChecked={this.state.tos} label='I agree to the Terms and Conditions'   
                                        name="tos"
                                        onChange={this.typing}
                                        required/>
                                    </Form.Field>
                                    <Button type='submit' color="red">Submit</Button>
                                    <div className="bottom-text">
                                    Already a member? <Link to="/signin">Sign in</Link>
                                </div>
                                </Form>
                                </Grid.Column>
                                <Grid.Column >
                                
                                </Grid.Column>
                            </Grid>
                        
                        </div>
                    </Grid.Column>
                </Grid>
               
                <style>{`
                    body:{
                        background:#fff !important;
                    }
                `}</style>
           </div>
        );
    }
}

