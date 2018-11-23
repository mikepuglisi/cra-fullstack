(async() => {
    try {
        require('dotenv').config()
        const express = require('express')
        const http = require('http')
        const helmet = require('helmet')
        const {ApolloServer} = require('apollo-server-express')
        const {typeDefs, resolvers} = require('./schema')
        const createDataLoaders = require('./dataloaders')
        var db  = require('./db/models');

        const {
            NODE_ENV,
            PORT = 5000
        } = process.env

        const isProd = NODE_ENV === 'production'

        const app = express()

        app.enable('trust proxy', 'loopback')

        app.use(helmet({
            hsts: {
                setIf(req) {
                    return isProd && req.secure
                }
            }
        }))

        const api = new ApolloServer({
            typeDefs,
            resolvers,
            context: () => ({
                dataLoaders: createDataLoaders()
            }),
            playground: {
                settings: {
                    'editor.cursorShape': 'line'
                }
            }
        })

        api.applyMiddleware({app})

        const httpServer = http.createServer(app)

        api.installSubscriptionHandlers(httpServer)
        db.sequelize.sync({force: false}).then(() => {
            httpServer.listen(PORT, () => {
                console.log(`Listening on port ${PORT}`)
            })
        })
    } catch (err) {
        console.log(err)
    }
})()

// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const port = process.env.PORT || 5000;

// var db  = require('./db/models');

// var apiRoutes  = require('./routes/api');

// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api', apiRoutes);

// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express Server API' });
// });

// db.sequelize.sync({force: false}).then(() => {
//     app.listen(port, () => console.log(`Listening on port ${port}`));
// })
