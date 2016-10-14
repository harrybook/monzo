<h1 align="center">monzo</h1>
<p align="center">A simple web interface for <a href="http://monzo.com">Monzo</a>, written in <a href="http://vuejs.org">Vue.js</a>.</p>
<p align="center"><img src="https://cloud.githubusercontent.com/assets/1469007/19223488/0566d99e-8e69-11e6-8ef1-67f5f07c2dd6.png" width="700px">

## Features

* Simple transaction list view.
* Google Maps integration.
* Additional transaction information (declines, notes etc).
* Support for foreign payments and currencies.
* Uses refresh tokens to persist sessions.

## Configuration

A few steps are required before the application is ready to run.

Firstly, create an application in [Monzo's developer dashboard](https://developers.monzo.com/) (this is required whilst Monzo is still in beta). Use `http://localhost:2020/callback` as the redirect URL, and set the confidentiality to "confidential". Note down the client ID and client secret.

Secondly, if you want support for Google Maps integration, [get an API key](https://developers.google.com/maps/documentation/javascript/get-api-key) and note this down too.

Lastly, duplicate `config.sample.js` and rename to `config.js`. Update this file with your keys.

## Usage

* Run `npm install`.
* Run `npm run prod`.

## Development

* Run `npm start`.
* Run `npm run watch` (separate tab).

## Tasks

* Run accessibility tests and fix issues.
* Add proper mobile support (transaction modals etc).
* Improve account list.
* Improve login button and page design.
