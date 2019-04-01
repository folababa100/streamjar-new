

import React,{Component} from "react"
import apiUrl from '../../config';
import ReactDropzone from 'react-dropzone';
import {Card, Container, Icon, Segment, Image, Grid, Button, Form } from "semantic-ui-react";
import axios from "axios"
export default class DpImageUpload extends Component{
 constructor(props){
   super(props)
   this.state={
    files:[],
    isLoading:false,
    error:"",
    image:""
  }
    this.onDrop = this.onDrop.bind(this)
 }
 
  onDrop  (files) {
    // POST to a test endpoint for demo purposes
    this.setState({isLoading:true})
    files.forEach(file => {
      var formData = new FormData();
      formData.append("dp", file);
      axios.post(`${apiUrl}/api/uploadDp`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      }).then((res)=>{
        if(res.data.dpUrl){
          localStorage.setItem("picture",res.data.dpUrl);
          this.setState({isLoading:false,success:true,image:res.data.dpUrl})
        } else this.setState({error:"Error uploading image"})
      })
    });
   
  }

  render() {
    return (
      <div className="changeImg" style={{textAlign:"center"}}>
       <ReactDropzone
            multiple="false"
           accept="image/*"
           onDrop={this.onDrop}
           name="dp"
        >
        {({getRootProps, getInputProps}) => (
            <Button color="red" circular size="mini" {...getRootProps()} className="uploadDp">
              <input {...getInputProps()} />
                    <Icon name="camera" /> Upload
            </Button>
          )}
        </ReactDropzone>
        <Form loading={this.state.isLoading}>
        <Image src={this.state.image||this.props.user.profileDetails.picture} size="tiny" avatar circular />
        </Form>
          </div>
    );
  }
}