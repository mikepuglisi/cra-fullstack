const {Post} = require('../../db/models')

module.exports = {
    Post: {
        comments: async({id}, _, {dataLoaders: {postCommentLoader}}) => await postCommentLoader.load(id),
        tags: async({id}, _, {dataLoaders: {postTagLoader}}) => await postTagLoader.load(id)
    },
    Query: {
        posts: async(_, __, {dataLoaders: {postLoader}}) => {
            const posts = await Post.findAll({
                order: [
                    ['createdAt', 'desc']
                ]
            })

            posts.forEach(post => {
                postLoader.prime(post.id, post)
            })

            return posts
        }
    }
}