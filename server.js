const express = require('express');
const MobileDetect = require('mobile-detect');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/p/:id', (req, res) => {
  const md = new MobileDetect(req.headers['user-agent']);
  const productId = req.params.id;
  const affiliateTag = 'yourAffiliateID';

  const webUrl = `https://www.amazon.com/dp/${productId}?tag=${affiliateTag}`;
  const appUrl = `amazon://www.amazon.com/dp/${productId}?tag=${affiliateTag}`;

  if (md.mobile()) {
    return res.redirect(
      `/redirect.html?app=${encodeURIComponent(appUrl)}&web=${encodeURIComponent(webUrl)}`
    );
  }

  return res.redirect(webUrl);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
