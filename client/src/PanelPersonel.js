import React, {Component} from 'react';
import {Link} from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";

class PanelPersonel extends Component {

    constructor() {
        super();
        this.state = {
            email : "",
            name :"",
            surname:""
        }
    }

    componentDidMount() {
        const {email,name,surname} = this.props;
        this.setState({
            email,
            name,
            surname
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
        onDelete(this.props.personelId);
    }

    onUpdate = () => {
        const {onUpdate,personelId} = this.props;
        const {name,surname,email} = this.state;
        onUpdate(personelId,name,surname,email);
    }

    render() {
        const {personelId} = this.props;
        const {email,name,surname} = this.state;
        return (
            <div className=" d-flex g-0">
                <div className="mb-3 col-3">
                        <span className="input-group-text"
                        ><Link to={"/personel/"+personelId} >{personelId}</Link></span>
                </div>
                <div className="mb-3 col-3 mr-3">
                    <input type="text" className="form-control" name="email" onChange={this.onChange} value={email}/>
                </div>
                <div className="mb-3 col-2">
                    <input type="text" className="form-control" name="name" onChange={this.onChange} value={name}/>
                </div>
                <div className="mb-3 col-2">
                    <input type="text" className="form-control" name="surname" onChange={this.onChange} value={surname}/>
                </div>
                <div className={"row flex-grow-1"} style={{textAlign:"center"}}>
                    <button type="button" className={"btn col-3 offset-3 btn-sm pb-3"} onClick={this.onDelete}><DeleteForeverIcon  /></button>
                    <button type="button" className={"btn col-3  btn-sm pb-3"} onClick={this.onUpdate}> <SystemUpdateAltIcon /></button>
                </div>
            </div>
        );
    }
}

export default PanelPersonel;