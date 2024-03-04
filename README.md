# cypress-framework-dojo-gitec
Cypress is a next generation front end testing tool built for the modern web. For the dojo we going to do you need install first then we start ! 
Install Cypress for Mac, Linux, or Windows, then get started.

---


## Installations:

**Visual Studio Code**

You will choose the option corresponding to your computer
https://code.visualstudio.com/
![image](https://github.com/GITEC-training-Cypress/GITEC/assets/90401803/328f0cb1-aac8-49b9-ac03-46d3c5962694)

**Node.js**

You will choose the option corresponding to your computer 
https://nodejs.org/en/download
![image](https://github.com/GITEC-training-Cypress/GITEC/assets/90401803/f473cc8f-66d5-47c3-8da8-94cf9417485c)


**Cypres.io**

Installing Cypress.io with the following commands in the Visual Studio Code command prompt. 
You can open the comand prompt with => Crtl+Shift+'
```{shell}
npm install cypress --save-dev
```
or
```{shell}
yarn add cypress --dev
```
or
```{shell}
pnpm add cypress --save-dev
```
---

This will install Cypress locally as a dev dependency for your project.

**OBS:Make sure you have Node.js installed and that you have already run npm init or have a node_modules folder or package.json file in the root of your project to ensure cypress is installed in the correct directory**.



**BEST PRACTICE**

The recommended approach is to install Cypress with npm because:
Cypress is versioned like any other dependency.
It simplifies running Cypress in Continuous Integration.



**NOT USING NODE OR PACKAGE MANAGER** 



If you're not using Node or a package manager (npm, pnpm or Yarn) in your project or you want to try Cypress out quickly, you can always download Cypress directly from our link(https://download.cypress.io/desktop).

The direct download will always grab the latest available version. Your platform will be detected automatically.
Then you can manually unzip and double click. Cypress will run without needing to install any dependencies.



**LINUX PREREQUISITES**



If you're using Linux, you'll want to have the required dependencies installed on your system.

**(Ubuntu/Debian)**

**apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb**


**(Arch)**

**pacman -S gtk2 gtk3 alsa-lib xorg-server-xvfb libxss nss libnotify**


**(CentOS)**

**yum install -y xorg-x11-server-Xvfb gtk2-devel gtk3-devel libnotify-devel GConf2 nss libXScrnSaver alsa-lib**



**(Amazon Linux 2023)**

**dnf install -y xorg-x11-server-Xvfb gtk3-devel nss alsa-lib**



**OPENING CYPRESS**


cypress open
You can open Cypress from your project root one of the following ways:

**Using npx**

**npx cypress open**

**Using yarn**

**yarn run cypress open**

After a moment, the Cypress Launchpad will open.
