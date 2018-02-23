# Basis CLI
[![Build Status](https://www.travis-ci.org/basis-stack/basis-cli.svg?branch=master)](https://www.travis-ci.org/basis-stack/basis-cli)

Command-line tool for scaffolding new Basis web apps. This package will generate a new app project & folder structure based on the Basis Stack. Similar in nature to Yeoman generators or Express application generator, the tool generates a ready-to-go app setup for any web app, API or site utilising the Basis Stack.

## Why ?

Whilst yeoman is great for simple app setups, the fact that it is a) grunt based and b) (file) template based, it has some limitations when it comes to large project structures, customisation and syncing / keeping the templates up to date. Also, whilst one could just as easily clone the main basis template / repo from https://github.com/basis-stack/basis, that repo is a monorepo and has many internal concerns regarding nested packages & testing, etc that you wouldn't necessarily want included in your target app. Fundamentally, that repo is not designed to be cloned for a new project as is overkill for most apps.

So this tool was written to bridge the gaps between yeoman's limitations / support overhead and the overkill of cloning the core basis monorepo.

## Usage

1) Install the package globally:

   ```
   npm install --global basis-cli
   ```

2) Run basis cli (optionally with the name of target app as parameter):

   ```
   basis some-cool-app
   ```

3) Answer the few questions in the UI:

   *TODO: Add image here*

4) Navigate to new app, build and start:
   ```
   cd some-cool-app
   <npm install> || <yarn>
   npm run build
   npm start
   ```