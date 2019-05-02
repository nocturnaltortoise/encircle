class Node {
    constructor(neighbours, player, name){
        this.neighbours = neighbours;
        this.player = player;
        this.dots = [];
        this.name = name;
        this.x = null;
        this.y = null;
    }

    // toString(){
    //     return `Node(${this.player}, ${this.neighbours}, ${this.dots})`;
    // }
}
