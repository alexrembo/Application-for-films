
'use strict';

const http = require('http');
const express = require('express');
const fs = require('fs');
const app = express();

(function initWebpack() {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack/common.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));
  app.use(require('body-parser').json())
  app.post('/movie/add', (req, res) => {  
    const str = req.body; 
    fs.readFile( __dirname + '/' + 'moviesbase.json', 'utf8', (err, data) => {
      data = JSON.parse( data );
      data.movies.push(str);
      console.log( data );
      fs.writeFile('moviesbase.json', JSON.stringify(data), err => {
        if (err) return console.log(err);
        console.log('Wrote!');
      });  
      res.end( JSON.stringify(data));
    });
  });
  app.post('/movie/add/file', (req, res) => {  
    const str = req.body; 
    console.log('Here');
    console.log(str);
    fs.readFile( __dirname + '/' + 'moviesbase.json', 'utf8', (err, data) => {
      data = JSON.parse( data );
      data.movies = str;
     // console.log( data );
      fs.writeFile('moviesbase.json', JSON.stringify(data), err => {
        if (err) return console.log(err);
        console.log('Wrote!');
      });  
      res.end( JSON.stringify(data));
    });
  });
  app.post('/movie/delete', (req, res) => {
    const str = req.body;
    fs.readFile( __dirname + '/' + 'moviesbase.json', 'utf8', (err, data) => {
      data = JSON.parse( data );
      for (let i = 0; i < data.movies.length; i++) {
        if (data.movies[i].Title == str.Title) {
          data.movies.splice(i, 1);
        }
        console.log(i);
      }
      console.log( data );
      fs.writeFile('moviesbase.json', JSON.stringify(data), err => {
        if (err) return console.log(err);
        console.log('Wrote!');
      });  
      res.end( JSON.stringify(data));
    });
  });
  app.use(express.static(__dirname + '/'));
})();

app.get(/.*/, function root(req, res) {
  res.sendFile(__dirname + '/index.html');
});

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, function onListen() {
  const address = server.address();
  console.log('Listening on: %j', address);
  console.log(' -> that probably means: http://localhost:%d', address.port);
});
