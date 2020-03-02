const express = require('express');
const auth = require('../auth/auth.js');

function ruotes(Country) {
  const countryRouter = express.Router();

  countryRouter.route('/countries/:countryCode')
    .get((req, res) => {
      const authResult = auth.verifyToken(req, res);

      if (!authResult.auth)
        return res.status(authResult.status).send(authResult);

      const query = { code: req.params.countryCode };

      Country.findOne(query, (err, country) => {
        if (err) {
          return res.send(err);
        }
        return res.json(country);
      });
    });

  return countryRouter;
}

module.exports = ruotes;