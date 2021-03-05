#CSV Multi Photo File Extractor

Welcome to a little NodeJS (aka, JavaScript) project. This project will show you how to code (hopefully) while providing  you a useful tool. Many in the industry need little utilities like this and have some basic knowledge of scripts. So by putting it in a more common language with some context around how it works, it should make it easier for you to manipulate and use on your own. 

##Prerequisites
Before you can run this, you need to make sure you have NodeJS installed. Node is a JavaScript Framework that allows you to write scripts that can be run natively from a command line, or in some cases, can even be used to compile down to native code. (Meaning, you can write iPhone Apps, and Desktop apps in JavaScript thanks to Node. But that's not what this project is about). 

###Installing Node
####Mac
If you are using a Mac ... good for you. That's my weapon of choice when programming. You're already on the right path. You're likely to be more successful than anyone trying to do programming from a smelly windows machine or a perfectly fine Linux Machine such as Ubuntu. Since Mac's run on Linux, it's really Linux we are after. But I digress....

**HomeBrew**
Use HomeBrew to install NodeJs. You can Install Homebrew at https://brew.sh/

Once you have HomeBrew setup...
```
brew install node@14
```

You can install whichever node version you want. 

####Windows
If you are using Windows, you can install NodeJS using their Windows Installer. https://nodejs.org/en/download/ That's all the Windows Support I offer. However, there is a robust community of Node developers on Windows that you can find on search engines. 

###Installing Git
You're also going to need Git so you can clone down this Repo. Again, Homebrew makes it easy. 
```
brew install git
```

Windows Users can use the installer on the GIT website https://git-scm.com/downloads

### Clone the Little App
Now we are ready to clone the app. If you're seeing this from GitHub, you can get the commands needed at the top of the Repo Page. 
```
git clone [repo] [directoryNameYouWantItCalled]
```

## Running the Script
Once you have the script cloned, you can run it from your terminal. Just open a terminal into the directory of the code and type "node index.js". 

If the script is working right, you should get a message saying "No input file was selected". 

## Using The Script
To use the script, provide it the location (relative to the script) of the CSV file you want parsed. 
```
node index.js ./inputfile.csv
```

###Input File
The input file is expecting the following headers
```
'Access Code', 'Last Name', 'First Name',  'Team', 'Photo Filenames', 'Featured Photos'
```

The script will specifically extract 'Photo Filenames'