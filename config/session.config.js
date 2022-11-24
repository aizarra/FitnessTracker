const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
      }),
    })
  );
};
