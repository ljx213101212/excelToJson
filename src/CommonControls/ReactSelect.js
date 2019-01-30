import React, { Component } from 'react';
import Select from 'react-select';

class ReactSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    };
    handleSelectChange(selectedOption) {
        this.props.handleSelection(selectedOption);
    };
    render() {
        return (
            <div className="form-group">
                <Select options={ this.props.options} onChange={this.handleSelectChange} defaultValue={{ value: 'Text to translate', label: 'United State of America' }} />
            </div>
        );
    };
}

export default ReactSelect;