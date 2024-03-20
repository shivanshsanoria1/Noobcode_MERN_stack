# AWS Deployment

## 1. Create and Lanch an EC2 instance
* **Name and tags :** Give a name to the instance (Eg- NoobCode)
* **Application and OS Images (Amazon Machine Image) :** Select 'Ubuntu Server' as the AMI
* **Instance type :** Choose an instance (Eg- t2.micro)
* **Key pair (login) :** Generate a key-pair to connect to your instance. Ensure that you have access to the selected key pair before you launch the instance. 
  * Give a name to the key-pair (Eg- NoobCode-key). 
  * Select 'RSA' as the 'Key pair type'.
  * Select '.pem' as the 'Private key file format'
* **Network settings :** Under 'Firewall (security groups)', select 'Create security group' and check the following-
  * Allow SSH traffic from Anywhere 0.0.0.0/0
  * Allow HTTPS traffic from the internet
  * Allow HTTP traffic from the internet
* **Configure storage :** Leave the default settings
* **Advanced details :** Leave the default settings
* Click on **Lanch Instance** button

---

## 2. Connect to the EC2 instance using SSH
* Open cmd and type:
```bash
ssh -i "<path of the key-pair file>" ubuntu@<Public IPv4 address of the EC2 instance>
```
Eg- ssh -i "C:\Users\username\Documents\AWS\noobcode-key.pem" ubuntu@1.2.3.4

---

## 3. Setup the EC2 instance
### 3.1. Check git version
```bash
git --version
```
Output: 
git version 2.34.1

---

### 3.2. Install node and npm using nvm
* Install nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/installsh | bash
```
```bash
source ~/.bashrc
```

* Check nvm version

```bash
nvm --version
```

Output: 0.39.3

* Install node LTS (Long Term Support) version

```bash
nvm install --lts
```
* Check node version

```bash
node --version
```

output: v20.11.1

* Check npm version

```bash
npm --version
```

Output: 10.2.4

---

### 3.3. Install MongoDB Community Edition
#### NOTE: only required if you want to use local database

* Import the public key used by the package management system

From a terminal, install gnupg and curl if they are not already available:
```bash
sudo apt-get install gnupg curl
```

To import the MongoDB public GPG key, run the following command:
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
--dearmor
```
* Create a list file for MongoDB

Create the /etc/apt/sources.list.d/mongodb-org-7.0.list file for Ubuntu 22.04 (Jammy):
```bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```

* Reload local package database
```bash
sudo apt-get update
```

* Install the MongoDB packages
```bash
sudo apt-get install -y mongodb-org
```

* Check mongodb version
```bash
mongod --version
```
Output: db version v7.0.6

---

### 3.4. Run MongoDB Community Edition
* Start MongoDB
```bash
sudo systemctl start mongod
```
If you receive an error similar to the following when starting mongod:

Failed to start mongod.service: Unit mongod.service not found.

Run the following command first:
```bash
sudo systemctl daemon-reload
```

* Check MongoDB status
```bash
sudo systemctl status mongod
```
Check for **Active: active (running)** in output

Press CTRL + C to exit

* Stop MongoDB
```bash
sudo systemctl stop mongod
```

* Check MongoDB status
```bash
sudo systemctl status mongod
```
Check for **Active: inactive (dead)** in output

Press CTRL + C to exit

* Ensure MongoDB will start following a system reboot
```bash
sudo systemctl enable mongod
```
Output:

Created symlink /etc/systemd/system/multi-user.target.wants/mongod.service → /lib/systemd/system/mongod.serv

* Restart MongoDB
```bash
sudo systemctl restart mongod
```

* To enter mongodb shell
```bash
mongosh
```
To exit the mongodb shell
```bash
.exit
```

---

## 4. Downloading and running the project

### 4.1. Clone the repository from github

Inside the root directory of ubuntu:
```bash
git clone https://github.com/shivanshsanoria1/Noobcode_MERN_stack.git
```

---

### 4.2. install the project dependencies
* move to the project directory
```bash
cd Noobcode_MERN_stack
```

* install the backend dependencies
```bash
npm install
```

* move to the frontend directory
```bash
cd frontend
```

* install the frontend dependencies
```bash
npm install
```
* Create the run build for frontend
```bash
npm run build
```

---

### 4.3. Setting up the environment variables
#### NOTE: to view .env files
```bash
ls -a
```

* Inside the project directory, create a file named **.env**
```bash
touch .env
```

* Open the .env file
```bash
nano .env
```

* Add the following variables inside

  * NODE_ENV = production

  * \# PORT = 

  * \# MONGODB_LOCAL_DB_NAME = 

  * \# MONGODB_CONNECTION_URI = 

  * SYNC_FILES = true

* to save and exit
  * CTRL + O
  * Enter
  * CTRL + X

* move to the frontend directory
```bash
cd frontend
```

* create a file named **.env**
```bash
touch .env
```

* Open the .env file
```bash
nano .env
```

* Add the following variables inside

  * REACT_APP_BACKEND_ORIGIN = http://localhost:8000

  * REACT_APP_LEETCODE_TOTAL_PROBLEMS = 3077

* to save and exit
  * CTRL + O
  * Enter
  * CTRL + X

---

### 4. cloning the solutions repository from github
Inside the project directory
```bash
git clone https://github.com/shivanshsanoria1/LeetcodeSolutions.git
```

---

### 5. Install and configure nginx
Inside the root directory of ubuntu

* install nginx
```bash
sudo apt install nginx
```

* check nginx version
```bash
nginx -v
```
Output: nginx version: nginx/1.18.0 (Ubuntu)

* configure nginx
```bash
sudo nano /etc/nginx/sites-available/default
```
add the following:
```bash
location / {
  proxy_pass http://localhost:8000; # whatever port your app runs on
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}
```

* check nginx config
```bash
sudo nginx -t
```
Output:

nginx: the configuration file /etc/nginx/nginx.conf syntax is ok

nginx: configuration file /etc/nginx/nginx.conf test is successful

* restart nginx
```bash
sudo nginx -s reload
```

---

### 6. Install pm2
Inside the root directory of ubuntu:

* install pm2 globally
```bash
npm install -g pm2
```

Inside the project directory:

* start the application
```bash
pm2 start backend/app.js
```

* check pm2 status
```bash
pm2 status
```

* check pm2 logs
```bash
pm2 logs
```

* stop the application
```bash
pm2 stop all
```

---

