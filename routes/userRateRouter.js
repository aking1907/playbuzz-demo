const express = require('express');
const auth = require('../auth/auth.js');

function ruotes(User) {
  const userRateRouter = express.Router();
  var userCount;
  userRateRouter.route('/rate')
    .get(async (req, res) => {
      const authResult = auth.verifyToken(req, res);
      
      if (!authResult.auth) 
        return res.status(authResult.status).send(authResult);

        userCount = await User.countDocuments({}, (err, result) => {
          if (err) {
            return res.send(err);
          };
        });

        if (userCount == 0) {
          return res.json({ rate: 0 });
        }

        const query = { newcomer: true };
        const newUserCount = await User.countDocuments(query, (err, result) => {
          if (err) {
            return res.send(err);
          };
        });

        const rateValue = (newUserCount / userCount).toFixed(2);

        return res.json({ users: userCount, newcomers: newUserCount, rate: rateValue });
      

    });
  return userRateRouter;
}

module.exports = ruotes;