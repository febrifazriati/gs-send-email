function bulkEmail() {
  var emailTemp = HtmlService.createTemplateFromFile('template.html');
  var settings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Settings');
  var sheetName = settings.getRange("B1").getValue();
  
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var data = ws.getRange(2, 1, ws.getLastRow()-1,ws.getLastColumn()).getValues();
  var time = new Date();
      time = Utilities.formatDate(time, "GMT+7", "MM/dd/yyyy hh:mm:ss");
  
  var email_sent = "EMAIL_SENT";
  var subject = settings.getRange("B2").getValue();
  var msg = settings.getRange("B3").getValue();
  var emailTrial = settings.getRange("E4").getValue();
  
  for (var i=0; i<data.length; ++i){
    
    var row = data[i];
    var email = row[3];
    var status = row[4];
    var ready = row[6];
    
    
    if(status != email_sent){
    if(ready === "Yes"){
    var file = DriveApp.getFileById(row[2]);
    var blob = Utilities.newBlob('Insert any HTML content here', 'text/html', 'my_document.html');
    
    //-----------------REPLACING TEXT--------------------------------------//
      //---------FORMAT .replace("text want to change",row[i])---------//
      
      var rep = msg
      .replace("{namabpr}",row[0])
      .replace("{namabpr}",row[0])
      .replace("{star}",row[1]);
      
       //-----------------REPLACING TEXT END--------------------------------------//
    
      var messageBody = emailTemp.body = rep;
      var bodyMessage = emailTemp.evaluate().getContent();
      
      MailApp.sendEmail(
      email,
      subject,
      "Please open with Web Browser or Email App",
        {
          name : "Infobank",
          htmlBody: bodyMessage,
          cc: "thefinance@infobank.co.id",
          attachments : [file.getAs(MimeType.PDF)]
        }
      );
      
      ws.getRange(2+i, 5).setValue(email_sent);
      ws.getRange(2+i, 6).setValue(time);
      SpreadsheetApp.flush();
  }
      
      if(ready === "Trial"){
    var file = DriveApp.getFileById(row[2]);
    var blob = Utilities.newBlob('Insert any HTML content here', 'text/html', 'my_document.html');
    
    //-----------------REPLACING TEXT--------------------------------------//
      //---------FORMAT .replace("text want to change",row[i])---------//
      
      var rep = msg
      .replace("{namabpr}",row[0])
      .replace("{namabpr}",row[0])
      .replace("{star}",row[1]);
      
       //-----------------REPLACING TEXT END--------------------------------------//
    
      var messageBody = emailTemp.body = rep;
      var bodyMessage = emailTemp.evaluate().getContent();
      
      MailApp.sendEmail(
      emailTrial,
      subject,
      "Please open with Web Browser or Email App",
        {
          name : "Infobank",
          htmlBody: bodyMessage,
          attachments : [file.getAs(MimeType.PDF)]
        }
      );
      
      ws.getRange(2+i, 5).setValue(email_sent);
      ws.getRange(2+i, 6).setValue(time);
      SpreadsheetApp.flush();
  }
 }
}
}
