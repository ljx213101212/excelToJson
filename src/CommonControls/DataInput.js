import React, { Component } from 'react';
import XLSX from 'xlsx';
class DataInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };
    handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) this.props.handleFile(files[0]);
    };

    render() {
        return (
            <form className="form-inline">
                <div className="form-group">
                    <label htmlFor="file">Spreadsheet</label>
                    <input type="file" className="form-control" id="file" accept={this.props.accept} onChange={this.handleChange} />
                </div>
            </form>
        );
    };
}
export default DataInput;