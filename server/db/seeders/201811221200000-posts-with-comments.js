'use strict'
const db = require("../models");

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    up: async queryInterface => {

      let documentation = "";
      for (let model of Object.keys(db)) {
        if (!db[model].name || db[model].name === "Sequelize") continue;

        documentation += `\n\n----------------------------------\n
        ${db[model].name}
        \n----------------------------------`;

        documentation += `\nAttributes\n`;
        for (let attr of Object.keys(db[model].attributes)) {
          documentation += db[model].name + "." + attr + "\n";
        }

        documentation += "\nAssociations\n";
        for (let assoc of Object.keys(db[model].associations)) {
          for (let accessor of Object.keys(
            db[model].associations[assoc].accessors
          )) {
            documentation +=
              db[model].name +
              "." +
              db[model].associations[assoc].accessors[accessor] +
              "()\n";
          }
        }
      }
// console.log('documentation', documentation)
        const now = new Date()

        await queryInterface.bulkInsert('Posts', Array(10).fill().map((_, i) => ({
            title: `Post #${i + 1}`,
            content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi iusto blanditiis, recusandae eligendi nisi cupiditate aliquam reiciendis fuga voluptatem rerum ut quo veniam numquam. Numquam, quas? Dicta ducimus voluptate id, animi aliquam sunt quam dolore praesentium suscipit. Totam facere, soluta obcaecati temporibus vel distinctio eum, aut illum, officia asperiores quasi!',
            createdAt: now,
            updatedAt: now
        })))

        await queryInterface.bulkInsert('Tags', Array(10).fill().map((_, i) => ({
          name: `Tag #${i + 1}`,
          key: `tag-${i + 1}`,
          createdAt: now,
          updatedAt: now
        })))

        const tags = await db.Tag.findAll();
        const posts2 = await db.Post.findAll();

        await Promise.all(posts2.map(async(post) => {
          await post.addTag(tags[getRandom(0, tags.length)])
        })
      )
        // console.log('tags', tags)

        const [posts] = await queryInterface.sequelize.query('SELECT id FROM "Posts";')

        await Promise.all(posts.map(async({id: postId}) => {
            await queryInterface.bulkInsert('Comments', Array(5).fill().map((_, i) => ({
                postId,
                content: `Comment #${i + 1} for Post #${postId}`,
                createdAt: now,
                updatedAt: now
            })))
        }))


    },

    down: async queryInterface => {
        await Promise.all([
            queryInterface.bulkDelete('posts'),
            queryInterface.bulkDelete('comments'),
            queryInterface.bulkDelete('tags'),
            queryInterface.bulkDelete('postTags')
        ])
    }
}