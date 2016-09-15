var Promise = require('bluebird');
var request = Promise.promisify(require("request"));
var querystring = require('querystring');
var _ = require('lodash');
var fs = require('fs');

require('dotenv').config()

var API_ENDPOINT = 'https://api.flickr.com/services/rest/';
var defaultParams = {
    method: 'flickr.photosets.getPhotos',
    per_page: 500,
    extras: 'url_s,url_m,url_o',
    format: 'json',
    nojsoncallback: 1
};

var DATAPATH = './data/gallery.json';

var albums = [
    {
        name: 'Lifestyle',
        id: '72157671543489895'
    },
    {
        name: 'Abstract',
        id: '72157671453437906'
    },
    {
        name: 'Places',
        id: '72157670749338322'
    },
    {
        name: 'Music & Festival',
        id: '72157670784624421'
    }
];

Promise.map( albums, function(album){
        var params = _.merge(
            defaultParams,
            {
                api_key: process.env.FLICKR_API_KEY,
                user_id: process.env.FLICKR_USER_ID,
                photoset_id: album.id
            }
        );

        var url = API_ENDPOINT + '?' + querystring.stringify(params);
        return request(url).then(function(response) {
            var data = JSON.parse(response.body);
            return  {
                name: album.name,
                photos: data.photoset.photo
            };
        });
    })
    .then(function(data){
        var prettyData = JSON.stringify(data, null, 4);
        fs.writeFile("./app/data/gallery.json", prettyData, function(err){
            if(err) {
                return console.log(err);
            }
            console.log("DONE!");
        });
    });
