let idx = 1;

export default class Node {
    constructor(data, parentNode, options = {}) {
        const {
            rootId = null,
            idField = "id",
            pidField = "pid",
            leafField = "leaf",
        } = options;

        // this.loading = false;
        this.root = !parentNode;
        // this.expanded = parentNode === rootId;
        // this.selected = false;
        this.relativeDepth = parentNode ? parentNode.relativeDepth + 1 : 0;

        this.id = data[idField];
        this.pid = data[pidField];
        this.leaf = data[leafField];
        this.data = data;

        if (this.id == null && this.id !== rootId) {
            this.id = `node_${idx++}`;
        }
    }

    // setExpanded(expanded) {
    //     this.expanded = expanded;
    // }

    // setSelected(selected) {
    //     this.selected = selected;
    // }
}
