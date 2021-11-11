const mongoose = require('mongoose');
console.log('mongoose loaded');
mongoose.connect('mongodb://127.0.0.1:27017/blog-api', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})