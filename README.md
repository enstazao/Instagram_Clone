# Instagram CLone Using React, NodeJS & MySQL

# Step To Run Instagram On Ubuntu Machine

1. # First Setup The DataBase On Your Ubuntu Machine

I am assuming that mysql is already installed in your system. If that is installed on your system the next thing you have to do is that open the terminal and go to mysql Prompt.

---

![Mysql Opening](/guide_images/mysql.png)

---

The Next Thing you have to do is to set up the DataBase. Just Download the file __instagram_db.sql__ from the repository and then import that file.


Copy the Parent Folder Path By just right click on the file and then click on __properties__ .

---
![FilePath](/guide_images/mysql-setup.png)

---

After all this now import that file in mysql By using the following command.

```bash
    source /home/enstazao/Documents/DataBase_Project/instagram_db.sql
```

The output will be shown like this.


---
![Output](/guide_images/output.png)
---

After Importing File For Confirmation Try This Command.


 ```bash
    SHOW TABLES;
```


The following table will be shown to you after writing this command.

---
![Output2](/guide_images/output-confirm.png)

---


Now First Step is covered you have successfully setted up the database. Now you have to setup react and nodejs in your system which is highly easy step. 

Now First Install nodejs in your __UBUNTU MACHINE__.

Open Up the terminal and then type the following command in your shell.

```bash
sudo apt install nodejs
```

After Running this command Following output will be shown to you.

---
![NodeJS_Installation](/guide_images//nodejs_installation.png)
---

After Installing this command in order to confirm is the nodejs is successfully installed in your system or not Run This command in your Terminal.

```bash
    node --version
```

The Output Will be Like This:

---
![NodeJs_Installation_Confirmation](/guide_images//node-install-confirm.png)
---

After Installing __NodeJS__ The Next thing that you have to install is the __NPM(Node Package Manager)__. With the help of npm you can install different packages.

TO Install __NPM__ open up the terminal and issue this command.

```bash
    sudo apt install npm
```

After Installation is done write this command to see the __NPM__ version.

```bash
    npm --version
```

The Output of the command will be like this.

---
![NPM_Installtion_Confirmation](/guide_images/npm-confirm.png)

---

Now NodeJs Installtion is done successfully in your system. Now you have to install npx. By the way it comes with npm but if that does not come with npm then issue this command to install npx. The npx is used to create the react app. npx should come with npm 5.2+. 


```bash
sudo npm i -g npx
```

# Updating To Latest Version of NodeJS

I tried to run the app on another machine I have faced this issue so you have to install the node specific version that I used to make this app that is node version 18.

 So let's update to node 18 version. To Update it is simple easy simple execute following commands.

```bash
sudo apt update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm --version
nvm ls-remote
nvm install v18.0.0
```

So Now You are good to Go All the Installaion are done successfully. Check the node version.

```
 node --version
```

It must be __v18.0.0__. 

---
![Node_Version_18](/guide_images/node18.png)
---


# Packages Installation
Once that done Now you are good to go. All the Installation is Done. Now let's run the app.


Now Once all the installation is done, now you have to run these two commands. First move to the directory which you have cloned. There will be two folder one is __client__ and the other one is __server__ so client is our frontend and server is our backend. 

Move to the app directory that you have cloned.

```bash
    cd client
    npm install

    cd ..

    cd server
    npm install
```

This will take up some time depending on your internet speed. What you are doing is that you are installing all the packages that I have used in my react and nodejs app. Now all is done you just have to run the app.

One Last Thing you have to do is that you have to set the database password. Like in mycase I am using database as a root user and the password for it is " __newpassword__ "  So In database connection you have to give same password that your root user have if there is no password for root user left that field empty.

Open Up the bash and open the file in which I am making connection with the database. And open the "__.env__" file in any editor. I am using the vim editor to show show how to setup connection with database.
```bash
    cd server/
    vi .env
```

---
![Db_Credentials](/guide_images/db_credentials.png)

---

Now here set the __DB_PASSWORD__ to the password you have. The Data base name is __INSTAGRAM__ and the user is __root__ so if you have created your own user then you can change the username Also.


# Running APP

Now It's time to run the app. Open Two Terminals in the directory you clone. In First Terminal Issue these command.

```bash
    cd client
    npm start
```

Here Our FrontEnd is started running on port __3000__. 

__DONOT CLOSE THIS TERMINAL__

Now You have to run the backend. So as you opened two terminals go to second terminal and issue these commands to start the backend NODEJS.

```bash
    cd server
    npm start
```

---
![Running_App](/guide_images/running_app.png)
---

Now go the __localhost:3001__ Your app is running Now. Hope You got not any problem running the app. If any issue arises Please let me know. 

Thanks!


Some of the screen shots.

---
![Login](/guide_images/img_1.png)
---

---
![Signup](/guide_images/img_2.png)
---


---
![Home](/guide_images/img_3.png)
---

---
![CreatePost](/guide_images/img_4.png)
---


---
![Follow](/guide_images//img_5.png)
---


---
![Profile](/guide_images//img_6.png)
---


---
![Message](/guide_images//img_8.png)
---

---
![Chat](/guide_images/img_9.png)
---

