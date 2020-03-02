const express = require('express');
const auth = require('../auth/auth.js');

function ruotes(PageView) {
  const pageViewRouter = express.Router();

  pageViewRouter.route('/pageviews/:pageId')
    .get((req, res) => {
      const authResult = auth.verifyToken(req, res);

      if (!authResult.auth)
        return res.status(authResult.status).send(authResult);

      const query = { pageid: req.params.pageId };
      PageView.findOne(query, (err, pageView) => {
        if (err) {
          return res.send(err);
        }
        return res.json(pageView);
      });
    });

  return pageViewRouter;
}

module.exports = ruotes;