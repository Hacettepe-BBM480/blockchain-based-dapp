import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";

import {Button,Modal} from "react-bootstrap";
import AddIcon from '@material-ui/icons/Add';

export default class StudentHeader extends Component {

    constructor(props) {
        super();
        this.state = {
            buffer : undefined,
            pendingApiCall:false,
            show:false,
            fileName : null,
            fileDescription : null,
            errors:{}
        }
    }

    handleClose = () => {
        this.setState({buffer:undefined,show:false});
    }
    handleShow = () => {
        this.setState({show:true});
    }

    captureFile = (event) => {
        // Process file for IPFS. File convert to Buffer
        event.preventDefault();

        const file = event.target.files[0];
        const reader = new window.FileReader(); // file'ı buffer arraya çevirmek için kullanılır. FileReader, Buffer array araçlarını sağlar.
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            let buff = Buffer(reader.result);
            let base64data = buff.toString('base64');
            this.setState({ buffer: base64data,extension:file.name.split(".")[1] }); // ipfs'e eklenecek data
        };
    };

    isThereError = () => {
        const{
            fileName,
            description,
            buffer
        } = this.state;
        return fileName === null || fileName === "" || description === null || description === "" || buffer === undefined;
    }


    onSubmit = async () => {
        const {buffer,extension} = this.state;
        if(!this.isThereError()){
            try{
                axios.defaults.headers.common["auth-token"] = await localStorage.getItem("token");
                const {id} = this.props;
                const {fileName,fileDescription} = this.state;
                const body =  {
                    name: fileName,
                    description:fileDescription,
                    studentId: id,
                    buffer,
                    extension
                }
                this.setState({pendingApiCall:true})
                await axios.post("http://localhost:3000/api/web3/uploadFile",body);
                swal({
                    title: "Successfully uploaded.",
                    icon: "success",
                    timer:1500
                }).then((isClicked) => {
                    this.props.getFiles();
                });
            }catch (err){
                swal({
                    title: "Warning!",
                    text: "Authorization error",
                    icon: "warning",
                    dangerMode: true,
                })
            }
            this.handleClose();
        }else{
            swal({
                title: "Warning!",
                text: "Please choose a file.",
                icon: "warning",
                dangerMode: true,
            });
        }
        this.setState({pendingApiCall:false})

    }

    onChange = (e) =>{
        const {value,name} = e.target;
        const errors = {...this.state.errors};
        value === "" ? errors[name] = "must be filled" : errors[name] = undefined;
        this.setState({
            [name]:value,
            errors
        })
    }

    errorJSXClassName = (error) => {
        const className = error
            ? "form-control is-invalid shadow p-2 mb-3"
            : "form-control shadow p-2  mb-3";
        return className;
    }


    render() {
    const { id, no } = this.props;
    const {fileName,description} = this.state.errors;
    return (
      <div className="row">
        <div className="col-4">
          <div className="input-group mb-3">
            <span style={{backgroundColor: "gray",color:"white"}} className="input-group-text" id="basic-addon3">
              Student ID
            </span>
            <input
              type="text"
              className="form control"
              id="studentID"
              aria-describedby="basic-addon3"
              disabled
              defaultValue={id}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="input-group mb-3">
            <span style={{backgroundColor: "gray",color:"white"}} className="input-group-text" id="basic-addon3">
              Student NO
            </span>
            <input
              type="text"
              className="form-control"
              id="studentNo"
              aria-describedby="basic-addon3"
              disabled
              defaultValue={no}
            />
          </div>
        </div>
        <div className="col-4">
            <div className="row">
                <div className="col-8">

                </div>
                <div className="col-4 mb-3">
                    <Button variant="primary" onClick={this.handleShow}>
                        <AddIcon/>
                        Upload File
                    </Button>

                    <Modal show={this.state.show} backdrop="static" centered onHide={this.handleClose}>
                        <Modal.Header >
                            <Modal.Title>Student File</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mb-3 row">
                                <label
                                    className="col-sm-3 col-form-label"
                                >
                                    File Name
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        name={"fileName"}
                                        onChange={this.onChange}
                                        className={this.errorJSXClassName(fileName)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    className="col-sm-2 col-form-label"
                                >
                                    Description
                                </label>
                                <div className="col-sm-9 offset-1">
                                    <div className="form-floating">
                                      <textarea
                                          className={this.errorJSXClassName(description)}
                                          name={"fileDescription"}
                                          placeholder="Leave a comment here"
                                          id="floatingTextarea2"
                                          style={{ height: 100 }}
                                          onChange={this.onChange}
                                      />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    className="col-sm-3 col-form-label"
                                >
                                    File
                                </label>
                                <div className="col-sm-9">
                                    <input className="form-control" type="file" id="formFile" onChange={this.captureFile}/>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="danger"
                                    onClick={this.onSubmit}
                                    disabled={this.state.pendingApiCall}
                            >
                                {this.state.pendingApiCall && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                Upload File
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </div>

        </div>
      </div>
    );
  }
}
