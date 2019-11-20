let idx = 1;

export default class Node {
    constructor(data, parentNode, options = {}, state = {}) {
        const {
            rootId = null,
            idField = "id",
            pidField = "pid",
            leafField = "leaf",
        } = options;
        const { selectedMap = {}, expandedMap = {} } = state;

        this.id = data[idField];
        this.pid = data[pidField];
        this.leaf = data[leafField];
        this.data = data;

        if (this.id == null && this.id !== rootId) {
            this.id = `node_${idx++}`;
        }

        this.loading = false;
        this.root = !parentNode;
        this.expanded = this.root ? true : expandedMap[this.id];
        this.selected = this.root ? false : selectedMap[this.id];
        this.depth = parentNode ? parentNode.depth + 1 : 0;
    }

    getId() {
        return this.id;
    }

    getDepth() {
        return this.depth;
    }

    setDepth(depth) {
        this.depth = depth;
    }

    getData() {
        return this.data;
    }

    isRoot() {
        return this.root;
    }

    isLeaf() {
        return this.leaf;
    }

    setExpanded(expanded) {
        this.expanded = expanded;
    }

    isExpanded() {
        return this.expanded;
    }

    setSelected(selected) {
        this.selected = selected;
    }

    isSelected() {
        return this.selected;
    }

    setLoading(loading) {
        this.loading = loading;
    }

    isLoading() {
        return this.loading;
    }
}
