const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'must provide author'],
    maxlength: [20, 'title cannot be more than 20 characters']
  },
  title: {
    type: String,
    required: [true, 'must provide title'],
    trim: true,
    maxlength: [100, 'title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'must provide description'],
    maxlength: [10000, 'description cannot be more than 200 characters']
  },
  publishedAt: {
    type: Date,
    required: [true, 'must provide date'],
  },
  content: {
    type: String,
    required: [true, 'must provide content'],
    maxlength: [2000, 'description cannot be more than 1000 characters']
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
});

module.exports = mongoose.model('Article', ArticleSchema);
