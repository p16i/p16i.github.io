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
        name: 'Abstract',
        id: '72157671453437906'
    },
    {
        name: 'People',
        id: '72157671543489895'
    },
    {
        name: 'Places',
        id: '72157670749338322'
    },
    {
        name: 'Lectures',
        id: '72157700778858094'
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
        return Promise.map( data.photoset.photo, function(photo){
            var photoParams = _.merge(
                defaultParams,
                {
                    method: 'flickr.photos.getInfo',
                    api_key: process.env.FLICKR_API_KEY,
                    photo_id: photo.id,
                    secret: photo.secret
                }
            );
            var photoUrl = API_ENDPOINT + '?' + querystring.stringify(photoParams);
            return request(photoUrl).then(function(response){
                var data = JSON.parse(response.body);
                photo['description'] = data.photo.description._content;
                delete photo['secret'];

                return photo
            });
        }).then(function(photos){
            return  {
                name: album.name,
                photos: photos
            };
        });
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
