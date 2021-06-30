MD C:\Workspace\Documents\index
Copy interfaces C:\Workspace\Documents\index
Copy ports.conf C:\Workspace\Documents\index
Copy connector-files C:\Workspace\Documents\index


RD /s /q C:\Workspace\Documents\Dev
MD C:\Workspace\Documents\Dev

CScript enum.js G:\共有ドライブ\1 C:\Workspace\Documents\Dev
CScript enum.js G:\共有ドライブ\2 C:\Workspace\Documents\Dev
CScript enum.js G:\共有ドライブ\3 C:\Workspace\Documents\Dev


RD /s /q C:\Workspace\Documents\Reference
MD C:\Workspace\Documents\Reference
CScript enum.js G:\共有ドライブ\参考資料 C:\Workspace\Documents\Reference

