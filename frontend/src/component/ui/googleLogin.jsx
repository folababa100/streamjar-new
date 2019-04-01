import React,{Component} from 'react'
import { Button,Icon } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login';
import axios from "axios"
import setAuthorizationToken from "../auth"
import apiUrl from "../../config.js"
import jwt from "jsonwebtoken"
export default class Googlelogin extends Component{
    googleLogin = (data)=>{
        var rID = window.localStorage.getItem("r");
        var {email,imageUrl} =data.profileObj
        var username = email.split("@",1)[0];
        axios.post(`${apiUrl}/api/socialLogin`,{rID,username,email,imageUrl,password:username}).then((res) => {
         if (res.data.token) {
             var userData = jwt.verify(res.data.token, "streamers")
             if (userData) {
                 var data = jwt.decode(res.data.token,"streamers");
                 localStorage.setItem("jartoken", res.data.token);
                 localStorage.setItem("username", data.username);
                 setAuthorizationToken(res.data.token);
                 window.location.assign(`/dashboard`)
             }
         }
         })
     }
    render(){

    return (
        <GoogleLogin 
        render={renderProps => (
        <Button color="google plus" onClick={renderProps.onClick}><Icon name="google plus" /> Google</Button>
        )}
        clientId="804860184572-cof972deeklbgmj9e2c7lo5km9bsas2o.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={(data)=>this.googleLogin(data)}
        onFailure={(data)=>this.setState({error:"An error has occured"})}/>
    )
}
}

