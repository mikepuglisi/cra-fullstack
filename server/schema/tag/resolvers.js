const {Tag} = require('../../db/models')

module.exports = {
    Tag: {
        posts: async({id}, _, {dataLoaders: {postTagLoader}}) => await postTagLoader.load(id)
    },
    Query: {
        tags: async(_, __, {dataLoaders: {postTagLoader}}) => {
            const tags = await Tag.findAll({
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