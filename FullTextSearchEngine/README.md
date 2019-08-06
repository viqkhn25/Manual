#Prerequisites
This Manual is used for Windows user to build full-text search engine against plenty of documents.
I assume I am using a windows with VirtualBox is installed.

##Preparations
> 1. Download [Open Semantic Search Appliance (VM)](https://www.opensemanticsearch.org/download/) and import it into VirtualBox

> 2. Make C:\Workspace\Documents Folder
![Prepare Folder.bmp](./img/0.Prepare Folder.bmp)

> 3. Edit Batch file , make BusiDoc be the dest folder for indexing.
![Edit Batch File.bmp](./img/0.Edit Batch File.bmp)

## Here we go
> 1. Run InitResource.bat by double clicking
![1.Execute script.bmp](./img/1.Execute script.bmp)

> 2. Enable adapter2 as a hostonly adapter
![2.Hostonly Adapter.bmp](./img/2.Hostonly Adapter.bmp)

> 3. Remove folder mounting prefix by Run 
VBoxManage guestproperty set "Open Semantic Desktop Search" /VirtualBox/GuestAdd/SharedFolders/MountPrefix "/"
![3.Remove Mount Prefix.bmp](./img/3.Remove Mount Prefix.bmp)

> 4. Mount index folder with full access .
![4.Mount Index Folder.bmp](./img/4.Mount Index Folder.bmp)

> 5. Applying prepared setting by cp these files from index folder to their belonging place individually.
Then restart VM.
![5.apply setting by overwriting files.bmp](./img/5.apply setting by overwriting files.bmp)

> 6. Confirm portal page can be shown at guest browser with addr: http://192.168.34.10/search/
![6.Confirm access from guest browser.bmp](./img/6.Confirm access from guest browser.bmp)
 
> 7.  Mount BusiDoc with readonly access to your VM
![7.Mount Resource Folder.bmp](./img/7.Mount Resource Folder.bmp)

> 8.  Enable local file links in chrome browser by install this extension.
![8.Enable loacal file link.bmp](./img/8.Enable loacal file link.bmp)

## Referred to
Open Semantics Search [Command line tools](https://www.opensemanticsearch.org/doc/admin/cmd) on topics of indexing. (Default password of user is live.)
[ネットワーク設定の概要](http://www.fml.org/home/fukachan/ja/linux.share.network.debian.html)  (Debian/Linux 系)
Debian 9 (Stretch) - [ファイアウォール設定！](https://www.mk-mode.com/blog/2017/08/16/debian-9-firewall-setting/#)
[日本語環境にする](https://www.server-world.info/query?os=Debian_9&p=japanese)

