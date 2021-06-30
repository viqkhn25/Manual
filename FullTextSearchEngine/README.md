
# Prerequisites

This Manual is used for Windows user to build full-text search engine against plenty of documents.
I assume I am using windows with VirtualBox pre-installed.

## Preparations

> 1. Download [Open Semantic Search Appliance (VM)](https://www.opensemanticsearch.org/download/) and import it into VirtualBox

> 2. Make C:\Workspace\Documents Folder

![Prepare Folder.png](./img/0.Prepare%20Folder.png)

> 3. Clone this project into your local file system.


> 4. Edit Batch file , make BusiDoc be the dest folder for indexing.

![Edit Batch File.png](./img/0.Edit%20Batch%20File.png)

## Here we go
 1. Run InitResource.bat by double clicking
 
![1.Execute script.png](./img/1.Execute%20script.png)

 2. Enable adapter2 as a hostonly adapter
 
![2.Hostonly Adapter.png](./img/2.Hostonly%20Adapter.png)

 3. Remove folder mounting prefix by Run 
VBoxManage guestproperty set "Open Semantic Desktop Search" /VirtualBox/GuestAdd/SharedFolders/MountPrefix "/"

![3.Remove Mount Prefix.png](./img/3.Remove%20Mount%20Prefix.png)

 4. Mount index folder with full access .
 
![4.Mount Index Folder.png](./img/4.Mount%20Index%20Folder.png)

 5. Applying prepared setting by cp these files from index folder to their belonging place individually.
Then restart VM.

![5.apply setting by overwriting files.png](./img/5.apply%20setting%20by%20overwriting%20files.png)

 6. Confirm portal page can be shown at guest browser with addr: http://192.168.34.10/search/
 
![6.Confirm access from guest browser.png](./img/6.Confirm%20access%20from%20guest%20browser.png)
 
 7.  Mount BusiDoc with readonly access to your VM
 
![7.Mount Resource Folder.png](./img/7.Mount%20Resource%20Folder.png)

 8.  Enable local file links in chrome browser by install this extension.
 
![8.Enable loacal file link.png](./img/8.Enable%20loacal%20file%20link.png)


 9.  Enable offline office file in chrome browser by install [this](https://chrome.google.com/webstore/detail/office-editing-for-docs-s/gbkeegbaiigmenfmjfclcdgdpimamgkj) extension.
 
 10.  Open Excel and Word in [safe mode](https://support.office.com/en-us/article/open-office-apps-in-safe-mode-on-a-windows-pc-dedf944a-5f4b-4afb-a453-528af4f7ac72) .


## Option

[RAISING LIMITS ](https://www.akitogo.com/blog/raising-limits-on-ubuntu-1604-and-1804-for-solr-7) ON UBUNTU 16.04 AND 18.04 FOR SOLR 7

[Enable SSH Server on Debian](https://linuxhint.com/enable-ssh-server-debian/)

[日本語環境にする](https://www.server-world.info/query?os=Debian_9&p=japanese)


## Referred to
[Restart](https://www.opensemanticsearch.org/solr#localhost) Solr Server or 

Open Semantics Search [Command line tools](https://www.opensemanticsearch.org/doc/admin/cmd) on topics of indexing. (Default password of user is live.)

[ネットワーク設定の概要](http://www.fml.org/home/fukachan/ja/linux.share.network.debian.html)  (Debian/Linux 系)

Debian 9 (Stretch) - [ファイアウォール設定！](https://www.mk-mode.com/blog/2017/08/16/debian-9-firewall-setting/#)

