import React,{Component} from  "react"
import { Popup ,Button, Grid, Card, Rating, Comment, Icon, Image, Form, Loader, Divider, Label, GridColumn, Placeholder} from 'semantic-ui-react'
import Footer from "./footer";
import {Link} from "react-router-dom"
import Navbar from "./navbar";
import {connect} from "react-redux"
import apiUrl from "../config"
import Axios from "axios";
import numeral from "numeral"
import setAuthorizationToken from "./auth"
import Loading from "./ui/loader";
import Changepassword from "./ui/changepassword";
import Descwidget from "./ui/desc";
import Paymentwidget from "./ui/paymentwidget";
import DpImageUpload from "./forms/changedp";

function mapStateToProps(state){
    return {auth: state.auth}
}

 class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            user:{profileDetails:{},paymentDetails:{paymentMethod:{}}},
            editDesc:false,
            description:"",
            offers:[]
        }
        this.editDesc =this.editDesc.bind(this)
        this.typing =this.typing.bind(this)
    }
    componentWillMount(){
        this.mounted = true
        if(this.mounted){
            Axios.get(`${apiUrl}/api/getProfile`).then((res)=>{
                if(res.data.user)this.setState({user:res.data.user})
            })
            Axios.get('https://ipapi.co/json')
            .then((res) => {
                delete Axios.defaults.headers.common["Authorization"]
               Axios.get(`https://mobverify.com/api/v1/?affiliateid=162272&limit=8&ip=${res.data.ip}&ctype=3&aff_sub3=${this.state.user.accountID}&aff_sub4=${this.state.user.referredBy||0}`).then((response) => {
                  this.setState({ offers: response.data.offers ,contentLoaded:true})
                  setAuthorizationToken(window.localStorage.getItem("jartoken"))
                })
            })
        }
  
    }
    componentWillUnmount(){
        this.mounted = false
    }
    editDesc = ()=>this.setState({editDesc:!this.state.editDesc})
    typing = ()=>this.setState({editDesc:!this.state.editDesc})
    render(){
        var count = [1,2,3,4,5,6,7,8]
        var {user} = this.state
        return(
            <div className="light dashboard">
                <Navbar {...this.props} />
                <section  className="first-section"  style={{}}>
                
                    <div className="ui container  ">
                    <div  >
                    <Grid columns="equal" textAlign="center">
                        <Grid.Column width="8" mobile="16" tablet="8" computer="8">
                            
                            <DpImageUpload user={user}/>
                            <h2 className="open-sans2" >
                            <span>{this.state.user.username}</span><br />
                            </h2>
                            <p className="epistle">
                            AccountID: {user.accountID} | Total Amount Earned: {user.totalEarned} | Total Unpaid: {user.amountUnpaid} <br /> Referral Earnings: {user.referralEarnings}
                            </p>
                            
                        </Grid.Column>
                            </Grid>
                     </div>
                     </div>
                   </section>
                <section style={{padding:"20px 0px 20px"}}>
                <Grid  columns="equal"  container>
                            <Grid.Column width="5" mobile="16" tablet="5" computer="4" className="no-xspad">
                            <Descwidget  user="me"
                            description={user.profileDetails.description} />
                            <Changepassword />
                            <Paymentwidget 
                            email={user.paymentDetails?user.paymentDetails.paymentMethod.paypalEmail:""}  
                            fullName={user.paymentDetails?user.paymentDetails.fullName:""} />
                             <Card fluid={true} style={{border:"0px"}}>
                            <Card.Content>
                                <Card.Header><Icon name="share alternate" /> Referral Link</Card.Header>
                            </Card.Content>
                            <Card.Content>
                            <Link to={`/signup?r=${user.accountID}`}> {apiUrl}/signup?r={user.accountID} </Link>
                            </Card.Content>
                            </Card>
                            </Grid.Column>
                            <Grid.Column width="11"  mobile="16" tablet="11" computer="12" className="no-xspad">
                                <Grid  columns="equal" >
                                    <Grid.Row  >
                                        <Grid.Column width="16" className="no-xspad">
                                        <Card fluid={true} style={{border:"0px"}}>
                                            <Card.Content>
                                                <Card.Header><Icon name="hand lizard outline" /> Donate to this streamer</Card.Header>
                                            </Card.Content>
                                            <Card.Content>
                                                <Grid width="equal">
                                                {this.state.offers.map((offer)=>(
                                                    <Grid.Column width="8" mobile="16" tablet="8" computer="8">
                                                        <a key={offer.offerid} href={offer.link} target="_blank" >
                                                        <Grid width="equal">
                                                        <Grid.Column width="3">
                                                        <Image src={offer.picture} />  
                                                        </Grid.Column>
                                                        <Grid.Column width="13">
                                                            <p className="lato">{offer.name_short} <span style={{float:"right"}}>{numeral(offer.payout * 0.80).format('$0,0.00')}</span></p>
                                                            <p>{offer.adcopy}</p>
                                                        </Grid.Column>
                                                        </Grid>
                                                        </a>
                                                </Grid.Column>
                                                ))}
                                                {this.state.offers.length === 0 ?
                                                   count.map((n)=>
                                                   <Grid.Column width="8" mobile="16" tablet="8" computer="8">
                                                   <Placeholder>
                                                   <Placeholder.Header image>
                                                     <Placeholder.Line />
                                                     <Placeholder.Line />
                                                   </Placeholder.Header>
                                                 </Placeholder>
                                               </Grid.Column>)
                                                  :null
                                                }
                                                </Grid>
                                            </Card.Content>
                                        </Card>
                                     
                                        </Grid.Column>
                                        <Grid.Column >
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>     
                            </Grid.Column>
                        </Grid>   
                </section>
                {user.username?null:<Loading />}
               <Footer history={this.props.history}/>
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