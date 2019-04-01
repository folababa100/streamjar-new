import React,{Component} from "react"
import {Link} from "react-router-dom"
import apiUrl from '../../config';
import { Feed, Card, Button, Icon, Image, Form, Checkbox } from "semantic-ui-react";
import moment from "moment";
import axios from "axios"
import setAuthorizationToken from "../auth"
import jwt from "jsonwebtoken"
import classnames from "classnames"
export default class Changepassword extends Component{
  constructor(props){
    super(props)
    this.state={
      oldPassword:"",
      newPassword:"",
      success:"",
      isLoading:false,
      error:"",
      show:false
    }
    this.changePassword = this.changePassword.bind(this)
    this.typing = this.typing.bind(this)
  }
 
  changePassword(e) {
  e.preventDefault();
  this.setState({serror:"",success:"",isLoading:true})
  axios.post(`${apiUrl}/api/changePassword`, this.state).then((res) => {
      if (res.data.success) {
          this.setState({ success: res.data.success ,isLoading:false,newPassword:"",oldPassword:""})
      } else {
          this.setState({ error: res.data.error ,isLoading:false})
      }
  });
}
typing(e) {
  this.setState({
      [e.target.name]: e.target.value
  })
}
  render(){

    return(
    <Card fluid={true} style={{border:"0px"}}>
        <Card.Content>
            <Card.Header><Icon name="building outline" /> Password <Button basic size="mini" floated="right" onClick={()=>this.setState({show:!this.state.show})}>Change</Button></Card.Header>
        </Card.Content>
        {this.state.show?
        <Card.Content >
        <Form onSubmit={this.changePassword} loading={this.state.isLoading} success error> 
            <Form.Field>
            <Form.Input defaultValue={this.state.oldPassword}  style={{fontSize: "0.9em"}} label="Old password" type="password" name="oldPassword" required onChange={this.typing} />
            </Form.Field>
            <Form.Field>
            <Form.Input defaultValue={this.state.newPassword} style={{fontSize: "0.9em"}} label="New password" type="password" name="newPassword" required onChange={this.typing} />
           
            <p style={{color:"#276f86",fontSize:"0.9em"}}>{this.state.success?this.state.success:null}</p>
            <p style={{color:"#df4a32",fontSize:"0.9em"}}>{this.state.error?this.state.error:null}</p>
            </Form.Field>
            <Button type='submit' circular color="red"  size="mini">Submit<Icon name="arrow alternate circle right outline" /></Button>
        </Form>
        </Card.Content>:null}
    </Card>
)
    }
  }