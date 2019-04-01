import React, { Component } from 'react';
import { Link } from "react-router-dom"
import axios from "axios"
import setAuthorizationToken from "../auth"
import apiUrl from "../../config.js"
import jwt from "jsonwebtoken"
import { Button,Form,Checkbox,Select,Message, Grid, Image } from 'semantic-ui-react';
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
        axios.post(`${apiUrl}/api/admin/login`,this.state).then((res) => {
                if (res.data.error) {
                    this.setState({ ...this.state, error: res.data.error });
                } else if (res.data.token) {
                    var userData = jwt.verify(res.data.token, "streamers")
                    if (userData) {
                        var data = jwt.decode(res.data.token,"streamers");
                        localStorage.setItem("jartoken", res.data.token);
                        localStorage.setItem("username", data.username);
                        setAuthorizationToken(res.data.token);
                        window.location.assign(`/admin/dashboard`)
                    }
                }
                this.setState({ isLoading: false }) 
        }).catch((err) => {
                this.setState({ isLoading: false, error: "Please try again later. An error has occured" })
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
                    </Grid.Column>
                    <Grid.Column width="8" mobile="16" tablet="8" computer="8" className="no-xspadding">
                    <div className="right-grid">
                            <Grid columns="equal" container>
                                <Grid.Column  mobile="16" only="mobile" style={{padding:"0px"}}>
                                <div className="brand " style={{textAlign:"center"}}>
                                    <Link to="/" style={{textAlign:"center"}}><Image src={`${apiUrl}/images/logo.png`} style={{display:"inherit"}} size="mini" /></Link>
                                    <h2>SteamJar</h2>
                                </div>
                                </Grid.Column>
                                <Grid.Column  only="tablet computer">
                                </Grid.Column>
                                <Grid.Column width="8" mobile="16" tablet="8" computer="8" classN="no-xspadtop">
                                    <Form onSubmit={this.login} loading={this.state.isLoading} warning >
                                    <h3 style={{color:"#555",marginBottom:"15px"}} >Sign in</h3>
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
                                            type="text"
                                            onChange={this.typing}
                                            required
                                        />
                                        <Form.Input
                                            id='form-subcomponent-shorthand-input-password'
                                            label='Password'
                                            name="password"
                                            type="password"
                                            onChange={this.typing}
                                            required
                                        />
                                        </Form.Field>

                                        <Form.Field>
                                        
                                        </Form.Field>
                                    <Button type='submit' color="red">Submit</Button>
                                  
                                </Form>
                                </Grid.Column>
                                <Grid.Column width="4">
                                
                                </Grid.Column>
                            </Grid>
                        
                        </div>
                    </Grid.Column>
                </Grid>
           </div>
        );
    }
}

