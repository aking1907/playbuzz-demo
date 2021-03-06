const express = require('express');
const auth = require('../auth/auth.js');

function ruotes(Browser) {
  const browserRouter = express.Router();

  browserRouter.route('/browsers/:browserName')
    .get((req, res) => {
      const authResult = auth.verifyToken(req, res);

      if (!authResult.auth)
        return res.status(authResult.status).send(authResult);

      const query = { name: req.params.browserName };

      Browser.findOne(query, (err, browser) => {
        if (err) {
          return res.send(err);
        }
        return res.json(browser);
      });
    });

  return browserRouter;
}

module.exports = ruotes;