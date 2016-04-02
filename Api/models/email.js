'use strict'; 

 
 let mongoose = require('mongoose'), 
 		Schema = mongoose.Schema; 
 
 
 let	EmailSchema = new Schema({ 
 	name: String, 
 	email: String, 
 	theme: String 
 }); 
 
  module.exports = mongoose.model('Email', EmailSchema); 
