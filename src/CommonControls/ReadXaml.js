import React, { Component } from 'react';
import XLSX from 'xlsx';
import Select from 'react-select';
import DataInput from './DataInput';
import DragDropFile from './DragDropFile';

/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */
/* Notes:
   - usage: `ReactDOM.render( <SheetJSApp />, document.getElementById('app') );`
   - xlsx.full.min.js is loaded in the head of the HTML page
   - this script should be referenced with type="text/babel"
   - babel.js in-browser transpiler should be loaded before this script
*/
class ReadXaml extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
            cols: [],  /* Array of column objects e.g. { name: "C", K: 2 } */
            ws: null,
            selectedOption:"USA"
        };
        this.keyValuePair = {};
        this.sequenceArray = [];
        this.handleFile = this.handleFile.bind(this);
        if (!this.props.keyRegex){
            this.keyRegex = /x:Key\s*?=\s*?"([^"]+)"/
        }else{
            this.keyRegex = this.props.keyRegex;
        }

        if (!this.props.valueRegex){
            this.valueRegex = /<sys:String [^>]+>([^<]+)<\/sys:String>/
        }else{
            this.valueRegex = this.props.valueRegex;
        }
       
    };
    handleFile(file/*:File*/) {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        
        var self = this;
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            var lines = bstr.split(/[\r\n]+/g); 
          
            lines.forEach(function(line) { 
                /* ... */ 
                if (line.indexOf('sys:String') != -1){
                    var foundKey = line.match(self.keyRegex);
                    var foundValue = line.match(self.valueRegex);
                    if (foundKey && foundKey.length > 1 && foundValue && foundValue.length>1){
                        self.keyValuePair[foundKey[1]] = foundValue[1];
                        self.sequenceArray.push(foundKey[1]);
                    }   
                }
            });
            //notify xaml file loaded.
            if (typeof self.props.handleXamlFileChange === "function"){
                self.props.handleXamlFileChange(self.sequenceArray, self.keyValuePair);
            }
        };
        reader.readAsText(file);
    };

    render() {
        return (
            <DragDropFile handleFile={this.handleFile}>
                <div className="row">
                    <div className="col-xs-12">
                        <DataInput handleFile={this.handleFile} accept ={SheetJSFT} />
                    </div>
                </div>
            </DragDropFile>
        );
    };
};

/* list of supported file types */
const SheetJSFT = [
        "xaml","xml"
].map(function (x) { return "." + x; }).join(",");


export default ReadXaml;