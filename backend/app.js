/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */
// import {api} from '../src/services/api'
const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
let db = null;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');


// const api = require('../src/services/api')

const client_id = '8bdaab5d6d8a4c2eae42c9d6e0dc7db1'; // Your client id
const client_secret = 'ddcb1c4af3384ca2a2a27b2d12393e2f'; // Your secret
// const redirect_uri = 'https://playlists-kentaraz355962.codeanyapp.com/callback'
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use((req, res, next) => { //doesn't send response just adjusts it
    res.header("Access-Control-Allow-Origin", '*') //* to give access to any origin
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization" //to give access to all the headers provided
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //to give access to all the methods provided
        return res.status(200).json({});
    }
    next(); //so that other routes can take over
})

app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'streaming web-playback user-read-birthdate user-read-playback-state user-read-currently-playing user-modify-playback-state user-read-private user-read-email playlist-read-private playlist-modify-public app-remote-control user-follow-modify user-follow-read user-top-read user-read-recently-played user-library-read user-library-modify';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

app.get('/callback', function(req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function(error, response, body) {
                    console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect('http://localhost:3000/callback?' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));

            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});

app.get('/refresh_token', function(req, res) {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            response.send({
                'access_token': access_token
            });
        }
    });
});

// =========================MUSIC-APP===================== //

// Insert playlist to DB

app.put('/insertplaylist/', function (req, res) {
    delete req.body._id
    let queryUpdate = db.collection('playlists').replaceOne({ id: req.body.id }, req.body, { upsert: true })
    // let queryInsert = db.collection('playlists').insertOne(req.body)
    queryUpdate
})

// Insert many playlists to DB

app.post('/insertplaylists/', function (req, res) {
    let queryUpdate = db.collection('playlists').insertMany(req.body)
    // let queryInsert = db.collection('playlists').insertOne(req.body)
    queryUpdate.then((res, err) => {
        console.log(res);
        console.log('success')
    })
})

// Get count of user playlists
app.get('/getuserplaylistscount/:userid', function(req, res) {
    let userId = req.params.userid
    db.collection('playlists').find({'owner.id': userId}).count(function(err, doc) {
        res.status(200)
        res.send(JSON.stringify(doc))
    })
})

// Get users playlists

app.get('/getplaylistsforuser/:userId/:quantity/:page', function(req, res){
    let userId = req.params.userId
    let quantity = parseInt(req.params.quantity)
    let page = req.params.page
    db.collection('playlists').find({'owner.id': userId}).skip((page-1)*quantity).limit(quantity).toArray(function(err, docs) {
        res.status(200);
        res.send(JSON.stringify(docs))
    })
})

// Get playlist by ID

app.get('/getplaylistdata/:playlistid', function(req, res) {
    let playlistId = req.params.playlistid
    db.collection('playlists').find({id: playlistId}).toArray(function(err, docs) {
        res.status(200)
        res.send(JSON.stringify(docs))
    })
})

app.get('/getplaylistbysearch/:userid/:searchword', function(req, res) {
    let userId = req.params.userid
    let searchWord = (req.params.searchword).toLowerCase()
    console.log(searchWord)
    db.collection('playlists').find({'owner.id': userId, 'searchName': new RegExp(searchWord)}).toArray(function(err, docs) {
        console.log(docs)
        res.status(200)
        res.send(JSON.stringify(docs))
    })
})

// Method to check if users Spotify playlists are already in DB
// app.get('/check', async function(req, res) {
//     let spotifyPlaylists = await api.getPlaylistsData()
//     let spotifyPlaylistsTracks = await api.getTracksData()
//     res.status(200)
//     res.send(JSON.stringify(spotifyPlaylists))
//     console.log(spotifyPlaylists, spotifyPlaylistsTracks)
// })


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'music-app';

// Create a new MongoClient
const client = new MongoClient(url);


// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db = client.db(dbName);
    app.listen(8888)
    //client.close();
});
// console.log('Listening on 8888');
// app.listen(8888);
