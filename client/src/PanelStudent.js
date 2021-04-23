import React, {Component} from 'react';
import {Link} from "react-router-dom";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

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
        const {onDelete} = this.props;
        onDelete(this.state.studentNo);
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
        const {index} = this.props;
        return (
            <tr>
                <th scope="row">{index+1}</th>
                <td><Link to={"/student/"+studentNo} >{studentId}</Link></td>
                <td><input type="text" style={{width:"50%"}} className="form-control" name="studentNo" onChange={this.onChange} value={studentNo}/></td>
                <td >
                    <div className={"d-flex justify-content-around"}>
                        <button
                            onClick={this.onDelete} style={{
                            border:"none"
                        }}>
                            <DeleteForeverIcon />
                        </button>
                        <button
                            onClick={this.onUpdate} style={{
                            border:"none"
                        }}>
                            <SystemUpdateAltIcon />
                        </button>
                    </div>

                </td>
            </tr>
        );
    }
}

export default PanelStudent;