import React, { Component } from 'react'
import { Button, Modal, Form,Icon,Image, Checkbox } from 'semantic-ui-react'
import apiUrl from "../../config"
import axios from "axios";
import jwt from "jsonwebtoken"
export default class Paypalmodal extends Component {
    constructor(props){
        super(props);
        this.state = { 
            amountPaid: this.props.user.amountUnpaid,
            isLoading:false,
            error:"",
            success:""
         }
        this.typing = this.typing.bind(this)
        this.pay = this.pay.bind(this)
    }   
    typing(e,data){
        this.setState({
            "amountPaid": data.value
        })
    }
    pay(e){
        this.setState({isLoading:true,error:"",success:""})
        if(!this.props.user.paymentDetails ) {
            this.setState({error: "Paypal account has not been added"})
            return false
        }
        e.preventDefault();
        var {accountID,email } = this.props.user;
        var {amountPaid} = this.state
        var {paypalEmail} = this.props.user.paymentDetails.paymentMethod
        var token = jwt.sign( {accountID,email,paypalEmail,amountPaid}, "streamers").toString();
        axios.post(`${apiUrl}/api/pay`,{token}).then((res)=>{
            if(res.data.success){
                this.setState({success:res.data.success,isLoading:false})
            }else this.setState({error:res.data.error,isLoading:false})
  })
}
  render() {
    const {user,open,close} = this.props
    var {amountPaid,error,success,isLoading} = this.state

    return (
      <div>
        <Modal size="tiny" open={true} onClose={close} style={{marginTop:"50px"}}>
          <Modal.Content style={{textAlign:"center"}}>
            <center><Image src={user.profileDetails.picture} avatar/></center>
            <p>
            Amount Earned: {user.totalEarned} | Referral Earnings: {user.referralEarnings} | Amount Unpaid: {user.amountUnpaid}</p>
            <Form onSubmit={this.pay} loading={isLoading} warning success>
            <Form.Field>
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
            </Form.Field>
            <Form.Input name="amountPaid" defaultValue={user.amountUnpaid} placeholder="amount to pay user" style={{fontSize: "0.9em",margin:"10px 5px"}} type="number" onChange={this.typing} />
           
            <Form.Field>
            <Button color="blue" disabled={isLoading}> <Icon name="paypal"/> Pay</Button>
            </Form.Field>
            </Form>
            {/* <Paypal data={{...user,amountPaid:this.state.amountPaid}} /> */}
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

