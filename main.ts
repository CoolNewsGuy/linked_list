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

    prepend(value: T): void {
        this.listSize += 1;
        const newNode = new Node(value);

        [newNode.nextNode, this.listHead] = [this.listHead, newNode];
    }

    size(): number {
        return this.listSize;
    }

    head(): Node<T> | null {
        return this.listHead;
    }

    tail(): Node<T> | null {
        return this.listTail;
    }

    at(index: number): Node<T> | null {
        let i = 0;
        let headCopy = this.listHead;

        while (i < index && headCopy !== null) {
            headCopy = headCopy.nextNode;

            i += 1;
        }

        return headCopy;
    }

    pop(): void {
        if (this.listSize === 1) {
            this.listHead = null;
            this.listSize = 0;
        }

        this.listTail = this.at(this.listSize - 2);

        if (this.listTail !== null) {
            this.listTail.nextNode = null;
            this.listSize -= 1;
        }
    }

    contains(value: T): boolean {
        let headCopy = this.listHead;

        while (headCopy !== null) {
            if (headCopy.value === value) {
                return true;
            }

            headCopy = headCopy.nextNode;
        }

        return false;
    }
}
