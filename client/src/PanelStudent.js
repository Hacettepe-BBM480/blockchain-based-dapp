import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

class PanelStudent extends Component {

    constructor() {
        super();
        this.state = {
            studentId:"",
            studentNo:""
        }
    }

    componentDidMount() {
        const {
            studentNo,studentId
        } = this.props;
        this.setState({
            studentId,
            studentNo
        })
    }

    onChange = (e) => {
        const {value,name} = e.target;
        this.setState({
            [name] : value
        })
    }


    onDelete = () => {
        const {onDelete,index} = this.props;
        onDelete(this.state.studentNo,index);
    }

    onUpdate = () => {
        const {onUpdate} = this.props;
        const {studentNo,studentId} = this.state;
        onUpdate(studentNo,studentId);
    }

    render() {
        const {
            studentNo,studentId
        } = this.state
        return (
            <div className="row g-0">
                <div className="mb-3 col-1">
                                            <span className="input-group-text"
                                            ><Link to={"/student/"+studentNo} >{studentId}</Link></span>
                </div>
                <div className="mb-3 col-4 offset-4">
                    <input type="text" className="form-control" name="studentNo" onChange={this.onChange} value={studentNo}/>
                </div>
                <div className="col-2 offset-1">
                    <button
                        className="btn btn-dark" onClick={this.onDelete} >
                        <ArrowRightIcon fontSize={"small"}/>
                    </button>
                    <button
                        className="btn btn-dark" onClick={this.onUpdate} >
                        <ArrowRightIcon fontSize={"small"}/>
                    </button>
                </div>
            </div>
        );
    }
}

export default PanelStudent;