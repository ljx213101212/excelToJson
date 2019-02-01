import React, { Component } from 'react';
import IsNotBlankArray from '../Utils/CommonData';

class OutLineText extends React.Component {
    constructor(props) { 
        super(props); 
        this.resultArray = [];
        this.state = {
            resultArray : this.resultArray,
            showResult:false
        }

    };

    updateXamlKeyArea(sequenceArray){
        var self = this;
        this.resultArray = [];
        sequenceArray.forEach( (val,index) => {
            var line = <div key={index}>{val}</div>
            self.resultArray.push(line);
        });
        this.setState({resultArray: self.resultArray});
    }

    
    copyXamlKeysToClipboard(){

        let range = document.createRange();
        range.setStart(this.refs.outXamlKeyRef, 0);
        range.setEnd(this.refs.outXamlKeyRef, 0);
        range.selectNode(this.refs.outXamlKeyRef);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
    }


    showResult(){
        this.setState({showResult: true});
    }

    hideResult(){
        this.setState({showResult:false});
    }

    updateTextArea(data, selectedOption, optionIndexMap, keyIndex){
        var self = this;
        this.resultArray = [];
        if (!IsNotBlankArray(data)  || !selectedOption
        || !optionIndexMap) { return ;}
        console.log(data);        
        data.forEach((val, index) => {
            if (index === 0) { return;}
            var currIndex = optionIndexMap[selectedOption.value];
            const key = data[index][keyIndex];
            const value = data[index][currIndex];
            //Skip whitespace rows.
            if (typeof key === "undefined") {return;}
            var line = <div key={index}>{"<sys:String x:Key=\"" + `${key}` + "\">"+ `${value}`+ "</sys:String>"}</div>
            self.resultArray.push(line);
        });
        this.setState({resultArray: self.resultArray});
    };

   
    
    render() {
        if (!this.props.isDisplay){return null;}
        return (
            <div className="result-container text-left" ref="outXamlKeyRef">
                {this.state.resultArray}
            </div>
        )
    };
}
export default OutLineText;