import React, { Component } from 'react';
import IsNotBlankArray from '../Utils/CommonData';
class OutJson extends React.Component {
    constructor(props) { 
        super(props); 
        this.state = {
            renderArray: []
        }

    };

    updateTextArea(data, selectedOption, optionIndexMap, keyIndex) {
        if (!IsNotBlankArray(data) || !selectedOption
        || !optionIndexMap) { return ;}
        var newArray = [];
        console.log(data);  
        data.forEach((val, index) => {
            if (index === 0) { return;}
            var newObj = {};
            if (!IsNotBlankArray(val)){return;}
            var currIndex = optionIndexMap[selectedOption.value];
            var currKey = val[keyIndex];
            newObj[currKey] = val[currIndex];
            newArray.push(newObj);
        });
        this.setState({renderArray:newArray});
       console.log(this.state.renderArray);
    }

    copyJsonToClipboard(){

        let range = document.createRange();
        range.setStart(this.refs.outJsonRef, 0);
        range.setEnd(this.refs.outJsonRef, 0);
        range.selectNode(this.refs.outJsonRef);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
    }

    render() {
        if (!this.props.isDisplay){return null;}
        return (
            <div className="result-container" ref="outJsonRef">
                <textarea id="result" className="result-wrapper-2" cols={100} rows={100}
                    value={JSON.stringify(this.state.renderArray, null, "\t")} readOnly>
                </textarea>
            </div>
        )
    };
}
export default OutJson;