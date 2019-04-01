import React,{Component} from  "react"
import { Popup ,Button, Grid, Card, Rating, Comment, Icon, Image, Form, Loader, Divider, Label, GridColumn, Placeholder, Table} from 'semantic-ui-react'
import {Link} from "react-router-dom"
import Navbar from "../navbar";
import {connect} from "react-redux"
import apiUrl from "../../config"
import Axios from "axios";
import numeral from "numeral"
import setAuthorizationToken from "../auth"
import Loading from "../ui/loader";
import Editmodal from "./editacct";
import Paypalmodal from "./paymodal";
function mapStateToProps(state){
    return {auth: state.auth}
}

 class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            users:[],
            modal:false,
            payModal:false,
            contentLoaded:false,
            activeUser:{profileDetails:{},paymentDetails:{paymentMethod:{}}},
            payUser:{profileDetails:{},paymentDetails:{paymentMethod:{}}}
        }
        this.editDesc =this.editDesc.bind(this)
        this.showModal =this.showModal.bind(this)
        this.showPayModal =this.showPayModal.bind(this)
        this.typing =this.typing.bind(this)
    }
    componentWillMount(){
        Axios.get(`${apiUrl}/api/getUsers`).then((res)=>{
            if(res.data.users)
            this.setState({users:res.data.users,contentLoaded:true})})
            .catch((err)=>console.log(err))
  
    }
   
    showModal(e,user){
        e.preventDefault();
        this.setState({activeUser:user,modal:true})
    }
    showPayModal(e,user){
        e.preventDefault();
        this.setState({payUser:user,payModal:true})
    }
    showPay =  () => this.setState({ payModal: true })
    closePay = () => this.setState({ payModal: false })
    show =  () => this.setState({ modal: true })
    close = () => this.setState({ modal: false })
    editDesc = ()=>this.setState({editDesc:!this.state.editDesc})
  
   
    typing = ()=>this.setState({editDesc:!this.state.editDesc})
    render(){
        var count = [1,2,3,4,5,6,7,8]
        var {user,activeUser,payUser,payModal,modal} = this.state
        return(
            <div className="light admin ">
                {activeUser.username && modal?<Editmodal close={this.close} user={activeUser} />:null}
                {payUser.username && payModal?<Paypalmodal close={this.closePay} user={payUser} />:null}
                <Navbar {...this.props} />
                <Grid columns="equal">
                    <Grid.Column width="4"  tablet="4" computer="4" only="tablet computer">
                        <div className="left-grid">
                          <h3><Icon name="user outline"></Icon> Users</h3>
                        </div>
                    </Grid.Column>
                    <Grid.Column width="12" mobile="16" tablet="12" computer="12" className="no-xspadding">
                    <div className="right-grid">
                                <Table columns={5}>
                                    <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Account ID</Table.HeaderCell>
                                        <Table.HeaderCell>Username</Table.HeaderCell>
                                        <Table.HeaderCell>PayPal Email</Table.HeaderCell>
                                        <Table.HeaderCell>Amount Unpaid</Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                    </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {this.state.users.map((user)=>(
                                            <Table.Row>
                                                <Table.Cell>{user.accountID}</Table.Cell>
                                                <Table.Cell>{user.username}</Table.Cell>
                                                <Table.Cell>{user.paymentDetails?user.paymentDetails.paymentMethod.paypalEmail:null}</Table.Cell>
                                                <Table.Cell>{user.amountUnpaid}</Table.Cell>
                                                <Table.Cell>
                                                    <Button size="tiny" basic onClick={(e)=>this.showPayModal(e,user)}>Pay</Button>
                                                    <Button size="tiny" basic onClick={(e)=>this.showModal(e,user)}> Edit</Button>
                                                    </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>

                                    <Table.Footer>
                                    <Table.Row>
                                        <Table.HeaderCell></Table.HeaderCell>
                                        <Table.HeaderCell/>
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                    </Table.Row>
                                    </Table.Footer>
                                </Table>
                        </div>
                    </Grid.Column>
                </Grid>
                {this.state.contentLoaded?null:<Loading />}
               <style>{`
           
           .xnav{
            background: #fff;
            color:#000;
            border-bottom:1px solid #ddd;

            }
        .xnav  a{
                color: #000 !important
            }
            .xnav .navmodal a{
                color: #f7f7f7 !important
            }
           `}</style>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Dashboard)