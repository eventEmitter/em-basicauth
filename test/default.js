
	
	var   Class 		= require('ee-class')
		, log 			= require('ee-log')
		, http 			= require('http')
		, WebService 	= require('ee-webservice')
		, request 		= require('request')
		, assert 		= require('assert');



	var   BasicAuth = require('../')
		, instance
		, service;


	



	describe('BasicAuth', function(){
		it('should not crash during preparations', function(done){
			service = new WebService({
				  port: 7685
				, interface: 5
			});

			service.listen(done);
		});

		it('should not crash when instantiated', function(){
			instance = new BasicAuth({
				users: {
					dylan: 'ftw'
				}
			});

			service.use(instance);
		});

		it('should accpet proper authenticated users', function(done){
			request('http://127.0.0.1:7685/', {
				auth: {
					  user: 'dylan'
					, pass: 'ftw'
				}
			}, function(err, response, data){
				assert.equal(response.statusCode, 404);
				done();
			});
		});

		it('should not accpet not proper authenticated users #1', function(done){
			request('http://127.0.0.1:7685/', {
				  user: 'dylan'
				, pass: 'ftfw'
			}, function(err, response, data){
				assert.equal(response.statusCode, 401);
				done();
			});
		});

		it('should not accpet not proper authenticated users #2', function(done){
			request('http://127.0.0.1:7685/', {
				  user: ''
				, pass: 'ftfw'
			}, function(err, response, data){
				assert.equal(response.statusCode, 401);
				done();
			});
		});

		it('should not accpet not proper authenticated users #3', function(done){
			request('http://127.0.0.1:7685/', function(err, response, data){
				assert.equal(response.statusCode, 401);
				done();
			});
		});
	});
	