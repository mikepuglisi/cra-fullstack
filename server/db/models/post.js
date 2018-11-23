'use strict'
module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define('post', {
        title: DataTypes.STRING,
        content: DataTypes.TEXT
    }, {})

    post.associate = ({comment, tag}) => {
        post.hasMany(comment)
        post.belongsToMany(tag, { through: "post_tag" })
    }

    return post
}