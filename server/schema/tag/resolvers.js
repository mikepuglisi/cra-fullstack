const {tag: tagModel} = require('../../db/models')

module.exports = {
    Tag: {
        posts: async({id}, _, {dataLoaders: {postTagLoader}}) => await postTagLoader.load(id)
    },
    Query: {
        getTags: async(_, __, {dataLoaders: {postTagLoader}}) => {
            const tags = await tagModel.findAll({
                order: [
                    ['createdAt', 'desc']
                ]
            })

            tags.forEach(tag => {
              postTagLoader.prime(tag.id, tag)
            })

            return tags
        }
    }
}