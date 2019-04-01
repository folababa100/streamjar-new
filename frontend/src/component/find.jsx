import React,{Component} from  "react"
import { Popup ,Button, Grid,Embed,Header,Dimmer,GridColumn, Icon, Image, Form, Card} from 'semantic-ui-react'
import Footer from "./footer"; 
import {Link} from "react-router-dom"
import Navbar from "./navbar";
import {connect} from "react-redux"
import Particles from "react-particles-js";
import Typist from 'react-typist';
import "react-typist/dist/Typist.css"
import Axios from "axios";
import apiUrl from "../config"
import moment from "moment"
import Searchplaceholder from "./ui/searchplaceholder";
function mapStateToProps(state){
    return {auth: state.auth}
}
 class Find extends Component{
    constructor(props){
        super(props)
        this.state={
            active:false,
            query:"",
            users:[],
            contentLoaded:false,
            isLoading:false
        }
    }
    typing = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    componentWillMount() {
        Axios.get(`${apiUrl}/api/getUsers`).then((res)=>{
            if(res.data.users)
            this.setState({users:res.data.users,contentLoaded:true})})
            .catch((err)=>console.log(err))
    }
    componentWillUnmount() {
    }
    submit= (e)=>{
        e.preventDefault();
        this.setState({isLoading:true})
        Axios.post(`${apiUrl}/api/search`,this.state).then((res)=>{
           console.log(res.data)
            this.setState({users:res.data.users,isLoading:false,contentLoaded:true})
        })
    }
    render(){
        var array=[1,2,3,4,5,6,7,9,0]
        return(
            <div className=" misc">
                <Navbar {...this.props}/>
            
                <section className="first-section" >
              
                    <div >
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
	}} style={{position:"absolute",width:"100%",top:0,left:0}} />
                    <div className="ui container  ">
                    <div >
                    <Grid columns="equal">
                    <GridColumn width="4" mobile="16" tablet="4" computer="4">
                    </GridColumn>
                    <GridColumn width="8" mobile="16" computer="8" tablet="8" >
                            <h1 className="open-sans2">Find And Tip Steamers</h1>
                           <Form size="large" onSubmit={this.submit} loading={this.state.isLoading}>
                           <Form.Input name="query" onChange={this.typing}  action={<Button color="red"><Icon name="search" /> Search</Button>} placeholder='Search...' />
                           </Form>
                        </GridColumn>
                        <GridColumn width="4" mobile="16" tablet="4" computer="4">
                    </GridColumn>
                            </Grid>
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
                   <section className="second-section">
                     <Grid container>
                         <Grid.Row>
                         <h2>Search Results</h2>
                         </Grid.Row>
                         {this.state.users.map((user)=>(
                         <Grid.Column width="4" mobile="16" computer="4" tablet="4">
                                 <Card>
                                 <Image src={user.profileDetails.picture} size="medium" style={{height:"150px"}}/>
                                 <Card.Content>
                                 <Card.Header><Link to={`/profile/u/${user.username}`}>{user.username}</Link></Card.Header>
                                 <Card.Meta>
                                     <span className='date'>Joined in {moment(user.date).fromNow()}</span>
                                 </Card.Meta>
                                 <Card.Description>{user.profileDetails.description}</Card.Description>
                                 </Card.Content>
                             </Card>
                         </Grid.Column>
                           ))}
                           {this.state.contentLoaded?null:
                            array.map((num)=> <Searchplaceholder />)
                           }
                           {this.state.users.length ===0 && this.state.contentLoaded?
                           <Grid.Column width={16}>
                           <center style={{padding:"100px"}}>
                               <h1><Icon name="search" /></h1>
                               <h1> No User found </h1>
                           </center>
                           </Grid.Column>
                           :null}

                    </Grid>
                   </section>
               <style>{`
             
               @media (max-width:400px){
                     .ui.container{
                        margin-left: 0.5em !important;
                        margin-right: 0.5em !important;
                    }
                }
               `}</style>
               <Footer history={this.props.history}/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Find)