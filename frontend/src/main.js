import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "./component/home"
import AOS from "aos"
import 'aos/dist/aos.css';
import Signin from './component/signin';
import Asignin from './component/admin/signin';
import Signup from './component/signup';
import Adashboard from './component/admin/dashboard';
import Dashboard from './component/dashboard';
import Privateroute from './container/privateroute';
import Find from './component/find';
import Profile from './component/profile';
import About from './component/about';
import Reset from './component/reset';
import Postback from './component/postback';
import Checkstatus from './container/checkstatus';
class App extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }
    componentWillMount() {
        AOS.init();
    }
  
    render() {
        return (
            <div>
          <Switch>
                   
                    <Route exact path="/ogads/postback" component={Postback} />
                    <Route exact path="/find" component={Find} />
                    <Route exact path="/forgot-password" component={Reset} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/profile/u/:username" component={Profile} />
                    <Privateroute exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/admin/signin" component={Asignin} />
                    <Privateroute exact path="/admin/dashboard" component={Adashboard} />
                    <Checkstatus exact path="/signup" component={Signup} />
                    <Checkstatus exact path="/signin" component={Signin} />
                    <Route path="*" component={Home} />
                    
                </Switch>
          
            </div>
        );
    }
}

export default App;