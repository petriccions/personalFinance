function cambioMese() 
{
var ss = SpreadsheetApp.openById("xxxxxx").getSheetByName("Net Worth")

function numToSSColumn(num){
  let s = '', t;

  while (num > 0) {
    t = (num - 1) % 26;
    s = String.fromCharCode(65 + t) + s;
    num = (num - t)/26 | 0;
  }
  return s || undefined;
}


var formattedDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MMMM");

/* funzione per trovare il numero del mese mese partendo dalla data */
function getMonthName(){
  var data = ss.getDataRange().getValues();
  for(var i = 0; i<data.length;i++){
    if(data[2][2+i] == formattedDate){ //[2] because row 3
      //console.log("getMonthName =",i+3);
      numeroMese = i;
      return numeroMese;
    }
  }
}

/* funzione per trasformare il numero del mese in stringa*/
function numToStringMonth(month){
  const d = new Date();
  d.setMonth(month-1);
  const monthName = d.toLocaleString("default", {month: "long"});
  //console.log("numToStringMonth =",monthName)
  return monthName;
}


/*02/04 
  da far girare una volta al mese il primo del mese
  prende i valori e le formule del mese scorso, copia i valori nella colonna del mese scorso, e le formule nella colonna del mese corrente
*/
getMonthName();
numToStringMonth(numeroMese);
cMonthColumn = numToSSColumn(numeroMese+3);
nMonthColumn = numToSSColumn(numeroMese+4);

var rangez = ss.getRange(cMonthColumn + 5 + ":" + cMonthColumn + 42);
rangez.copyTo(ss.getRange(nMonthColumn + 5 + ":" + nMonthColumn + 42));
ss.getRange(cMonthColumn + 5 + ":" + cMonthColumn + 42).setValues(ss.getRange(cMonthColumn + 5 + ":" + cMonthColumn + 42).getValues());

}
