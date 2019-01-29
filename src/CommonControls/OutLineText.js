import React, { Component } from 'react';
import IsNotBlankArray from '../Utils/CommonData';

class OutLineText extends React.Component {
    constructor(props) { 
        super(props); 
        this.resultArray = [];
        this.state = {
            resultArray : this.resultArray
        }
    };

    updateTextArea(data, selectedOption, optionIndexMap, keyIndex){
        var self = this;
        this.resultArray = [];
        if (!IsNotBlankArray(data)  || !selectedOption
        || !optionIndexMap) { return ;}        
        data.forEach((val, index) => {
            if (index === 0) { return;}
            var currIndex = optionIndexMap[selectedOption.value];
            const key = data[index][keyIndex];
            const value = data[index][currIndex];
            var line = <div>{"<sys:String x:Key=\"" + `${key}` + "\">"+ `${value}`+ "</sys:String>"}</div>
            self.resultArray.push(line);
        });
        this.setState({resultArray: self.resultArray});
    };
    
    render() {
        if (!this.props.isDisplay){return null;}
        return (
            <div className="result-container text-left">
                {this.state.resultArray}
            </div>
        )
    };
}
export default OutLineText;