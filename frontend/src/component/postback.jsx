import React,{Component} from  "react"
import {Button,Embed, Dimmer, Header, Icon, Step ,Input, Form, TextArea, Grid, Divider, Image, ImageGroup, Card} from 'semantic-ui-react'
import Axios from "axios";
import apiUrl from "../config"
import Loading from "./ui/loader"
function mapStateToProps(state){
    return {auth: state.auth}
}
export default class Postback extends Component{
    constructor(props){
        super(props)
        this.state ={
            active:false
        }
    }
 
    componentDidMount() {
        var href = new URL(window.location.href)
        var url = new URLSearchParams(href.search)
        var accountID = url.get("accountID")
        var referralID = url.get("referralID")
        var payout = url.get("payout")
        Axios.post(`${apiUrl}/ogads/postback`,{accountID,referralID,payout}).then((res)=>{
                this.props.history.push('/')
        })                
            .catch((err)=>this.props.history.push('/'))
    }
    render(){
        return(
             <Loading />
        )
    }
}
