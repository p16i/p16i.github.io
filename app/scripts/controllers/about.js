'use strict';
/* global myApp */
/* global angular */

myApp.controller('aboutController', function( $scope, $window, d3Service ) {
  var legends = [
    "beginner",
    "intermediate",
    "advanced",
    "expert"
  ].reverse();

  $scope.legends = legends;

  d3Service.d3().then(function(d3) {
    var data = [
      { name: "Perl", level: 4 },
      { name: "Scala", level: 2 },
      { name: "Python", level: 4 }
    ];

    /* For node */
    var maxR = 10;
    var scLinear = d3.scale.linear()
    .domain([0, 4]) // Level of competence
    .range([3,maxR]);

//$scope.$apply(function(){
    $scope.r = function(i){
      return scLinear(legends.length - i);
    };
//});


    var w = document.getElementById("skills-net").offsetWidth;
    var h = document.getElementById("skills-net").offsetHeight;

    var labelDistance = 0;
    var vis = d3.select("#skills-net").select("svg");
    var nodes = [];
    var labelAnchors = [];
    var labelAnchorLinks = [];
    var links = [];

    /* Set up Legends */
    // vis.append("svg:ul")
    // .attr("class","legend")
    // .selectAll("li")
    // .data(legends)
    // .enter()
    // .append("li")
    // .text(function(d){
    //     return d;
    // });
    // .append("svg:circle")
    // .attr("r", function(d,i){
    //   console.log(d);
    //   console.log(i);
    //   return scLinear(i);
    // })
    // .attr("fill", "red")
    // .attr("transform", function(d,i){
    //     return "translate(0,"+ (-scLinear(i-1)*2 ) + ")";
    // })
    // .attr("class", "link");


    /* Set up data */
    for(var i = 0; i < 30; i++) {
      var node = {
        label : "node " + i
      };
      nodes.push(node);
      labelAnchors.push({
        node : node
      });
      labelAnchors.push({
        node : node
      });
    };

    for(var i = 0; i < nodes.length; i++) {
      for(var j = 0; j < i; j++) {
        if(Math.random() > .95)
        links.push({
          source : i,
          target : j,
          weight : Math.random()
        });
      }
      labelAnchorLinks.push({
        source : i * 2,
        target : i * 2 + 1,
        weight : 1
      });
    };

    var force = d3.layout.force().size([w, h])
    .nodes(nodes)
    .links(links)
    .gravity(1)
    .linkDistance(50)
    .charge(-3000)
    .linkStrength(function(x) {
      return x.weight * 10
    });


    force.start();

    var force2 = d3.layout.force().nodes(labelAnchors).links(labelAnchorLinks).gravity(0).linkDistance(0).linkStrength(8).charge(-100).size([w, h]);
    force2.start();

    var link = vis.selectAll("line.link")
    .data(links)
    .enter()
    .append("svg:line")
    .attr("class", "link");

    var node = vis.selectAll("g.node").data(force.nodes()).enter().append("svg:g").attr("class", "node");
    node.append("svg:circle").attr("r", function(){
      return Math.ceil( Math.random()*5+5 );
    });
    node.call(force.drag);


    var anchorLink = vis.selectAll("line.anchorLink").data(labelAnchorLinks)//.enter().append("svg:line").attr("class", "anchorLink").style("stroke", "#999");

    var anchorNode = vis.selectAll("g.anchorNode").data(force2.nodes()).enter().append("svg:g").attr("class", "anchorNode");
    anchorNode.append("svg:circle").attr("r", 0).style("fill", "#FFF");
    anchorNode.append("svg:text").text(function(d, i) {
      return i % 2 == 0 ? "" : d.node.label
    }).style("fill", "black").style("font-family", "Arial").style("font-size", 12);

    var updateLink = function() {
      this.attr("x1", function(d) {
        return d.source.x;
      }).attr("y1", function(d) {
        return d.source.y;
      }).attr("x2", function(d) {
        return d.target.x;
      }).attr("y2", function(d) {
        return d.target.y;
      });

    }

    var updateNode = function() {
      this.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    }


    force.on("tick", function() {

      force2.start();

      node.call(updateNode);

      anchorNode.each(function(d, i) {
        if(i % 2 == 0) {
          d.x = d.node.x;
          d.y = d.node.y;
        } else {
          var b = this.childNodes[1].getBBox();

          var diffX = d.x - d.node.x;
          var diffY = d.y - d.node.y;

          var dist = Math.sqrt(diffX * diffX + diffY * diffY);

          var shiftX = b.width * (diffX - dist) / (dist * 2);
          shiftX = Math.max(-b.width, Math.min(0, shiftX));
          var shiftY = 5;
          this.childNodes[1].setAttribute("transform", "translate(" + shiftX + "," + shiftY + ")");
        }
      });


      anchorNode.call(updateNode);

      link.call(updateLink);
      anchorLink.call(updateLink);

    });

    // d3 is the raw d3 object
    console.log("XXX");
  });
});
