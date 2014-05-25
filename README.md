# em-basicauth

basic authentication for ee webservices

## installation

	npm install em-basicauth

## build status

[![Build Status](https://travis-ci.org/eventEmitter/em-basicauth.png?branch=master)](https://travis-ci.org/eventEmitter/em-basicauth)


## usage

	var BasicAuth = require('em-basicauth');

	var ba = new BasicAuth({
		users: {
			dylan: 'password'
		}
	});


	webservices.use(ba);