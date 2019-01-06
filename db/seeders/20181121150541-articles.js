'use strict';

const articleTpl = {
  title: 'Title',
  content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, facere beatae alias, accusantium iure eaque, corrupti maxime nesciunt ducimus molestiae rerum amet quae non. Impedit in eius vel laborum ducimus?',
  authorId: 1,
  status: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const articles = Array(100).fill(1).map((e, idx) => {
  return {
    ...articleTpl,
    title: `${articleTpl.title} ${idx}`
  }
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Articles', articles, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Articles', null, {});
  }
};
