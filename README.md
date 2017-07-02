# StoryTelling

[![Build Status](https://travis-ci.org/weareopensource/storytelling.svg?branch=master)](https://travis-ci.org/weareopensource/storytelling)


## Presentation 

To add presentation / screenshot ...


## Before You Begin

Before you begin we recommend you read about the basic building blocks that assemble the (backend + frontend) application:

### Front-End

* Angular CLI - The Angular 2 part of this project was generated with [angular-cli](https://github.com/angular/angular-cli)   version 1.0.0.

### Back-End

* MongoDB - Go through [MongoDB Official Website](http://mongodb.org/) and proceed to their [Official Manual](http://docs.mongodb.org/manual/), which should help you understand NoSQL and MongoDB better.

* Express - The best way to understand express is through its [Official Website](http://expressjs.com/), which has a [Getting Started](http://expressjs.com/starter/installing.html) guide, as well as an [ExpressJS](http://expressjs.com/en/guide/routing.html) guide for general express topics. You can also go through this [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) for more resources.

* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) version 7.7+ and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Angular-cli  - You're going to use the Angular cli to manage your front-end build. Make sure you've installed npm / yarn first, then install angular cli globally using npm:

```bash
$ npm install -g @angular/cli
```

or

```bash
$ yarn global add @angular/cli
```

## Quick Install

To install the dependencies, run this in the application folder from the command-line:

```bash
$ npm install
```
or 
```bash
$ yarn install
```

## Running Your Application
   To run teh application , you need to start the front-End as serve and the API (back-End) as another nodejs server :
* **Front End** : Run `npm  run client` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
* **API** :  Run `npm run gulp` for back end server . The API is up on `http://localhost:3000/`.

### Running in Production mode
   To run your application with *production* environment configuration:

* **Front End** : Run `npm run prod` to build the project. The build artifacts will be stored in the `server/public/` directory. Use the `--prod` flag for a production build and `--bh` for base href in the `index.html`.

* **API** :  Run `npm run gulp` for back end server . The application is up on `http://localhost:3000/`.

## Contributing
We welcome pull requests from the community!

## License
[The MIT License](LICENSE.md)