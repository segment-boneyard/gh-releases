/**
 * Module dependencies.
 */

var request = require('request');
var assert = require('assert');

/**
 * Fetch releases with `opts`:
 *
 * - `token` github token
 * - `user` github user
 * - `pass` github pass
 * - `repo` username/project
 *
 * @param {Object} opts
 * @param {Function} fn
 * @api public
 */

module.exports = function(opts, fn){
  assert(opts, 'config required');
  assert(opts.repo, 'github repo required');
  tags(opts, fn);
};

/**
 * Fetch tags.
 */

function tags(pkg, fn) {
  var url = releases(pkg);

  var opts = {
    url: url,
    headers: { 'User-Agent': 'gh-lookup' },
    json: true
  };

  if (pkg.token) opts.headers.Authorization = 'Bearer ' + pkg.token;
  if (pkg.user && pkg.pass) opts.headers.Authorization = 'Basic ' + basic(pkg);

  request(opts, function(err, res, body){
    if (err) throw err;

    var l = ~~res.headers['x-ratelimit-limit'];
    var n = ~~res.headers['x-ratelimit-remaining'];
    if (0 == n) return fn(new Error('ratelimit of ' + l + ' requests exceeded'));

    fn(null, body);
  });
}
/**
 * Return tags url.
 */

function releases(opts) {
  return 'https://api.github.com/repos/' + opts.repo + '/tags';
}

/**
 * Return base64 encoded basic auth.
 */

function basic(opts) {
  return new Buffer(opts.user + ':' + opts.pass).toString('base64');
}