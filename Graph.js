class Graph{
    constructor(num_nodes, players, ctx){
        // num_nodes needs to be evenly divisible by the number of players
        this.num_nodes = num_nodes;
        this.players = players;
        this.nodes = [];
        this.maxNeighbours = 3;
        this.canvasCtx = ctx;
        this.setUp();
        this.render();
    }

    setUp(){
        let neighbourNodes = [];
        for(let i = 0; i < this.num_nodes; i++){
            // this pointless spread on neighbourNodes is to deep copy it so the nodes
            // keep their node lists
            let newNode = new Node([...neighbourNodes], this.players[i % this.players.length], i);
            this.nodes.push(newNode);

            // neighbourNodes.push(newNode);
            // // ensure any node has only maxNeighbours neighbours, with a rolling
            // // list of neighbours
            // if (neighbourNodes.length > this.maxNeighbours) {
            //     neighbourNodes.shift();
            // }
        }
    }

    calculateNeighbours(){
        for (let i = 0; i < this.nodes.length; i++){
            let currentNode = this.nodes[i];

            let neighbourNodes = [];
            for (let k = 0; k < this.nodes.length; k++){
                if (Math.abs(this.nodes[k].x - currentNode.x) <= 70 || Math.abs(this.nodes[k].y - currentNode.y) <= 70) {
                    neighbourNodes.push(this.nodes[k]);
                }
            }
            // neighbourNodes is everything within 70 of the node

            // make sure link is both ways
            for (let j = 0; j < neighbourNodes.length; j++) {
                let neighbour = neighbourNodes[j];
                neighbour.neighbours.push(currentNode);

                // if this would push us over maxNeighbours, we ought not to
                // make the link in the first place
                // if (neighbour.neighbours.length > this.maxNeighbours) {
                //     neighbour.neighbours.shift();
                // }
            }

        }

    }

    render(){
        let x = 70;
        let y = 70;
        let rowCount = 0;
        for (let i = 0; i < this.nodes.length; i++) {
            let currentNode = this.nodes[i];
            this.canvasCtx.fillStyle = 'rgb(200,0,0)';
            this.canvasCtx.moveTo(x, y);
            this.canvasCtx.arc(x, y, 10, 0, Math.PI * 2);
            currentNode.x = x;
            currentNode.y = y;

            x += 70;
            rowCount++;
            if (rowCount > 4) {
                y += 70;
                x = 70;
                rowCount = 0;
            };

            this.canvasCtx.fill();
        }

        this.calculateNeighbours();

        for (let k = 0; k < this.nodes.length; k++) {
            let currentNode = this.nodes[k];

            for (let l = 0; l < currentNode.neighbours.length; l++){
                let currentNeighbour = currentNode.neighbours[l];
                this.canvasCtx.beginPath();
                this.canvasCtx.moveTo(currentNode.x, currentNode.y);
                this.canvasCtx.lineTo(currentNeighbour.x, currentNeighbour.y);
                this.canvasCtx.closePath();
                this.canvasCtx.stroke();
            }
        }
    }

    // toString(){
    //     return `Graph(${this.num_nodes}, ${this.players}, ${this.nodes}, ${this.maxNeighbours})`;
    // }
}
