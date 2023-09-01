class Node<T> {
    value: T;
    nextNode: Node<T> | null;

    constructor(value: T, nextNode: Node<T> | null = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

class LinkedList<T> {
    private listHead: Node<T> | null;
    private listTail: Node<T> | null;
    private listSize: number;

    constructor(head: Node<T> | null = null) {
        this.listHead = head;
        this.listTail = null;
        this.listSize = 0;
    }

    append(value: T): void {
        this.listSize += 1;
        const newNode = new Node(value, null);

        if (this.listHead === null) {
            this.listHead = newNode;
            this.listTail = this.listHead;
            return;
        }

        let headCopy = this.listHead;

        while (headCopy.nextNode !== null) {
            headCopy = headCopy.nextNode;
        }

        headCopy.nextNode = newNode;
        this.listTail = headCopy.nextNode;
    }

    prepend(value: T) {
        this.listSize += 1;
        const newNode = new Node(value);

        [newNode.nextNode, this.listHead] = [this.listHead, newNode];
    }

    size(): number {
        return this.listSize;
    }

    head(): T | null {
        const headValue = this.listHead?.value;

        return headValue === undefined ? null : headValue;
    }

    tail(): T | null {
        const tailValue = this.listTail?.value;

        return tailValue === undefined ? null : tailValue;
    }
}
