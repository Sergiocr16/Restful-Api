'use strict';

// server.js (Express 4.0)

// BASE SETUP
// ==============================================

// call the packages we need
let express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		dbURI = 'mongodb://localhost/test',
		port = process.env.PORT || 8080;

// connect to mongodb
 mongoose.connect(dbURI);

// 

let Email = require('./models/email');



// DEFINE THE MIDDLEWARE FOR APP
// ==============================================

// configure app to use bodyParser()
// this will let us get data from POST
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  



// ROUTES
// ==============================================

// get an instance of the express router
let apiRouter = express.Router();

// test router
apiRouter.get('/', (req, res) => {
	res.json({ message: 'welcome to our api' });
});

// MIDDLEWARE to use for all requests
apiRouter.use((req, res, next) => {
	// do something before running routes
	console.log('Happening before routes...');
	next();   // don't stop here, go to next route
});

// routes 


// on routes that end in /emails
apiRouter.route('/emails')
	// create a email (http://localhost:8080/emails)
	.post((req, res) => {
		let email = new Email();

		email.name = req.body.name;
		email.email = req.body.email;
		email.theme = req.body.theme;

		email.save(err => {
			if (err) res.send(err);
			res.json({ message: 'Email created!' });
		});
	})

apiRouter.route('/emails')
	// get all emails (http://localhost:8080/api/emails)
	.get((req, res) => {
		Email.find((err, emails) => {
			if (err) res.send(err);
			res.json(emails);
		});
	});



// on routes that end in /emails/:email_id
apiRouter.route('/emails/:email_id')
	// get a email by id (http://localhost:8080/api/emails/:email_id)
	.get((req, res) => {
		Email.findById(req.params.email_id, (err, email) => {
			if (err) res.send(err);
			res.json(email);
		});
	})
	// update a email by id (http://localhost:8080/api/emails/:email_id)
	.put((req, res) => {
		Email.findById(req.params.email_id, (err, email) => {
			if (err) res.send(err);
			// update info
			email.name = req.body.name;
			email.email = req.body.email;
			email.theme = req.body.theme;
			// save email
			email.save(err => {
				if (err) res.send(err);
				res.json({ message: 'Email updated!' });
			});
		});
	})
	apiRouter.route('/delete/:email_id')
	// delete a email by id (http://localhost:8080/api/emails/:email_id)
	.delete((req, res) => {
		Email.remove({ _id: req.params.email_id }, (err, email) => {
			if (err) res.send(err);
			res.json({ message: 'Successfully deleted!'});
		});
	});




// routes -movies
// generic root route of the api
apiRouter.get('/', (req, res) => {
	res.json({ message: 'Hello API!' });
});


//actor and actreess aprox search
apiRouter.route('/emails/email/query')
	.get((req,res)=> {
		let emailString = req.query.email;
		Email.find({"email":{"$regex": emailString}},(err,emails) => {
			if (err) res.send(err);
			res.json(emails);
		})
	});

// apiRouter.route('/movies/actress/query')
// 	.get((req,res)=> {
// 	let emailString = req.query.actress;
// Movie.find({"email":{"$regex": actorString}},(err,movies) => {
// 	if (err) res.send(err);
// res.json(movies);
// })
// });




// register our routes
// all routes will be prefixed with /api
app.use(apiRouter);



// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);

