var fs = require('fs');
var saw = require('string-saw');
var _= require("lodash");

fs.readFile("skills-net.txt", "utf8", function(err, data){
    var d = _.map(data.split("\n"), function(line, index ){
        var $ = saw(line).split(/:/)
        var key = $.item(0).match(/\d\s(.+)/).first().trim().toString();

        var arr = $.item(1).replace(/\s{0,},\s{0,}/g,',')
            .trim()
            .split(",")
            .filter(function(a){
                return a;
            })
            .toArray();
        var connections = _.map( arr,function(item){
            var arr = [ key, item.trim() ];
            return arr.sort();
        });
        var node = {
            key : key,
            label: key,
            competency: $.item(0).match(/^(\d)/).first().toNumber(),
            index: index,
            connections: connections
        };
        return node
    });

    var nodes = _.filter(
        d, function(obj){ return obj.key != ''}
    );
    // console.log(nodes);

    skills = _.keyBy( nodes, 'key');

    var rels = _.chain(nodes).map(function(n){
             return n.connections
        })
        .flatten()
        .uniqBy(function(d){ return d.join("-") })
        .map(function(d){
            return { source: skills[d[0]].index, target: skills[d[1]].index, weight: 1  }
        })
        .value();



    var data = {
        nodes: nodes,
        links : rels
    };

    fs.writeFile("./app/data/skills-net.json", JSON.stringify(data), function(err){
        if(err) {
            return console.log(err);
        }
        console.log("DONE!");
    });
});
