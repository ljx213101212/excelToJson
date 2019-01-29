function IsNotBlankArray(arr){
    if (arr instanceof Array &&
        arr.length > 0){
            return true;
        }
        else{
            return false;
        }
}
export default IsNotBlankArray;