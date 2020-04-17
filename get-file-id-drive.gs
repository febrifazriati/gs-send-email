function getListData() {
  var settings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
  var foldername = settings.getRange("E1").getValue();
  
  var folders = DriveApp.getFoldersByName(foldername);
  var folder = folders.next();
  var contents = folder.getFiles();
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("list");
  ss.appendRow(['name','id']);
  
  var file;
  var name;
  var link;
  var row; 
  while(contents.hasNext()){
    file = contents.next();
    name = file.getName();
    link = file.getId();
    ss.appendRow([name, link]);
  }
  
}
