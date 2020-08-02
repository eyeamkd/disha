import React, {Component} from 'react'
// import {DropzoneArea} from 'material-ui-dropzone'
 
class DspaceEditModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files){
    this.setState({
      files: files
    });
  }
  render(){
    return (
      // <DropzoneArea
      //   onChange={this.handleChange.bind(this)}
      //   /> 
      <h1>D-space edit DspaceEditModal</h1>
    )
  }
}
 
export default DspaceEditModal;