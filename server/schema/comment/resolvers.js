const {Comment} = require('../../db/models')

module.exports = {
    Comment: {
        post: async({postId}, _, {dataLoaders: {postLoader}}) => await postLoader.load(postId)
    },
    Query: {
        comments: async(_, __, {dataLoaders: {postCommentLoader}}) => {
            const comments = await Comment.findAll({
                order: [
                    ['createdAt', 'desc']
                ]
            })
            const postMap = comments.reduce((sum, comment) => ({
                ...sum,
                [comment.postId]: [
                    ...(sum[comment.postId] || []),
                    comment
                ]
            }), {})

            Object.keys(postMap).forEach(postId => {
                const c = postMap[postId]

                postCommentLoader.prime(postId, c)
            })

            return comments
        }
    }
}