
//Regex form Comma Separated Number Format
export function commaSeparateNumber(val){
  while (/(\d+)(\d{3})/.test(val.toString())){
    val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  }
  return val;
}

//Function to convert number to comma separated and to a provided number of decimal places
export const formatNumber = (number, decimalPlace) => {
  return commaSeparateNumber((number).toFixed(decimalPlace))
}
