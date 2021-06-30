// ダイジェストフォルダ設定
var capacity = 40;
var counter = 0;
var subfolder = 0;
var exapp = new ActiveXObject("Excel.Application");
var docapp = new ActiveXObject("Word.Application");

if(WScript.Arguments.length == 0){
   WScript.Echo("Excuse Me ? You forgot some parameter. Tell me where is your resource folder !");
   WScript.Quit();
}

var des = WScript.Arguments.Item(1);
var fsoOutput = new ActiveXObject("Scripting.FileSystemObject");
var list;
try{
    list = fsoOutput.OpenTextFile(des + '.\\List.htm', 8);
}catch(e){
    list = fsoOutput.CreateTextFile(des + '.\\List.htm');
}

subfolder = getMaxFolderNum(des);
latestSubFilesCount = getSubFolderFileCount(des, subfolder);
if(latestSubFilesCount == capacity){
    subfolder++;
}
counter = capacity * subfolder + latestSubFilesCount;
if(counter == 0){
    // サブフォルダ未作成扱い
    subfolder = -1;
}

WScript.Echo("Sub Count : " + subfolder + "  Counter : " + counter);

// Run
enumFiles(WScript.Arguments.Item(0), function(f){
  try {
    var anregx = /^[\w,\s-]+\.[A-Za-z]*$/gm;
    var frag = f.Name.split(".");
    var destFileName = f.Name;
    var ext = frag[frag.length - 1].toLowerCase();

    if(!f.Name.match(anregx)){
        if (frag.length < 2) {
            destFileName = "doc_" + counter;
        } else {
            destFileName = "doc_" + counter + "." + ext;
        }
    }
    // 除外ファイルリスト
    if(ext != "zip" 
       && ext != "log" 
       && ext != "xlt" 
       && ext != "ttf" 
       && ext != "svg" 
       && ext != "woff" 
       && ext != "woff2" 
       && ext != "htm" 
       && ext != "html" 
       && ext != "js" 
       && ext != "css" 
       && ext != "jpg" 
       && ext != "bmp" 
       && ext != "png"){

      // 過大なファイルを除外
      if(f.Size > 20971520) {
        return;
      }

      var protected = "";
      if(ext == "xls" || ext == "xlsx") {
        if(f.Size < 1024) {
          return;
        }
        try {
            exapp.Workbooks.Open(f.Path,0,false,5,"password");
            exapp.Workbooks.Item(0).Close(false);
            exapp.Quit();
        } catch (e) {
            var mt = e.message.match("CapsLock")
            if(mt){
                protected = "Protected By Password : ";
            }
            WScript.Echo(e.message+" :" + f.Name);
        }
      }
      if(ext == "doc" || ext == "docx") {
        if(f.Size < 1024) {
          return;
        }
        try {
            docapp.Documents.Open(f.Path,false,false,false,"password");
            docapp.Documents.Item(0).Close(false);
            docapp.Quit();
        } catch (e) {
            var mt = e.message.match(".doc")
            if(mt){
                protected = "Protected By Password : ";
            }
            protected = "Protected By Password : ";
            WScript.Echo(e.message+" :" + f.Name);
        }
      }

      if(counter++ % capacity == 0) {
        fsoOutput.CreateFolder(des + "\\" + ++subfolder);
      }
      f.Copy(des + "\\" + subfolder + "\\" + destFileName);
      list.WriteLine("<a href='" + f.Path + "' title='" + f.Path + "'>"+ protected + destFileName + "</a>  "+ f.Path + "</br>");
    }
  } catch (e) {
      WScript.Echo(e.message + " " + des + "\\" + subfolder + "\\" + destFileName);
  }
});
list.Close();

// ファイル一覧を巡回
function enumFiles(target, callback) {
  var fso = new ActiveXObject("Scripting.FileSystemObject");
  if (fso.FileExists(target)) {
    callback(fso.getFile(target)); return;
  }
  if (!fso.FolderExists(target)) return;
  // 指定パスのファイル一覧を得る
  var dir = fso.GetFolder(target);
  _enum(dir);
  function _enum(dir) {
    // ファイルを一つずつ処理する
    var e = new Enumerator(dir.Files);
    for ( ; !e.atEnd(); e.moveNext()) {
      var file = e.item();
      callback(file);
    }
    // 再帰的にディレクトリを処理する
    e = new Enumerator(dir.SubFolders);
    for ( ; !e.atEnd(); e.moveNext()) {
      var sdir = e.item();
      _enum(sdir);
    }
  }
}

function getMaxFolderNum(path){
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var ret = 0;
    // Run
    try {
        var dir = fso.GetFolder(path);
        var e = new Enumerator(dir.SubFolders)
        for ( ; !e.atEnd(); e.moveNext()) {
          var file = e.item();
          var num = parseInt(file.Name);
          if (num > ret){
              ret = num;
          }
        }
    } catch (e) {
        return 0;
    }
    return ret;
}

function getSubFolderFileCount(path, subfolder){
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    try {
        WScript.Echo("Subject : "+path+"\\"+subfolder);
        var dir = fso.GetFolder(path+"\\"+subfolder);
        return dir.Files.Count;
    } catch (e) {
        return 0;
    }
}