# Reign Design Node.js Developer test

This project is made to obtain the postition of Node.js Developer at [Reign Design](https://www.reigndesign.com/).  

It is required to make a web aplication using Node.js and related technologies.

The server needs to run a process that request data of an [API](https://hn.algolia.com/api/v1/search_by_date?query=nodejs) from Hacker News.

The web app will open an article by clicking in a row and remove an article by clicking the trash icon, once an article is removed it should not appeard even if the data is updated.

## Getting Started
### Installation

This project was made using [Node.js](https://nodejs.org/en/download/releases/) version 8.10.0 and [MongoDB](https://www.mongodb.com/download-center#previous) version 3.6 which you need to install and download following the links.

After installing Node.js and MongoDB you should clone or download this repository into your local machine, open a terminal in the location of the project and initialize NPM with the following command:

```
npm install
```

This will automatically add a node_modules folder into the project and install every dependency you need for the project to work, this dependencies are configured on package.json.


## Running and testing the web server

To be able to connect to MongoDB you must add environment variables creating a file .env on the root of the project and add the following variables:

```
DB_HOST = your_host
DB_PORT = 27017
DB_NAME = reigndesign
DB_ENVIRONMENT = development
```

Then you can start the web app and server with the following command on the terminal:
```
npm start
```
This command will start your web app and server on your [localhost:8081](http://localhost:8081).

Once you are connected you should see a message like this in the console.
```
Environment: development
App listening on port 8081!
connection OK!
Getting news 2018-08-25T18:04:07.710Z
```

## Aditional comments

A demo of the web app is also available in AWS at this [link](http://reigndesign-env.dykrd2yfus.us-east-1.elasticbeanstalk.com/).

## Built With

* [Node.js](https://nodejs.org/en/)
* [Express.js](http://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Pug](https://pugjs.org/api/getting-started.html/)
* [Bootstrap](https://getbootstrap.com/)


## Authors

* **Andrés Meneses** - [brockoly](https://github.com/brockoly)