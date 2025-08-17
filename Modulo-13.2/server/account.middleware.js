module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/account-list') {
    req.body.id = Date.now().toString();
    req.body.balance = 0;
    req.body.lastTransaction = new Date().toISOString();
  }
  next();
};
