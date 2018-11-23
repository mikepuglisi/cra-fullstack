const DataLoader = require('dataloader')
const {Comment} = require('../db/models')

module.exports = () => ({
  postCommentLoader: new DataLoader(async postIds => {
    const comments = await Comment
      .findAll({ where: {postId: postIds}})
      .then(rows => postIds.map(postId => rows.filter(x => x.postId === postId)));
    return comments
  }
)
    // postCommentLoader: new DataLoader(async postIds =>
    //     await Promise.all(postIds.map(async postId => await Comment.findAll({where: {postId}})))
    // )
})

/*
    postCommentLoader: new DataLoader(async postIds => await comment.findAll({ where: {postId: postIds}})
      .then(rows => postIds.map(postId => rows.filter(x => x.postId === postId)))
    )
    */