class Graph{
    constructor(num_nodes, players, ctx){
        // num_nodes needs to be evenly divisible by the number of players
        this.num_nodes = num_nodes;
        this.players = players;
        this.nodes = [];
        this.canvasCtx = ctx;
        this.setUp();
        this.render();
    }

    setUp(){
        // make the list of nodes, without neighbours or positions
        for(let i = 0; i < this.num_nodes; i++){
            let newNode = new Node([], this.players[i % this.players.length], i);
            this.nodes.push(newNode);
        }
    }

    calculateNeighbours(){
        for (let i = 0; i < this.nodes.length; i++){
            let currentNode = this.nodes[i];

            let neighbourNodes = [];
            for (let k = 0; k < this.nodes.length; k++){
                if (this.distBetweenNodes(currentNode, this.nodes[k]) <= 100 && currentNode !== this.nodes[k]) {
                    neighbourNodes.push(this.nodes[k]);
                }
            }

            // make sure link is both ways
            for (let j = 0; j < neighbourNodes.length; j++) {
                let neighbour = neighbourNodes[j];
                neighbour.neighbours.push(currentNode);
            }

        }

    }
    
    distBetweenNodes(node, otherNode){
      let dist = Math.sqrt(Math.pow(Math.abs(node.x - otherNode.x), 2) + Math.pow(Math.abs(node.y - otherNode.y), 2));
      return dist;
    }
    
    render(){
        let x = 100;
        let y = 100;
        let rowCount = 0;
        let renderedNodes = [];
        let i = 0;
        let runCount = 0;
        while (this.nodes.length > renderedNodes.length && runCount < 100000) {
            let currentNode = this.nodes[i];
            let overlapping = false;
            currentNode.x = x;
            currentNode.y = y;
            
            for (let j = 0; j < renderedNodes.length; j++){
              let renderedNode = renderedNodes[j];
              let dist = this.distBetweenNodes(currentNode, renderedNode);
              if (dist < 20) { // node radius assumed to equal 10
                overlapping = true;
              }
            }
            
            if (!overlapping) {
              
              this.canvasCtx.fillStyle = 'rgb(200,0,0)';
              this.canvasCtx.moveTo(x, y);
              this.canvasCtx.arc(x, y, 10, 0, Math.PI * 2);
              
              x += Math.random() * 150;
              if (i % 2 == 0) {
                y += Math.random() * 20;
              } else {
                y -= Math.random() * 20;
              }
              
              rowCount++;
              if (rowCount > 4) {
                  y += Math.random() * 150;
                  x = Math.random() * 100;
                  rowCount = 0;
              };

              this.canvasCtx.fill();
              
              renderedNodes.push(currentNode);
              i++;
            }
            
            runCount++;

          
        }
        
        console.log(runCount);

        this.calculateNeighbours();

        for (let k = 0; k < renderedNodes.length; k++) {
            let currentNode = renderedNodes[k];

            for (let l = 0; l < currentNode.neighbours.length; l++){
                let currentNeighbour = currentNode.neighbours[l];
                if (renderedNodes.indexOf(currentNeighbour) !== -1) {
                  this.canvasCtx.beginPath();
                  this.canvasCtx.moveTo(currentNode.x, currentNode.y);
                  this.canvasCtx.lineTo(currentNeighbour.x, currentNeighbour.y);
                  this.canvasCtx.closePath();
                  this.canvasCtx.stroke();
                }
            }
        }
    }
}
