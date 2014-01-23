
var releases = require('..');

describe('releases(opts, fn)', function(){
  // it('should respond with private releases via .token', function(done){
  //   releases({
  //     token: process.env.TOKEN,
  //     repo: 'segmentio/accounts'
  //   }, function(err, releases){
  //     if (err) return done(err);
  //     releases.should.not.be.empty;
  //     releases[0].should.have.property('name');
  //     releases[0].should.have.property('commit');
  //     done();
  //   });
  // })

  it('should respond with private releases via .user / .pass', function(done){
    releases({
      user: process.env.USER,
      pass: process.env.PASS,
      repo: 'segmentio/accounts'
    }, function(err, releases){
      if (err) return done(err);
      releases.should.not.be.empty;
      releases[0].should.have.property('name');
      releases[0].should.have.property('commit');
      done();
    });
  })

  it('should respond with public releases', function(done){
    releases({
      repo: 'visionmedia/debug'
    }, function(err, releases){
      if (err) return done(err);
      releases.should.not.be.empty;
      releases[0].should.have.property('name');
      releases[0].should.have.property('commit');
      done();
    });
  })
})