import express = require('express');
import https = require('https');
import userRepository = require('../../models/UserRepository');

module.exports = (() => {
    'use strict';
    var router = new express.Router();

    router.get('/res',(req: express.Request, res: express.Response) => {

        var code = req.query.code;
        var userId = req.query.state;

        var clientCode = 'xD2Ys2Q73vlB_RAoPFi_YsJRNFSl7Tv_';
        var secret = 'TPos39l95Im0vbgCpF3RoCt12xK88Tz55d80E8OOLOSY9IiE9D0CiS9FE461VQcA';
        //var redirectUrl = req.protocol + '://' + req.get('host') + '/moves/auth?uid' + userId;

        //https://api.moves-app.com/oauth/v1/access_token?grant_type=authorization_code&code=<code>&client_id=<client_id>&client_secret=<client_secret>&redirect_uri=<redirect_uri>

        // Get access token from auth token
        var options = {
            host: 'api.moves-app.com',
            path: '/oauth/v1/access_token?grant_type=authorization_code&code=' + code +
                  '&client_id=' + clientCode + '&client_secret=' + secret,
            method: 'POST'
        };

        https.request(options, resp => {
            var responseString = '';

            resp.setEncoding('utf-8');
            resp.on('data', chunk => {
                responseString += chunk;
            });

            resp.on('end', () => {
                var authResponse = JSON.parse(responseString);
                var repo = new userRepository();
                repo.updateCode(userId, authResponse.access_token, authResponse.user_id);
                res.render('moves_res', {});
            });

        }).end();
    });

    router.get('/auth',(req: express.Request, res: express.Response) => {
        res.render('moves_auth', {});
    });

    return router;
})();