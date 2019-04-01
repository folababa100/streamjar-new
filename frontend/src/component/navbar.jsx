import React,{Component} from  "react"
import {Link} from "react-router-dom"
import {  Dimmer, Header, Icon, Grid, List, Image, Label, Dropdown, Button,  } from 'semantic-ui-react'
import classnames from "classnames"
import setAuthorizationToken from "./auth"
import Navmodal from "./ui/navmodal";
import $ from "jquery"
import apiUrl from "../config";
export default class Navbar extends Component{
    constructor(props){
        super(props)
        this.state ={
            active:false,
            toggleModal:false,
        }
        this.handleClose =this.handleClose.bind(this)
        this.handleOpen =this.handleOpen.bind(this)
        this.toggleModal =this.toggleModal.bind(this)
        this.logout =this.logout.bind(this)
    }
   componentDidMount() {
       $(window).scrollTop(0)
       $(window).on("scroll",()=>{
            if($(window).scrollTop()>400){
            $('.xnav').hide()
            $('.xnav').addClass("fixed")
            $('.xnav').show()
           }
           else $('.xnav').removeClass("fixed")
       })
   }
    logout(e) {
		e.preventDefault();
        setAuthorizationToken(false);
		localStorage.clear();
		window.location.reload();
    }
    handleOpen(){ this.setState({ active: true })}
    handleClose(){this.setState({ active: false,toggleModal:false })}
    toggleModal(){this.setState({ toggleModal: true })}
    
    render(){
        var link = this.props.auth.user.role=="admin"?"/admin/dashboard":"/dashboard"
        const trigger = <span >
            <Image src={`${this.props.auth.user.picture}`} avatar /> {this.props.auth.user.username}
        </span>
        var token = window.localStorage.getItem("kaytoken")
        return(
            <div className="xnav">
            {this.state.toggleModal?<Navmodal auth={this.props.auth} handleClose={this.handleClose} logout={this.logout}/>:null}
            <div className="ui container " style={{padding:"15px 0px"}}  data-aos="slide-down">
            <Grid columns="equal" >
                <Grid.Column width="4" mobile="12" tablet="10" computer="10" >
                    <div className="nav-brand">
                    <Link to="/" ><Image src={`${apiUrl}/images/logo.png`}  /><span >STREAMJAR</span></Link>
                    </div>
                    
                </Grid.Column>
                <Grid.Column only="mobile" mobile="4" style={{paddingRight:"0px",textAlign:"center"}}>
                <Button  onClick={this.toggleModal} compact color="red" style={{textAlign:"center"}} ><Icon name="bars" style={{margin:"0"}} /></Button>
                </Grid.Column>
                <Grid.Column  textAlign="right" only="tablet computer" className="lato" >
                    
                    <List floated='right' horizontal >
                    <List.Item floated='right' >
                    <Link to="/about" style={{margin:"0px 15px"}}>About</Link>
                    </List.Item>
                    <List.Item floated='right' style={{margin:"0px 15px"}}>
                    <Link to="/find">Find Users</Link>
                    </List.Item>
                    {this.props.auth.isAuthenticated ?
                    null:
                    <List.Item >
                    <button className={classnames('ui red button  ')} role='button' onClick={()=>this.props.history.push('/signin')}>
                       Sign In
                    </button>
                    </List.Item>
                    }
                     {this.props.auth.isAuthenticated ?
                    null:
                    <List.Item >
                    <button className={classnames('ui red button  ')} role='button' onClick={()=>this.props.history.push('/signup')}>
                       Sign Up
                    </button>
                    </List.Item>
                    }
                    {this.props.auth.isAuthenticated?
                    <List.Item >
                            <Dropdown icon="null" pointing className='link item'  trigger={trigger}>
                        <Dropdown.Menu>
                            <Dropdown.Header>My Profile</Dropdown.Header>
                            <Dropdown.Item onClick={()=>this.props.history.push(`${link}`)}><Icon  name='user outline' />  Dashboard</Dropdown.Item>
                            <Dropdown.Item onClick={this.logout}><Icon  name="sign-out" />  Sign out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </List.Item>
                    
                    :null}
                    </List>
                </Grid.Column>

            </Grid>
            </div>
            </div>
        )
    }
}