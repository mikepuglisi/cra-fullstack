'use strict'
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('post', {
        title: DataTypes.STRING,
        content: DataTypes.TEXT
    }, {})

    Post.associate = ({Comment, Tag}) => {
      Post.hasMany(Comment)
      Post.belongsToMany(Tag, { through: "postTags" })
    }

    return Post
}