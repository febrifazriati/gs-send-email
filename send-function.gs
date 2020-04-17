//This function work without Spreadsheet ID. Using asociate with direct spreadsheet.
function bulkEmail() {
  var emailTemp = HtmlService.createTemplateFromFile('template.html'); //Template Email based on html.
  var settings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Settings'); //Get Settings UI from spreadsheet.
  var sheetName = settings.getRange("B1").getValue();
  
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var data = ws.getRange(2, 1, ws.getLastRow()-1,ws.getLastColumn()).getValues(); // 2 is Start row from top, 1 is start column.
  var time = new Date();
      time = Utilities.formatDate(time, "GMT+7", "MM/dd/yyyy hh:mm:ss");
  
  var email_sent = "EMAIL_SENT";
  var subject = settings.getRange("SUBJECT_CELL").getValue();
  var msg = settings.getRange("MSG_CELL").getValue();
  var emailTrial = settings.getRange("EMAILTRIAL_CELL").getValue();
  
  for (var i=0; i<data.length; ++i){
    
    var row = data[i];
    var email = row[ROW_REPLACE];
    var status = row[ROW_REPLACE];
    var ready = row[ROW_REPLACE]; //Status if send is ready or not.
    
    
    if(status != email_sent){
    if(ready === "Yes"){
    var file = DriveApp.getFileById(row[ROW_REPLACE]); //Get File ID if using attachment when send email.
    var blob = Utilities.newBlob('Insert any HTML content here', 'text/html', 'my_document.html');
    
    //-----------------REPLACING TEXT--------------------------------------//
      //---------FORMAT .replace("text want to change",row[i])---------//
      
      var rep = msg
      .replace("{text_need_replace}",row[ROW_REPLACE])
      .replace("{text_need_replace}",row[ROW_REPLACE])
      .replace("{text_need_replace}",row[ROW_REPLACE]);
      
       //-----------------REPLACING TEXT END--------------------------------------//
    
      var messageBody = emailTemp.body = rep;
      var bodyMessage = emailTemp.evaluate().getContent();
      
      MailApp.sendEmail(
      email,
      subject,
      "Please open with Web Browser or Email App",
        {
          name : "YOUR_NAME_FOR_EMAIL",
          htmlBody: bodyMessage,
          cc: "YOUR_CC_EMAIL",
          attachments : [file.getAs(MimeType.PDF)]
        }
      );
      
      ws.getRange(2+i, COLUMN_REPLACE).setValue(email_sent);
      ws.getRange(2+i, COLUMN_REPLACE).setValue(time);
      SpreadsheetApp.flush();
  }
      
      if(ready === "Trial"){
    var file = DriveApp.getFileById(row[ROW_REPLACE]);
    var blob = Utilities.newBlob('Insert any HTML content here', 'text/html', 'my_document.html');
    
    //-----------------REPLACING TEXT--------------------------------------//
      //---------FORMAT .replace("text want to change",row[i])---------//
      
      var rep = msg
      .replace("{text_need_replace}",row[ROW_REPLACE])
      .replace("{text_need_replace}",row[ROW_REPLACE])
      .replace("{text_need_replace}",row[ROW_REPLACE]);
      
       //-----------------REPLACING TEXT END--------------------------------------//
    
      var messageBody = emailTemp.body = rep;
      var bodyMessage = emailTemp.evaluate().getContent();
      
      MailApp.sendEmail(
      emailTrial,
      subject,
      "Please open with Web Browser or Email App",
        {
          name : "YOUR_NAME_FOR_EMAIL",
          htmlBody: bodyMessage,
          attachments : [file.getAs(MimeType.PDF)]
        }
      );
      
      ws.getRange(2+i, COLUMN_REPLACE).setValue(email_sent);
      ws.getRange(2+i, COLUMN_REPLACE).setValue(time);
      SpreadsheetApp.flush();
  }
 }
}
}
