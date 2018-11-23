const {User} = require('../../db/models')

module.exports = {

    Query: {
        me: async(_, __, {dataLoaders: {postTagLoader}}) => {
            // const tags = await Tag.findAll({
            //     order: [
            //         ['createdAt', 'desc']
            //     ]
            // })

            // tags.forEach(tag => {
            //   postTagLoader.prime(tag.id, tag)
            // })

            return {email: "mikep@webpower.com"}
        }
    }
}