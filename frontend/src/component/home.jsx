import React,{Component} from  "react"
import { Popup ,Button, Grid,Embed,Header,Dimmer,GridColumn, Icon, Image} from 'semantic-ui-react'
import Footer from "./footer";
import Navbar from "./navbar";
import {connect} from "react-redux"
import Particles from "react-particles-js";
import Typist from 'react-typist';
import "react-typist/dist/Typist.css"

function mapStateToProps(state){
    return {auth: state.auth}
}
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            active:false
        }
        this.handleClose =this.handleClose.bind(this)
        this.handleOpen =this.handleOpen.bind(this)
    }
    handleOpen(){ this.setState({ active: true })}
    handleClose(){this.setState({ active: false })}
    render(){
        return(
            <div className=" home">
                <Navbar {...this.props}/>
            
                <section >
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
	            "direction": "top",
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
	}} style={{position:"absolute",width:"100%"}} />
                <div className="first-section" >
                <div className="ui container  ">
                <div >
                <Grid columns="equal">
                <GridColumn width="8" mobile="16" tablet="8" computer="8">
                    <Image src="../images/mobile_content_locker.png" size="huge"/>
                </GridColumn>
                <GridColumn width="8" mobile="16" tablet="8" computer="8">
                    <h1 className="open-sans2" >
                    <Typist>
                    <span>  Welcome to StreamJar</span>
                    <Typist.Backspace count={27} delay={1000} />
                    <span>  Welcome to StreamJar </span>
                    </Typist> 
                    </h1>

                    <p>
                        StreamJar is a service that allows viewers to tip streamers for free. Viewers don't have to spend their own hard earned money, 
                        which will help streamers monetize a larger portion of their audience.
                    </p>
                    <p>
                        The vast majority of a streamer's audience consists of non-paying viewers. StreamJar helps streamers tap into the potential of this 
                        portion of their audience. There is no need for viewers to enter a credit card or other online payment method in order to donate. 
                        This will help younger viewers in your audience donate and also help get non-paying viewers more involved.
                    </p>
                    <p>
                        To see a sample profile, view a demo below. Sign up to start accepting donations!
                    </p>

                    <Button basic animated size="large"  onClick={()=>this.props.history.push("/profile/u/fwg")} color="grey">
                        <Button.Content visible style={{color:"#ddd"}}>View Demo</Button.Content>
                        <Button.Content hidden>View Demo</Button.Content>
                    </Button>
                    {/* <Button  onClick={this.handleOpen} color='orange' content={<p ><i className="play icon"  ></i> Watch video</p>} /> */}
                </GridColumn>
                    {/* <GridColumn width="6" mobile="16" tablet="6" computer="6"></GridColumn> */}
                </Grid>
                </div>
                <div className="scroll-top">
                    <Button color="red"  icon="angle up" onClick={this.scrolltop}/>
                </div>
                
                    <style>
                        {`
                        .ui.basic.grey.button, .ui.basic.grey.buttons .button{
                            box-shadow: 0 0 0 1px #ccc inset!important;
                        }
                        `}
                    </style>
                </div>
                </div>
                </section>
               <style>{`
                    body{
                    background:#000 url('../images/darkbg.png');
                    background-position:right;
                    background-size:cover;
                    color:#eee;
                    background-attachment:fixed;
                    }
                    @media (max-width:400px){
                            .ui.container{
                            margin-left: 0.5em !important;
                            margin-right: 0.5em !important;
                        }
                    }
               `}</style>
                
                <Footer/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Home)