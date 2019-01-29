import React, { Component } from 'react';
import XLSX from 'xlsx';
import Select from 'react-select';
import DataInput from './DataInput';
import ReactSelect from './ReactSelect';
import DragDropFile from './DragDropFile';
import OutTable from './OutTable';
import OutJson from './OutJson';
import ReadXaml from './ReadXaml';
import OutLineText from './OutLineText';
import IsNotBlankArray from '../Utils/CommonData';

const options = [
    { value: 'GER', label: 'Dutch' },
    { value: 'USA', label: 'United State of America' },
    { value: 'SPN', label: 'Spanish' },
    { value: 'FRN', label: 'French' },
    { value: 'JPN', label: 'Japanese' },
    { value: 'KOR', label: 'Korean' },
    { value: 'POB', label: 'Portuguese' },
    { value: 'RUS', label: 'Russian' },
    { value: 'CHS', label: 'Chinese Simplified' },
    { value: 'CHT', label: 'Chinese Taiwan' }
];

/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */
/* Notes:
   - usage: `ReactDOM.render( <SheetJSApp />, document.getElementById('app') );`
   - xlsx.full.min.js is loaded in the head of the HTML page
   - this script should be referenced with type="text/babel"
   - babel.js in-browser transpiler should be loaded before this script
*/
class SheetJSApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
            cols: [],  /* Array of column objects e.g. { name: "C", K: 2 } */
            ws: null,
            selectedOption: "USA",
            optionIndexMap:{},
            sequenceArray:[],
            isDisplayXaml:true
        };
        this.handleFile = this.handleFile.bind(this);
        this.handleXamlFileChange = this.handleXamlFileChange.bind(this);
        this.exportFile = this.exportFile.bind(this);
        this.exportJson = this.exportJson.bind(this);
        this.exportXaml = this.exportXaml.bind(this);
        this.handleSelection = this.handleSelection.bind(this);

        this.outJsonRef = React.createRef();
        this.outLineTextRef = React.createRef();
    };
    handleFile(file/*:File*/) {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];

            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            /* Update state */
            this.setState({ data: data, cols: make_cols(ws['!ref']), ws: ws });
            // get current language
            this.updateOptionIndexMap();
        };
        if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
    };

    updateOptionIndexMap(){
        //init
       let newIndexMap = {};
       options.map((obj)=>{
            newIndexMap[obj.value] = -1;
            return obj;
        });
        this.setState({optionIndexMap : newIndexMap});
        var self = this;
        if (IsNotBlankArray(this.state.data)){
            let firstLineArray = this.state.data[0];
            if (IsNotBlankArray(firstLineArray)){
                firstLineArray.forEach((val,index) => {
                    if (val in self.state.optionIndexMap){
                        self.state.optionIndexMap[val] = index;
                    }
                });
            }
        }
    }

    handleXamlFileChange(arr,map) {
        this.setState({ sequenceArray:arr});
        //this.outLineTextRef.current.getRenderData();
    }


    handleSelection(selectedOption) {
        this.setState({ selectedOption });
    };

    exportFile() {
        /* convert state to workbook */
        const ws = XLSX.utils.aoa_to_sheet(this.state.data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, "sheetjs.xlsx")
    };

    exportXaml(){
        this.setState({isDisplayXaml: true});
        this.outLineTextRef.current.updateTextArea(this.state.data, this.state.sequenceArray, this.state.selectedOption , this.state.optionIndexMap);
       
    }

    exportJson() {
        /* convert state to workbook */
        this.setState({isDisplayXaml: false});
        this.outJsonRef.current.updateTextArea(this.state.data, this.state.sequenceArray, this.state.selectedOption , this.state.optionIndexMap);
        
    }
    render() {
        return (
            <div className="ExcelToJson">

                <ReadXaml handleXamlFileChange = {this.handleXamlFileChange}/>
                {/* <OutLineText ref= { this.outLineTextRef} data={this.state.sequenceArray }></OutLineText> */}
                <DragDropFile handleFile={this.handleFile}>
                    <div className="row"><div className="col-xs-12">
                        <DataInput handleFile={this.handleFile} accept={SheetJSFT} />
                        <ReactSelect options={options} handleSelection={this.handleSelection} />
                    </div></div>
                    <div className="row"><div className="col-xs-12">
                        <button disabled={!this.state.data.length} className="btn btn-success" onClick={this.exportXaml}>ExportXaml</button>
                        <button disabled={!this.state.data.length} className="btn btn-success" onClick={this.exportJson}>ExportJson</button>
                    </div></div>
                    <OutLineText ref= {this.outLineTextRef} data={this.state.data} isDisplay ={this.state.isDisplayXaml}/>
                    <OutJson data={this.state.data} ref={this.outJsonRef} isDisplay ={!this.state.isDisplayXaml}/>
                </DragDropFile>



            </div>
        );
    };
};

export default SheetJSApp;

/* list of supported file types */
const SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function (x) { return "." + x; }).join(",");

/* generate an array of column objects */
const make_cols = refstr => {
    let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
    return o;
};