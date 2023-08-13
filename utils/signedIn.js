const signedIn = (req, res, next) => {
  console.log(req.session);
  if (req.session.userToken) {
    res.json({ message: 'You are sign In this is not avilable' });
  // eslint-disable-next-line no-useless-return
  return;
  } else {
    next();
  }
};

module.exports = signedIn;