import React, { Component } from 'react';
import IsNotBlankArray from '../Utils/CommonData';
class OutJson extends React.Component {
    constructor(props) { 
        super(props); 
        this.state = {
            renderArray: []
        }
    };

    updateTextArea(data, sequenceArray, selectedOption, optionIndexMap) {
        if (!IsNotBlankArray(data) || !IsNotBlankArray(sequenceArray) || !selectedOption
        || !optionIndexMap) { return ;}
        var newArray = [];
        sequenceArray.forEach((val, index) => {
            if (index === 0) { return;}
            var newObj = {};
            if (!IsNotBlankArray(data[index])){return;}
            var currIndex = optionIndexMap[selectedOption.value];
            newObj[val] = data[index][currIndex];
            newArray.push(newObj);
        });
        this.setState({renderArray:newArray});
       console.log(this.state.renderArray);
    }
    render() {
        if (!this.props.isDisplay){return null;}
        return (
            <div className="result-container">
                <textarea id="result" className="result-wrapper-2" cols={100} rows={100}
                    value={JSON.stringify(this.state.renderArray, null, "\t")}>
                </textarea>
            </div>
        )
    };
}
export default OutJson;