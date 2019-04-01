import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux";
function mapStateToProps(state) {
    return { auth: state.auth }
}
class Privateroute extends Component {
    constructor(props) {
        super(props);
        this.checkRole=this.checkRole.bind(this)
    }
    checkRole(props){
       if(this.props.auth.user.role ==="admin" && this.props.path=="/admin/dashboard") 
        return <this.props.component {...props}  auth={this.props.auth}/>
        else if(this.props.auth.user.role !=="admin" && this.props.path=="/admin/dashboard") 
        return <Redirect
       to={{
       pathname: "/dashboard",
       state: { from: props.location }
       }}
       />;
       else return <this.props.component {...props}  auth={this.props.auth}/>
         
    }
    render() {
        return (
                <Route 
                path={this.props.path} 
                render={(props) => this.props.auth.isAuthenticated === true ?
                     this.checkRole(props)
                      : <Redirect
                        to={{
                        pathname: "/signin",
                        state: { from: props.location }
                        }}
                        />
                } />
            )}
}

export default connect(mapStateToProps)(Privateroute);
