'use strict'
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        content: DataTypes.TEXT
    }, {})

    Comment.associate = ({Post}) => {
      Comment.belongsTo(Post)
    }

    return Comment
}