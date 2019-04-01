import React,{Component} from  "react"
import {Button, Grid,Icon, Input} from 'semantic-ui-react'
import {Link} from "react-router-dom"
import $ from "jquery"
export default class Footer extends Component{
    scrolltop(){
        $(window).scrollTop(0)
    }
    render(){
        return(
                <footer  >
                    <div >
                    <Grid  columns="equal" className="top-footer">
                    <Grid.Row>
                    <Grid.Column width="5" mobile="16" tablet="5" computer="5">
   
                    </Grid.Column>
                    <Grid.Column textAlign="center" >
                        <div style={{padding:"10px 0px"}}>
                        <div style={{color:"#fff"}}>Sign Up and start accepting donations</div>
                        <p><small>Register an account today!</small>
                        </p>
                        </div>
                    </Grid.Column >
                        <Grid.Column width="5"  mobile="16" tablet="5" computer="5" >
                        <div style={{padding:"10px 0px"}}>
                        </div>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                    <Grid  columns="equal" className="main-footer" >
                 
                    <Grid.Row className="first-row">
                        <Grid.Column width="5">
                        <Grid >
                            <Grid.Row >
                            <Grid.Column>
                            <h2>StreamJar</h2>
                            <p >
                            StreamJar is a service that allows viewers to tip streamers for free. 
                            Viewers don't have to spend their hard earned money, and streamers get rewarded for their hard work.
                            </p>
                            </Grid.Column>
                            </Grid.Row>  
                         </Grid>
                        </Grid.Column>
                        <Grid.Column>
                        {/* <h3> Support </h3> */}
                            <Grid >
                            <Grid.Row >
                                <Grid.Column>
                                <Link to="/about"> About Us</Link>
                                </Grid.Column>
                                </Grid.Row>
                                {/* <Grid.Row >
                                <Grid.Column>
                                    <Link to="/privacy_policy">Privacy policy</Link>
                                </Grid.Column>
                                </Grid.Row> */}
                               
                            </Grid>
                        </Grid.Column>
                        <Grid.Column>
                            <Grid >
                            <Grid.Row >
                                <Grid.Column>
                                    <a target="_blank" href="https://medium.com/@StreamJar.co">Blog</a>
                                </Grid.Column>
                                </Grid.Row>
                             {/* <Grid.Row >
                                <Grid.Column>
                                <Link to="/affiliates">Affiliate</Link>
                                </Grid.Column>
                                </Grid.Row> */}
                            </Grid>
                        </Grid.Column>
                        <Grid.Column>
                        <Grid >
                         
                        <Grid.Row >
                                <Grid.Column>
                                <Link to="/find_user">Find Users</Link>
                                </Grid.Column>
                                </Grid.Row>
                        </Grid>
                        </Grid.Column>
                        <Grid.Column>
                        {/* <p><Button  content='Send a request' className="ask"  fluid onClick={()=>this.props.history.push('/request')}/></p> */}
                        <p>
                            <a href="https://www.twitch.tv/streamjarco" target="_blank"><Icon name="twitch" size="big"/></a>
                            <a href="https://twitter.com/StreamJarCo" target="_blank"><Icon name="twitter" size="big"/></a>
                            <a href="https://www.instagram.com/streamjar.co/" target="_blank"><Icon name="instagram" size="big"/></a>
                            <a href="https://www.facebook.com/Stream-Jar-346516332629126/" target="_blank"><Icon name="facebook" size="big"/></a>
                            <a href="https://www.youtube.com/channel/UC-zfO8JaRVBuRfkzEGTHhAw" target="_blank"><Icon name="youtube" size="big"/></a>
                        </p>

                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                   <div className="scroll-top">
                        <Button color="red"  icon="angle up" onClick={this.scrolltop}/>
                   </div>
                   <div >
                    <div style={{textAlign:"center"}} className="container ui" >
                    <div className="copyright"><small >© 2019 StreamJar, all rights reserved.</small>
                    </div>
                    </div>
                    </div>
                   
                  
                   </div>
                   <style>{`
                   @media (max-width:400px){
                .ui.container{
                   margin-left: 0.5em !important;
                   margin-right: 0.5em !important;
               }
               `}</style>
                </footer>
        )
    }
}