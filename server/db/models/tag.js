'use strict'
module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('tag', {
        name: DataTypes.TEXT,
        key: DataTypes.TEXT
    }, {})

    Tag.associate = ({Post, PostTag}) => {
      Tag.belongsToMany(Post, { through: "postTags" })
      Tag.hasMany(PostTag);
    }

    return Tag
}