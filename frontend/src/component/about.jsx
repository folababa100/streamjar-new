import React,{Component} from  "react"
import {Button,Embed, Dimmer, Header, Icon, Step ,Input, Form, TextArea, Grid, Divider, Image, ImageGroup, Card} from 'semantic-ui-react'
import Navbar from "./navbar";
import Footer from "./footer";
import Particles from "react-particles-js";
import Typist from "react-typist"
import {connect} from "react-redux"
import $ from "jquery"
function mapStateToProps(state){
    return {auth: state.auth}
}
class About extends Component{
    constructor(props){
        super(props)
        this.state ={
            active:false
        }
    }
 
    componentDidMount() {
         $(window).on("scroll",()=>{
        if(window.scrollY >500 && $(window).innerWidth() > 800 && window.scrollY < $('#content').innerHeight() ){
        $('#sidebar').addClass("fix")
        }else $('#sidebar').removeClass("fix")
    })
    }
    render(){
        return(
            <div className="misc ">
                <Navbar {...this.props} />
                <section  className="first-section"  style={{}}>
                <Particles params={{
                    "particles": {
                        "number": {
                            "value": 160,
                            "density": {
                                "enable": false
                            }
                        },
                        "size": {
                            "value": 3,
                            "random": true,
                            "anim": {
                                "speed": 4,
                                "size_min": 0.3
                            }
                        },
                        "line_linked": {
                            "enable": false
                        },
                        "move": {
                            "random": true,
                            "speed": 1,
                            "direction": "bottom",
                            "out_mode": "out"
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "bubble"
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        },
                        "modes": {
                            "bubble": {
                                "distance": 250,
                                "duration": 2,
                                "size": 0,
                                "opacity": 0
                            },
                            "repulse": {
                                "distance": 400,
                                "duration": 4
                            }
                        }
                    }
	}} style={{position:"absolute",width:"100%",top:0,left:0}} />
                    <div className="ui container  ">
                    <div  >
                        <Grid columns="equal" textAlign="center">
                            <Grid.Column width="8" mobile="16" tablet="8" computer="8">
                                {/* <Image size="small" src="../images/devcon.jpg" avatar/> */}
                                <h1 className="open-sans2" >Welcome to StreamJar</h1>
                            </Grid.Column>
                        </Grid>
                    </div>
                    </div>
                   </section>
                <section className="ui container second" style={{padding:"40px 0px ",fontSize:"1.1em"}}>
                    <Grid columns="equal">
                        <Grid.Column width="4" mobile="16" tablet="4" computer="4" className="no-xspadding">
                           {<div id="sidebar">
                           <Card style={{boxShadow:"none"}}>
                        <Card.Content>
                            <Card.Header>Contact Info</Card.Header>
                            <Card.Meta style={{margin:"20px 0px 10px"}}><Icon name="envelope outline" /> Email Address</Card.Meta>
                            <Card.Description>support@streamjar.co</Card.Description>
                        </Card.Content>
                        </Card>
                            </div>}
                        </Grid.Column>
                        <Grid.Column id="content" width="12" mobile="16" tablet="12" computer="12">
                            <p className="lato" style={{paddingTop:"20px"}}><b>How It Works</b></p> 
                            <p>
                                StreamJar is a service that allows viewers to tip streamers for free. 
                                While some viewers do donate their own money, the vast majority of a streamer's audience do not. 
                                StreamJar aims to help streamers monetize this vast majority by helping get the non-paying viewers more involved. 
                                Our platform lets streamers create a profile which will generate a donations page. 
                                Instead of your typical donation page which asks viewers for PayPal or credit card info, StreamJar lists out available apps, surveys, and other actions viewers can complete. 
                                Each time a viewer completes an action such as downloading a free app, the streamer gets paid. 
                                You can view a <a href="/profile/u/fwg">demo page here</a>.
                            </p>
                          
                            <p className="lato"  style={{paddingTop:"20px"}}><b>Sign up now</b></p>
                            <p>
                                StreamJar is currently in an open beta. Sign up now to test core features while we implement new features. 
                                As a way to say thank you to our early adopters, we are offering a 5% bonus to all streamers who create a profile during the beta phase. 
                                For every donation you receive, you will earn a 5% bonus on top of the original donation. 
                                This bonus will last for the lifetime of your time with us at StreamJar. 
                                The beta phase won't last long, so <a href="/signup">sign up</a> now!
                            </p>             
                          
                            <p  style={{paddingTop:"20px"}}>
                                The StreamJar platform is designed for you, the streamer. We want to hear your suggestions on what you like and dislike. 
                                What could make this platform better? Is there something you need that is missing? 
                                We would love to hear your suggestions at <a href="mailto:feedback@streamjar.co">feedback@streamjar.co</a>. 
                                The StreamJar team will try to add many features based on your feedback!
                            </p> 
                        
                        </Grid.Column>
                    </Grid>
                </section>
                <Footer/>
                
              </div>
        )
    }
}
export default connect(mapStateToProps)(About)
