const express = require('express');
var db  = require('../../db/models');
var router  = express.Router();

router.get('/posts', function(req, res) {
    db.post.findAll({
  }).then(function(posts) {
    res.send(posts);
  });
});

module.exports = router;