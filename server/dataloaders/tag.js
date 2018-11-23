const DataLoader = require('dataloader')
const {tag} = require('../db/models')

module.exports = () => ({
    postTagLoader: new DataLoader(async postIds =>
        await Promise.all(postIds.map(async postId => await tag.findAll({where: {postId}})))
    )
})

/*
    postCommentLoader: new DataLoader(async postIds => await comment.findAll({ where: {postId: postIds}})
      .then(rows => postIds.map(postId => rows.filter(x => x.postId === postId)))
    )
    */