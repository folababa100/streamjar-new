import React,{Component} from  "react"
import { Popup ,Button, Grid, Card, Rating, Comment, Icon, Image, Form, Loader, Divider, Label, GridColumn, Placeholder} from 'semantic-ui-react'
import Footer from "./footer";
import Navbar from "./navbar";
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import apiUrl from "../config"
import Axios from "axios";
import numeral from "numeral"
import Descwidget from "./ui/desc";
import Loading from "./ui/loader";
import {isAndroid,isTablet,isIOS,isBrowser,} from "react-device-detect"
function mapStateToProps(state){
    return {auth: state.auth}
}
 class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            user:{profileDetails:{}},
            editDesc:false,
            description:"",
            offers:[],
            contenLoaded:false
        }
        this.editDesc =this.editDesc.bind(this)
        this.typing =this.typing.bind(this)
    }
    componentWillMount(){
        var device;
        if(isAndroid) device ="android"
        else if(isIOS && isTablet) device ="ipad"
        else if(isIOS) device ="iphone"
        else device ="desktop"
        Axios.get(`${apiUrl}/api/getUser?username=${this.props.match.params.username}`)
        .then((res)=>{if(res.data.user)this.setState({user:res.data.user})})
        Axios.get('https://ipapi.co/json')
        .then((res) => {
            const instance = Axios.create({
                baseURL: 'https://jsonplaceholder.typicode.com',
                headers: {
                }
              });
            delete instance.defaults.headers.common["Authorization"]
          return instance.get(`https://mobverify.com/api/v1/?affiliateid=162272&limit=12&ip=${res.data.ip}&device=${device}&ctype=3&aff_sub3=${this.state.user.accountID}&aff_sub4=${this.state.user.referredBy||0}`).then((response) => {
              this.setState({ offers: response.data.offers,contenLoaded:true })
            })
        })
    }
    editDesc = ()=>this.setState({editDesc:!this.state.editDesc})
    typing = ()=>this.setState({editDesc:!this.state.editDesc})
    render(){
        var count = [1,2,3,4,5,6,7,8,9,0]
        var {user} = this.state
        return(
            <div className="light dashboard">
                <Navbar {...this.props} />
                <section  className="first-section"  style={{}}>
                
                    <div className="ui container  ">
                    <div  >
                    <Grid columns="equal" textAlign="center">
                        <Grid.Column width="8" mobile="16" tablet="8" computer="8">
                            <Image size="tiny" src={user.profileDetails.picture||"../images/devcon.jpg"} avatar/>
                            <h2 className="open-sans2" >
                            <span>{user.username}</span><br />
                            </h2>
                            {/* <p className="epistle">
                            AccountID: {user.accountID} | Total Amount Earned: {user.totalEarned} | Total Unpaid: {user.amountUnpaid}
                            <br /> Referral Earnings: {user.referralEarnings}
                            </p> */}
                            
                        </Grid.Column>
                            </Grid>
                     </div>
                     </div>
                   </section>
                <section style={{padding:"20px 0px 20px"}}>
                <Grid  columns="equal"  container>
                            <Grid.Column width="5" mobile="16" tablet="5" computer="4" className="no-xspad">
                            <Descwidget description={user.profileDetails.description} />
                            
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
                                                    <Grid.Column width="8" mobile="16" tablet="8" computer="8" className="">
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

export default connect(mapStateToProps)(Profile)