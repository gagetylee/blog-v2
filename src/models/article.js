const mongoose = require('mongoose');

const Article = mongoose.model('Article', {
   "title": {
      "type": String,
      "required": true,
      "trim": true,
      "unique": true
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
   "url": {
      "type": String,
      "required": true,
      "unique": true
   }
})
module.exports = Article