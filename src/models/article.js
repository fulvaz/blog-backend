'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    createTime: DataTypes.INTEGER,
    updateTime: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};