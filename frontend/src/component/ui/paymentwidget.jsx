import React,{Component} from "react"
import {Link} from "react-router-dom"
import apiUrl from '../../config';
import { Feed, Card, Button, Icon, Image, Form, Checkbox } from "semantic-ui-react";
import moment from "moment";
import axios from "axios"
import setAuthorizationToken from "../auth"
import jwt from "jsonwebtoken"
import classnames from "classnames"
export default class Paymentwidget extends Component{
  constructor(props){
    super(props)
    this.state={
      email:"",
      default:"",
      success:"",
      fullName:"",
      isLoading:false,
      error:"",
      show:false
    }
    this.updatePayment = this.updatePayment.bind(this)
    this.typing = this.typing.bind(this)
  }
 
  updatePayment(e) {
  e.preventDefault();
  this.setState({serror:"",success:"",isLoading:true})
  axios.post(`${apiUrl}/api/updatePayment`, this.state).then((res) => {
      if (res.data.success) {
          this.setState({ success: res.data.success ,isLoading:false})
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
            <Card.Header><Icon name="paypal" /> Payment method <Button basic size="mini" floated="right" onClick={()=>this.setState({show:!this.state.show})}>Add</Button></Card.Header>
        </Card.Content>
        {this.state.show?
        <Card.Content >
        <Form onSubmit={this.updatePayment} loading={this.state.isLoading} success error> 
            <Form.Field>
            <Form.Input label="Full name" style={{fontSize: "0.9em"}} type="text"  name="fullName" required onChange={this.typing} />
            </Form.Field>
            <Form.Field>
            <Form.Input label="Email" style={{fontSize: "0.9em"}}  type="email" name="email" required onChange={this.typing} />

            <p style={{color:"#276f86",fontSize:"0.9em"}}>{this.state.success?this.state.success:null}</p>
            <p style={{color:"#df4a32",fontSize:"0.9em"}}>{this.state.error?this.state.error:null}</p>
            </Form.Field>
            <Button type='submit' circular color="red"  size="mini">Submit<Icon name="arrow alternate circle right outline" /></Button>
        </Form>
        </Card.Content>:
        <Card.Content>
       <p><Icon name="user outline"></Icon> {this.props.fullName}</p>
       <p><Icon name="paypal"></Icon> {this.props.email}</p>
    </Card.Content>}
    </Card>
)
    }
  }