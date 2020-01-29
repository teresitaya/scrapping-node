var rp = require('request-promise');
  var $ = require('cheerio');
  var url = 'http://visas.migracion.gob.pa/SIVA/verif_citas/';
  rp(url).then(function(html){
    var cherioTable =$('table', html);
    var p = $('p', cherioTable[2]);
    var originalP = $('p', cherioTable[2]);
    p = p.toString();
    var empty = p.indexOf('&#xA0;');
    var target = p.indexOf('target');
    if(empty === -1 || target !== -1){
      var nodemailer = require('nodemailer');
      var smtpTransport = require('nodemailer-smtp-transport');
  let transport = nodemailer.createTransport(smtpTransport({
        host: 'smtp.sendgrid.net',
        port: 2525,
        auth: {
           user: 'user',
          pass: 'password'
        },
        connectionTimeout:5 * 60 * 1000, // 5 min
    }));
    const message = {
      from: 'no-reply@inflasoft.com', // Sender address
      to: 'user@gmail.com, user@hotmail.com',       // List of recipients
      subject: 'Important Email !!!!', // Subject line
      html: '<h1>Hello world !</h1>'+ originalP.toString()
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    }); 
    }
    else{
    console.log('No changes');
    }
    
  })
  .catch(function(err){
    //handle error
  });
