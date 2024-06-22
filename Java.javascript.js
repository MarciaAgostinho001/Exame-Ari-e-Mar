// script.js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let nodes = [];
let edges = [];
let treeRoot = null;
let queue = [];

// Função para adicionar um node
function addNode() {
    const node = {
        id: nodes.length + 1,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        edges: []
    };
    nodes.push(node);
    draw();
}

// Função para remover um node
function removeNode() {
    if (nodes.length > 0) {
        nodes.pop();
        edges = edges.filter(edge => edge.from !== node && edge.to !== node);
        draw();
    }
}

// Função para desenhar nodes e edges
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (const edge of edges) {
        ctx.beginPath();
        ctx.moveTo(edge.from.x, edge.from.y);
        ctx.lineTo(edge.to.x, edge.to.y);
        ctx.stroke();
    }

    for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.fillText(node.id, node.x - 5, node.y + 5);
    }
}

// Função para adicionar uma aresta (para grafos)
function addEdge() {
    const fromId = prompt('ID do node de origem:');
    const toId = prompt('ID do node de destino:');
    const fromNode = nodes.find(node => node.id == fromId);
    const toNode = nodes.find(node => node.id == toId);
    if (fromNode && toNode && fromNode !== toNode) {
        edges.push({ from: fromNode, to: toNode });
        fromNode.edges.push(toNode);
        toNode.edges.push(fromNode); // Para grafos não-direcionais
        draw();
    }
}

// Função para adicionar nodes em uma árvore binária
function addNodeToTree() {
    const value = parseInt(prompt('Valor do node:'));
    const node = { id: value, left: null, right: null, x: 0, y: 0 };
    if (!treeRoot) {
        node.x = canvas.width / 2;
        node.y = 50;
        treeRoot = node;
    } else {
        let current = treeRoot;
        while (true) {
            if (value < current.id) {
                if (current.left === null) {
                    node.x = current.x - 50;
                    node.y = current.y + 50;
                    current.left = node;
                    break;
                } else {
                    current = current.left;
                }
            } else {
                if (current.right === null) {
                    node.x = current.x + 50;
                    node.y = current.y + 50;
                    current.right = node;
                    break;
                } else {
                    current = current.right;
                }
            }
        }
    }
    nodes.push(node);
    drawTree(treeRoot);
}

// Função para desenhar a árvore binária
function drawTree(node) {
    if (!node) return;
    
    if (node.left) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.left.x, node.left.y);
        ctx.stroke();
    }
    
    if (node.right) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.right.x, node.right.y);
        ctx.stroke();
    }
    
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.fillText(node.id, node.x - 5, node.y + 5);
    
    drawTree(node.left);
    drawTree(node.right);
}

// Função para enfileirar um node (para fila)
function enqueue() {
    const value = prompt('Valor do node a enfileirar:');
    const node = { id: value, x: 50 + queue.length * 50, y: canvas.height - 50 };
    queue.push(node);
    drawQueue();
}

// Função para desenfileirar um node
function dequeue() {
    if (queue.length > 0) {
        queue.shift();
        for (let i = 0; i < queue.length; i++) {
            queue[i].x = 50 + i * 50;
        }
        drawQueue();
    }
}

// Função para desenhar a fila
function drawQueue() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (const node of queue) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.fillText(node.id, node.x - 5, node.y + 5);
    }
}

// Função para simular o comportamento dos nodes (exemplo de fila)
function simulate() {
    // Adicione a lógica específica de simulação aqui, como BFS, DFS, etc.
    alert('Simulação em andamento...');
    draw();
}