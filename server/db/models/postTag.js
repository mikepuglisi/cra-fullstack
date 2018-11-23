'use strict'
module.exports = (sequelize, DataTypes) => {
    const PostTag = sequelize.define('postTag', {
    }, {})
    PostTag.removeAttribute('id')
    PostTag.associate = function(models) {
      // associations can be defined here
      // RentalChannel.hasMany(models.Rental, {foreignKey: 'id', sourceKey: 'placeId'});
      PostTag.belongsTo(models.Post);
      PostTag.belongsTo(models.Tag);
    };
    // Tag.associate = ({Post}) => {
    //   Tag.belongsToMany(Post, { through: "postTags" })
    // }

    return PostTag
}