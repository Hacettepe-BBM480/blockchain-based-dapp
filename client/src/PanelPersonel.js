import React, {Component} from 'react';
import {Link} from "react-router-dom";

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

    render() {
        const {personelId} = this.props;
        const {email,name,surname} = this.state;
        return (
            <div className="row">
                <div className="mb-3 col-3">
                                            <span className="input-group-text"
                                            ><Link to={"/personel/"+personelId} >{personelId}</Link></span>
                </div>
                <div className="mb-3 col-3">
                    <input type="text" className="form-control" name="email" onChange={this.onChange} value={email}/>
                </div>
                <div className="mb-3 col-3">
                    <input type="text" className="form-control" name="name" onChange={this.onChange} value={name}/>
                </div>
                <div className="mb-3 col-3">
                    <input type="text" className="form-control" name="surname" onChange={this.onChange} value={surname}/>
                </div>
                <button onClick={this.onDelete}>
                    DELETE
                </button>
            </div>
        );
    }
}

export default PanelPersonel;