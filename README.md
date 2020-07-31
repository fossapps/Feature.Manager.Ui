# fossapps/feature.manager.ui

[![Dependency Status](https://david-dm.org/fossapps/feature.manager.ui.svg)](https://david-dm.org/crazyfactory/feature.manager.ui)
[![devDependency Status](https://david-dm.org/crazyfactory/feature.manager.ui/dev-status.svg)](https://david-dm.org/crazyfactory/feature.manager.ui?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/crazyfactory/feature.manager.ui.svg)](https://github.com/crazyfactory/feature.manager.ui/issues)
___

Using technologies:

[![TypeScript](./.github/typescript.png)](https://www.typescriptlang.org/)
[![React](./.github/react.png)](https://github.com/facebook/react)
[![Redux](./.github/redux.png)](https://github.com/reactjs/redux)


[![Try in PWD](https://github.com/play-with-docker/stacks/raw/master/assets/images/button.png)](https://labs.play-with-docker.com/?stack=https://gist.githubusercontent.com/cyberhck/aea79cf0fc70030e8a0addb349a223d3/raw/404f30d96bf39a78e8de386ed8befe5d9c8f378c/docker-compose-stable.yml)

## Installation

You can clone from this repository and use master

```bash
$ git clone https://github.com/fossapps/Feature.Manager.Ui
$ cd Feature.Manager.Ui
$ npm install
```

## Usage

All commands defaults to development environment. You can set `NODE_ENV` to `production` or use the shortcuts below.

```bash
# Running

$ npm start # This starts the app in development mode

# Starting it with the production build
$ NODE_ENV=production npm start # or
$ npm run start:prod

# Building 

$ npm build # This builds the app in development mode

# Commands below builds the production build
$ NODE_ENV=production npm build # or
$ npm run build:prod

# Testing
$ npm test

# Too see doc, run this command, and go to localhost:6060. Any component that has .md file with the same name will be
# doc-generated.
$ npm run doc
```
