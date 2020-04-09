export const mascaraMoeda = (value, milSep, decSep, e = '') => {
  let sep = 0;
  let key = '';
  let i = 0;
  let j = 0;
  let len = 0;
  let len2 = 0;
  const strCheck = '0123456789';
  let aux = '';
  let aux2 = '';
  const whichCode = (window.Event) ? e.which : e.keyCode;

  if((whichCode == 13) || (whichCode == 0) || (whichCode == 8)) return value;

  len = (value)? value.length: 0;
  for(i = 0; i < len; i++){
    if ((value.charAt(i) != '0') && (value.charAt(i) != decSep)) break;
  }
  aux = '';

  for(; i < len; i++){
    if (strCheck.indexOf(value.charAt(i))!=-1) aux += value.charAt(i);
  }
  aux += key;
  len = aux.length;

  if (len == 0) value = '0'+ decSep + '00';
  if (len == 1) value = '0'+ decSep + '0' + aux;
  if (len == 2) value = '0'+ decSep + aux;

  if (len > 2) {
    aux2 = '';
    for (j = 0, i = len - 3; i >= 0; i--) {
      if (j == 3) {
        aux2 += milSep;
        j = 0;
      }
      aux2 += aux.charAt(i);
      j++;
    }
    value = '';
    len2 = aux2.length;
    for (i = len2 - 1; i >= 0; i--){
      value += aux2.charAt(i);
    }
    value += decSep + aux.substr(len - 2, len);
    return value;
  }
  return value;
};