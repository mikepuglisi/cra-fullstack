const DataLoader = require('dataloader')
const { Tag, Post, PostTag } = require('../db/models')

module.exports = () => ({
    postTagLoader: new DataLoader(async postIds => {
      return await Tag.findAll({
        attributes: ["name", "key"],
        raw: true,
        include: [
          {
            model: PostTag,
            required: true,
            where: {postId: postIds},
            attributes: ["postId"]
          }
        ]
      })
      .then(rows => postIds.map(postId => rows.filter(x => x["postTags.postId"] === postId)))
    })
})
