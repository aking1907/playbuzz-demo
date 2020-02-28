function upsertPageView(pageId) {
  const PageView = require('../models/pageViewModel.js');
  PageView.findOne({ pageid: pageId }, (err, pageView) => {
    if (err) throw err;

    if (pageView == null) {
      pageView = new PageView({ pageid: pageId, countviews: 0 });
    } else {
      if (pageView.countviews == NaN) {
        pageView.countviews = 1;
      }
    }

    pageView.countviews += 1;
    pageView.save();
  });
}

module.exports.upsertPageView = upsertPageView;

function upsertBrowser(userAgent) {
  const Browser = require('../models/browserModel.js');
  const UAParser = require('ua-parser-js');
  
  const parser = new UAParser();
  var browserName = parser.setUA(userAgent).getBrowser().name;

  if (browserName == '' || browserName == null) {
    browserName = userAgent;
  }
  Browser.findOne({ name: browserName }, (err, browser) => {
    if (err) throw err;

    if (browser == null) {
      browser = new Browser({ name: browserName, countviews: 0 });
    } else {
      if (browser.countviews == NaN) {
        browser.countviews = 1;
      }
    }

    browser.countviews += 1;
    browser.save();
  });
}

module.exports.upsertBrowser = upsertBrowser;

function upsertCountry(ip) {
  const Country = require('../models/countryModel.js');
  const geoip = require('geoip-country');
  //ip = "106.97.227.239";
  var countryCode = "Unknown";
  try {
    const geo = geoip.lookup(ip);
    countryCode = geo.country;
  }
  catch{ }

  Country.findOne({ code: countryCode }, (err, country) => {
    if (err) throw err;

    if (country == null) {
      country = new Country({ code: countryCode, countviews: 0 });
    } else {
      if (country.countviews == NaN) {
        country.countviews = 1;
      }
    }

    country.countviews += 1;
    country.save();
  });
}

module.exports.upsertCountry = upsertCountry;

function upsertUser(userId) {
  const User = require('../models/userModel.js');
  User.findOne({ id: userId }, (err, user) => {
    if (err) throw err;

    if (user == null) {
      user = new User({ id: userId, newcommer: true });
      user.save();
    } else if (user.newcommer) {
      user.newcommer = false;
      user.save();
    }
  });
}

module.exports.upsertUser = upsertUser;