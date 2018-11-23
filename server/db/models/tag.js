'use strict'
module.exports = (sequelize, DataTypes) => {
    const tag = sequelize.define('tag', {
        name: DataTypes.TEXT,
        key: DataTypes.TEXT
    }, {})

    tag.associate = ({post}) => {
      tag.belongsToMany(post, { through: "post_tag" })
    }

    return tag
}