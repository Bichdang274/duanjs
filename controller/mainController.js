exports.home = (req, res) => {
  const username = req.query.username || '';
  res.render('main', { username });
};

exports.mainvoca = (req, res) => {
  const username = req.query.username || '';
  res.render('mainvoca', { username });
};

exports.grammar = (req, res) => {
  const username = req.query.username || '';
  res.render('grammar', { username });
};

exports.index2 = (req, res) => {
  const username = req.query.username || '';
  res.render('index2', { username });
};
