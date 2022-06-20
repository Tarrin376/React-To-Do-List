export class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    getSuggestions(word) {
        const suggestedWords = new Set();
        word = word.toLowerCase();
        let node = this.root;

        for (let i = 0; i < word.length; i++) {
            let index = word[i].charCodeAt(0) - 97;
            if (node.children[index] == null) return suggestedWords;
            else node = node.children[index];
        }

        const dfs = (node) => {
            if (node == null) {
                return;
            }
            
            if (node.end) {
                suggestedWords.add(node.task);
            }

            for (let i = 0; i < 26; i++) {
                dfs(node.children[i]);
            }
        };
        
        dfs(node);
        return suggestedWords;
    }

    insertTask(task) {
        task = task.replace(/ /g, '');
        let node = this.root;

        for (let i = 0; i < task.length; i++) {
            let index = task[i].charCodeAt(0) - 97;
            if (node.children[index] == null) node.children[index] = new TrieNode();
            node = node.children[index];

            if (i === task.length - 1) {
                node.end = true;
                node.task = task;
            }
        }
    }
}

class TrieNode {
    constructor(task="") {
        this.children = new Array(26).fill(null);
        this.task = task;
        this.end = false;
    }
}
