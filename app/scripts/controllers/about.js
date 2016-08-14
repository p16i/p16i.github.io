'use strict';
/* global myApp,_ */

myApp.controller('aboutController', function( $scope, $window, d3Service, $q, $http ) {
    var legends = [
        'beginner',
        'intermediate',
        'advanced',
        'expert'
    ].reverse();

    $scope.legends = legends;

    $scope.r = function(){ return 0; };

    $q.all( [d3Service.d3(), $http.get('data/skills-net.json') ] ).then(function(resolves){
        var d3 = resolves[0];
        var data = resolves[1].data;

            /* For node */
        var maxR = 10;
        var scLinear = d3.scale.linear()
            .domain([0, 4]) // Level of competence
            .range([3, maxR]);

        $scope.r = function(index){
            return scLinear(legends.length - index);
        };

        var w = document.getElementById('skills-net').offsetWidth;
        var h = document.getElementById('skills-net').offsetHeight;

        var labelDistance = 0;
        var vis = d3.select('#skills-net').select('svg');
        var nodes = [];
        var labelAnchors = [];
        var labelAnchorLinks = [];
        var links = [];

        /* Set up Legends */

        /* Set up data */
        nodes = data.nodes;
        links = data.links;
        _.each( nodes, function(n){
            labelAnchors.push({
                node: n
            });
            labelAnchors.push({
                node: n
            });
        });

        for(var i = 0; i < nodes.length; i++) {
            labelAnchorLinks.push({
                source: i * 2,
                target: i * 2 + 1,
                weight: 1
            });
        }

        var force = d3.layout.force().size([w, h])
            .nodes(nodes)
            .links(links)
            .gravity(1)
            .linkDistance(50)
            .charge(-3000)
            .linkStrength(function(x) {
                return x.weight * 10;
            });

        force.start();

        var force2 = d3.layout
            .force()
            .nodes(labelAnchors)
            .links(labelAnchorLinks)
            .gravity(0)
            .linkDistance(labelDistance)
            .linkStrength(8)
            .charge(-100)
            .size([w, h]);

        force2.start();

        var link = vis.selectAll('line.link')
            .data(links)
            .enter()
            .append('svg:line')
            .attr('class', 'link');

        var node = vis.selectAll('g.node').data(force.nodes()).enter().append('svg:g').attr('class', 'node');
        node.append('svg:circle').attr('r', function(d){
            return scLinear(d.competency);
        });
        node.call(force.drag);


        var anchorLink = vis
            .selectAll('line.anchorLink')
            .data(labelAnchorLinks);

        var anchorNode = vis.selectAll('g.anchorNode').data(force2.nodes()).enter().append('svg:g').attr('class', 'anchorNode');
        anchorNode.append('svg:circle').attr('r', 0).style('fill', '#FFF');
        anchorNode.append('svg:text').text(function(d, index) {
            return index % 2 === 0 ? '' : d.node.label;
        }).style('fill', 'black').style('font-family', 'Arial').style('font-size', 12);

        var updateLink = function() {
            this.attr('x1', function(d) {
                return d.source.x;
            }).attr('y1', function(d) {
                return d.source.y;
            }).attr('x2', function(d) {
                return d.target.x;
            }).attr('y2', function(d) {
                return d.target.y;
            });
        };

        var updateNode = function() {
            this.attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });

        };

        force.on('tick', function() {

            force2.start();

            node.call(updateNode);

            anchorNode.each(function(d, index) {
                if(index % 2 === 0) {
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
                    this.childNodes[1].setAttribute('transform', 'translate(' + shiftX + ',' + shiftY + ')');
                }
            });

            anchorNode.call(updateNode);

            link.call(updateLink);
            anchorLink.call(updateLink);

        });
    });
});
