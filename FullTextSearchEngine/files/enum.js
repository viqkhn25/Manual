// ダイジェストフォルダ設定
var counter = 0;
var subfolder = 0;

if(WScript.Arguments.length == 0){
   WScript.Echo("Excuse Me ? You forgot some parameter. Tell me where is your resource folder !");
   WScript.Quit();
}

var des = WScript.Arguments.Item(1);
var fsoOutput = new ActiveXObject("Scripting.FileSystemObject");
list = fsoOutput.CreateTextFile('.\\des_List.htm');

// Run
enumFiles(WScript.Arguments.Item(0), function(f){
  try {
    var anregx = /^[\w,\s-]+\.[A-Za-z]*$/gm;
    var frag = f.Name.split(".");
    var destFileName = f.Name;
    var ext = frag[frag.length - 1];
    if(!f.Name.match(anregx)){
        if (frag.length < 2) {
            destFileName = "doc_" + counter++;
        } else {
            destFileName = "doc_" + counter++ + "." + ext;
        }
    }
    // Exclude Zip File
    if(ext != "zip"){
      if(counter % 25 == 0) {
        fsoOutput.CreateFolder(des + "\\" + subfolder++);
      }
      f.Copy(des + "\\" + (subfolder-1) + "\\" + destFileName);
      list.WriteLine("<a href='" + f.Path + "' title='" + f.Path + "'>"+ destFileName + "</a> ⇒ "+ f.Path + "</br>");
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
