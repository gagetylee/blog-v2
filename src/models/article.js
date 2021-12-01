const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
   "title": {
      "type": String,
      "required": true,
      "trim": true,
      "unique": true,
   },
   "content": {
      "type": String,
      "required": true,
      "trim": true
   },
   "date": {
      "type": Date,
      "default": Date.now()
   },
   "slug": {
      "type": String,
      "required": true,
      "unique": true,
   }
   
})

articleSchema.pre('validate', function(next) {
   if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true })
   }
   next()
})

module.exports = mongoose.model('Article', articleSchema)