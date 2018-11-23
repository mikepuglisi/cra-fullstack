const moment = require("moment");
const db = require("./db/models");

db.sequelize.sync({ force: false }).then(() => {
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

  console.log('documentation', documentation)
  // db.Booking.findAll({raw:true}).then(console.log)
  // db.RentalChannel.findAll({raw:true, attributes: ['icalUrl', 'rentalId', 'platformId'], where: {
  //   icalUrl: {
  //     [db.Sequelize.Op.ne]: null
  //   }
  // }})

  // db
  //   .Rental
  //   .findAll({raw:true, include: [{model: db.RentalChannel, include:[db.Booking]}] }) //, {model: db.Platform,  attributes: ['name', 'key'], through: {attributes: ['rentalUrl', 'icalUrl']}}]}) //, {model: db.Platform,  attributes: ['name'], through: {attributes: []}}
  //   .then(console.log)

  // db.RentalChannel.findOne({
  //   raw: true,
  //   attributes: [
  //     [db.sequelize.fn("max", db.sequelize.col("lastSync")), "lastsync"]
  //   ]
  // }).then(console.log);

  // db.Rental.findAll({
  //   raw: true,
  //   // attributes: [
  //   //   [
  //   //     db.sequelize.fn(
  //   //       "max",
  //   //       db.sequelize.col("end")
  //   //     ),
  //   //     "nextAvailable"
  //   //   ]
  //   // ],
  //   include: [
  //     {
  //       model: db.RentalChannel,
  //       include: [
  //         {
  //           model: db.Booking,
  //           group: ["organiztion.organization_id"]
  //         }
  //       ]
  //     }
  //   ]
  // }).then(console.log);

  // db.Booking.findAll({raw:true, include: [{model: db.RentalChannel, include:[db.Rental, db.Platform]}] }) // , include: [{model: db.RentalChannel, include:[db.Rental]}]
  // db.RentalChannel.findAll({
  //   raw: true,
  //   attributes: ["icalUrl", "rentalUrl", ["id", "RentalChannelId"]]
  // }).then(console.log);
  // .catch(console.log)

  // db.Rental.findAll({
  //   raw: true,
  //   include: [{ model: db.RentalChannel, include: [db.Platform] }]
  // }) //, {model: db.Platform,  attributes: ['name', 'key'], through: {attributes: ['rentalUrl', 'icalUrl']}}]}) //, {model: db.Platform,  attributes: ['name'], through: {attributes: []}}
  // const rental = "10330";

  // console.log("rental", rental);
  // const whereFilter = {};
  // whereFilter.label = {
  //   [db.Sequelize.Op.in]: [].concat(rental)
  // };

  // // db.Rental.findAll({
  // //   raw: true,
  // //   where: whereClause,
  // //   order: [["sort", "ASC"]]
  // // }).then(console.log);

  // const start = "20181107";
  // const end = "20181110";

  // const startDate = moment()
  //   .add(0, "days")
  //   .format();

  // const endDate = moment()
  //   .add(90, "days")
  //   .format();

  // db.Booking.findAll({
  //   raw: true,
  //   attributes: ["start", "end", "summary", "description", "location"],
  //   include: [
  //     {
  //       model: db.RentalChannel,
  //       attributes: ["rentalUrl", "icalUrl"],
  //       required: true,
  //       include: [
  //         {
  //           model: db.Rental,
  //           where: whereFilter,
  //           attributes: ["name", "key", "label"]
  //         },
  //         { model: db.Platform, attributes: ["name", "key", "url"] }
  //       ]
  //     }
  //   ],
  //   where: {
  //     start: {
  //       $between: [startDate, endDate]
  //     }
  //   }
  // }).then(console.log);

  // db.RentalChannel.findOne({
  //   attributes: ["icalUrl", "rentalUrl", ["id", "RentalChannelId"]],
  //   include: [{ model: db.Platform, attributes: ["key"] }],
  //   where: {
  //     icalUrl: {
  //       [db.Sequelize.Op.ne]: null
  //       // [db.Sequelize.Op.eq]:
  //       //   "https://rentals.tripadvisor.com/calendar/ical/7084141.ics?s=v183475ab40db547ecb72ba1c28c24bce8"
  //     }
  //   }
  // }).then(console.dir);

  // console.log(documentation);
  // console.log("startraw", moment(start).format());
  // console.log("endraw", moment(end).format());
  // console.log("start", start);
  // console.log("end", end);

  db.Tag.findAll({
    attributes: ["name", "key"],
    include: [
      {
        model: db.PostTag,
        required: true,
        where: {postId: [1,2,3,4,5]},
        attributes: ["postId"]
      }
    ]
  }).then((tags) => {
    tags.map((tag) => {
      console.log('tag', tag.postTags)
    })
  });
});
