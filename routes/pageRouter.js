const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('../models/Entry'); //here we include the model we created using the route model with a particular scheme. we will use the variable to perform different operations on the database

const pageRouter = express.Router();

pageRouter.use(bodyParser.urlencoded({extended:true}))
pageRouter.use(bodyParser.json())

pageRouter.route('/')
.get((req,res,next) => {
    res.end("just checking --> nothing to do")
})
.post((req, res, next) => {
})
.put((req, res, next) => {
})
.delete((req, res, next) => {
});


pageRouter.route('/create')
.get((req,res,next) => {
    res.render('newpage.ejs', { title: 'Daily Tracker' });   
})

.post((req, res, next) => {
    if ((Number(req.body.education) + Number(req.body.browse) + Number(req.body.social) + Number(req.body.shopping)) > 1440) {
        res.statusCode = 403;
    res.end('User entry limit reached. Total cannot be greater than 1440 minutes.');
    } else {
    routes.create(req.body) // the request body should provide all required information -->schema
    .then((entrycreated) => { //if the entry is created then entrycreated is set
        routes.find() // if it is set then execute find function to find the routes in the list
         .then((entriesfound) => { //if there are routes then provide the list in the next line
                res.render('currententry',{'entrylist' : entriesfound, title:'All entries'} );
        }, (err) => next(err))
    .catch((err) => next(err)); // if route.create is not successful ..
    }, (err) => next(err))
    .catch((err) => next(err)); //catch all errors --> http-error module. you can also print your message but in this case the module will handle it for you
    }
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /entries/create');
})

.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('Delete operation not supported on /entries/create');
});

pageRouter.route('/AllEntries')
.get((req,res,next) => {
    routes.find() // if it is set then execute find function to find the routes in the list
    .then((entriesfound) => { //if there are routes then provide the list in the next line
           res.render('currententry',{'entrylist' : entriesfound, title:'All entries'} );
   }, (err) => next(err))
.catch((err) => next(err)); // if route.find is not successful ..
})

pageRouter.route('/delete/:id')
.get((req, res) => {
   routes.deleteOne({_id: req.params.id}, (err) =>{
    if (err) {
            console.log('Something went wrong! User could not updated.');
    } 
   res.redirect("/entries/AllEntries");
    })
})


pageRouter.route('/update/:id')
.get((req, res) => {
        routes.findById(req.params.id, function(err, userData) {
        if (err) {
            console.log(err);
        } else {
            console.log(userData.date); // used for testing purposes
            res.render('updatepage', { title: "update Entry:" + userData.username});
        }
    })
})
.post((req,res) => {
    console.log(req.body); // used for testing purposes
    console.log(req.params.id); // used for testing purposes
    if ((Number(req.body.education) + Number(req.body.browse) + Number(req.body.social) + Number(req.body.shopping)) > 1440) {
        res.statusCode = 403;
    res.end('User entry limit reached. Total cannot be greater than 1440 minutes.');
    } else {
    routes.updateOne({_id: req.params.id}, req.body, {runValidators: true}, (err) =>{ // redirects back to allEntries even when new input doesn't pass validation.
        if (err) {
            console.log('Something went wrong! User could not updated.');
                res.redirect('update/' + req.params.id); 
        } else {
       res.redirect("/entries/AllEntries");
            }
        })
    }
})


pageRouter.route('/report')
.get((req, res) => {
    res.render('reportpage.ejs', { title: 'Report' });   
})
.post((req, res, next) => {
        console.log(req.body); // used for testing purposes
        routes.find({
            username: req.body.username, date: { $gte: new Date(req.body.date[0]), $lte: new Date(req.body.date[1])} 
        }) // finding entries for user input
        .then((entriesfound) => { //if there are routes then provide the list in the next line
               res.render('currentreport',{'reportlist' : entriesfound, title:'Report for user ' + req.body.username} );
       }, (err) => next(err))
   .catch((err) => next(err)); // if route.find is not successful ..
   })


module.exports = pageRouter;