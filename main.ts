class Node<T> {
    value: T;
    nextNode: Node<T> | null;

    constructor(value: T, nextNode: Node<T> | null = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

class LinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private listSize: number;

    constructor(head: Node<T> | null = null) {
        this.head = head;
        this.tail = null;
        this.listSize = 0;
    }
}
