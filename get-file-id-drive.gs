function getListData() {
  var settings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings"); //Get Settings for folder name in Drive
  var foldername = settings.getRange("CELL").getValue();
  
  var folders = DriveApp.getFoldersByName(foldername);
  var folder = folders.next();
  var contents = folder.getFiles();
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SHEET_NAME");
  ss.appendRow(['name','id']);
  
  var name;
  var id;
  while(contents.hasNext()){
    file = contents.next();
    name = file.getName();
    id = file.getId();
    ss.appendRow([name, id]);
  }
  
}
