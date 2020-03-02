const express = require('express');

const eventHandler = require('../handlers/eventHandler');

function ruotes(Event) {
  const eventRouter = express.Router();

  eventRouter.route('/events')
    .post((req, res) => {
      const event = new Event(req.body);

      event.save();

      eventHandler.upsertPageView(event.pageid);
      eventHandler.upsertBrowser(req.headers['user-agent']);
      eventHandler.upsertCountry(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
      eventHandler.upsertUser(event.userid);

      return res.status(201).json(event);
    });

  return eventRouter;
}

module.exports = ruotes;