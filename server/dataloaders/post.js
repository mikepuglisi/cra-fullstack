const DataLoader = require('dataloader')
const {Post} = require('../db/models')

module.exports = () => ({
    postLoader: new DataLoader(async ids =>
        await Promise.all(ids.map(async id => await Post.find({where: {id}})))
    )
})