function doGet(){
  
  var settings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings"); //Get settings for message in Spreadsheet
  var msg = settings.getRange("CELL_RANGE").getValue();
  var emailTemp = HtmlService.createTemplateFromFile("TEMPLATE_NAME");
  emailTemp.body = msg;
  var bodyMessage = emailTemp.evaluate().getContent();
  
  return HtmlService.createHtmlOutput(bodyMessage);

}
