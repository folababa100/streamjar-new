import React, { Component } from 'react'
import { Button, Modal, Form,Icon,Image, Checkbox } from 'semantic-ui-react'
import apiUrl from "../../config"
import axios from "axios";
export default class Editmodal extends Component {
    constructor(props){
        super(props);
        this.state = { 
            // email:"",
            // username:"",
            // password:"",
            // totalEarned:"",
            // amountUnpaid:"",
            // referralEarnings:"",
            // payPercentage:"",
            // referralPercentage:"",
            // referredBy:"",
            // numReferrals:"",
            // banned:"",
            // profileDetails:{
            //     picture:"",
            //     description:""
            // },
            // paymentDetails:{fullName:"",paymentMethod:{paypalEmail:""}},

         }
        this.typing = this.typing.bind(this)
        this.profileTyping = this.profileTyping.bind(this)
        this.paymentTyping = this.paymentTyping.bind(this)
        this.submit = this.submit.bind(this)
    }   
    typing(e,data){
        var name= data.name;
        if(data.name=="banned"){
            this.setState({banned:data.checked})
        }
        else
        this.setState({
            [name]: data.value
        })
    }
    paymentTyping(e,data){
        this.setState({
           paymentDetails: {paymentMethod:{paypalEmail:data.value}}
        })
    }
    profileTyping(e,data){
        this.setState({
           profileDetails: {[data.name]: data.value}
        })
    }
    submit(e) {
        e.preventDefault();
        this.setState({ isLoading: true, error:"" ,success:""})
        axios.post(`${apiUrl}/api/admin/updateProfile`,{...this.state,user:this.props.user.username}).then((res) => {
                if (res.data.success) {
                    this.setState({ success: res.data.success,isLoading:false,});
                }else  {
                    this.setState({error: res.data.error ,isLoading:false});
                }
        }).catch((err) => {
                this.setState({ isLoading: false, error: "Please try again later. an error has occured" })
        })
    }
  
  render() {
    const {user,open,close} = this.props

    return (
      <div>
        <Modal size="tiny" open={true} onClose={close} style={{marginTop:"50px"}}>
          <Modal.Content>
            <center><Image src={user.profileDetails.picture} avatar/></center>
            <p>{user.description}</p>
            <Form onSubmit={this.submit} loading={this.state.isLoading} success error> 
            <Form.Group widths='equal'>
            <Form.Input defaultValue={user.username} label="username" style={{fontSize: "0.9em"}} type="text"  name="username"  onChange={this.typing} />
          
            <Form.Input defaultValue={user.email} label="Email" style={{fontSize: "0.9em"}}  type="email" name="email"  onChange={this.typing} />
            </Form.Group>
            <Form.Field>
            <Form.Input defaultValue={user.password} label="Password" style={{fontSize: "0.9em"}}  type="password" name="password"  onChange={this.typing} />
            </Form.Field>
            <Form.Group widths='equal'>
            <Form.Input defaultValue={user.totalEarned} label="Total Earned" style={{fontSize: "0.9em"}}  type="number" name="totalEarned"  onChange={this.typing} />
          
            <Form.Input defaultValue={user.amountUnpaid} label="Amount Unpaid" style={{fontSize: "0.9em"}} type="number"  name="amountUnpaid"  onChange={this.typing} />
            </Form.Group>
            <Form.Group widths='equal'>
            <Form.Input defaultValue={user.referralEarnings} label="Referral Earnings" style={{fontSize: "0.9em"}} type="number"  name="referralEarnings"  onChange={this.typing} />
           
            <Form.Input defaultValue={user.payPercentage} label="Pay Percentage" style={{fontSize: "0.9em"}} type="number"  name="payPercentage"  onChange={this.typing} />
            </Form.Group>
            <Form.Group widths='equal'>
            <Form.Input defaultValue={user.referralPercentage}  label="Referral Percentage" style={{fontSize: "0.9em"}} type="number"  name="referralPercentage"  onChange={this.typing} />
          
            <Form.Input defaultValue={user.referredBy} label="Referral By" style={{fontSize: "0.9em"}} type="text"  name="referredBy"  onChange={this.typing} />
            </Form.Group>
            <Form.Group widths='equal'>
            {/* <Form.Input defaultValue={user.banned} label="Banned" style={{fontSize: "0.9em"}} type="boolean"  name="banned"  onChange={this.typing} /> */}
            <Form.Input defaultValue={user.paymentDetails?user.paymentDetails.paymentMethod.paypalEmail:null} label="Paypal Email" style={{fontSize: "0.9em"}} type="text"  name="paypalEmail"  onChange={this.paymentTyping} />
            </Form.Group>
            <Form.TextArea  defaultValue={user.profileDetails?user.profileDetails.description:null} label="Description" style={{fontSize: "0.9em"}} name="description"  onChange={this.profileTyping} />
            <Form.Input>
            <Checkbox label='Banned' defaultChecked={user.banned}   name="banned"  onChange={this.typing} />
            </Form.Input>
            <p style={{color:"#276f86",fontSize:"0.9em"}}>{this.state.success?this.state.success:null}</p>
            <p style={{color:"#df4a32",fontSize:"0.9em"}}>{this.state.error?this.state.error:null}</p>
            <Button type='submit' circular color="red"  size="mini">Submit<Icon name="arrow alternate circle right outline" /></Button>
        </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

