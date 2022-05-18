import React from 'react';
import {Form} from 'react-bootstrap';
export default class Field extends React.Component {
    render() {
        return( 
        <div className="FormRow">
            <Form.Label htmlFor={this.props.id} className="FormRowLabel">
                {this.props.label}
            </Form.Label>
            <Form.Control
                className="FormRowInput"
                id={this.props.id}
                type={this.props.type}
                min={this.props.min}
                placeholder={this.props.placeholder}
                required={this.props.required}
                autoComplete={this.props.autoComplete}
                value={this.props.value}
                onChange={this.props.onChange}
            />
        </div>
      );
    }
}
