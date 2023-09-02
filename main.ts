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
        if (index < 0) {
            if (Math.abs(index) > this.listSize) {
                return null;
            }

            return this.at(index + this.listSize);
        }

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

    find(value: T): number | null {
        let i = 0;
        let headCopy = this.listHead;

        while (headCopy !== null) {
            if (headCopy.value === value) {
                return i;
            }

            i += 1;
            headCopy = headCopy.nextNode;
        }

        return null;
    }

    toString(): string {
        let result = "";
        let headCopy = this.listHead;

        while (headCopy !== null) {
            result += `${headCopy.value} -> `;

            headCopy = headCopy.nextNode;
        }

        result += null;

        return result;
    }

    insertAt(value: T, index: number): void {
        if (index > this.listSize || index < 0) {
            return;
        }

        if (index === 0) {
            this.prepend(value);
            return;
        }

        if (index === this.listSize) {
            this.append(value);
            return;
        }

        this.listSize += 1;

        const nodeBeforeIndex = this.at(index - 1) as Node<T>;
        const newNode = new Node(value, nodeBeforeIndex.nextNode);

        nodeBeforeIndex.nextNode = newNode;
    }

    removeAt(index: number): void {
        if (index >= this.listSize) {
            return;
        }

        this.listSize -= 1;

        if (index === 0) {
            const nodeAfterHead = this.listHead?.nextNode as Node<T> | null;

            if (nodeAfterHead === null) {
                this.listHead = null;
                this.listTail = null;
                return;
            }

            this.listHead = nodeAfterHead;
            return;
        }

        const nodeBeforeIndex = this.at(index - 1) as Node<T>;
        const nodeAfterIndex = this.at(index + 1);

        if (nodeAfterIndex === null) {
            this.listTail = nodeBeforeIndex;
        }

        nodeBeforeIndex.nextNode = nodeAfterIndex;
    }

    [Symbol.iterator](): {
        next: () => { value: T; done: boolean } | { done: true };
    } {
        let index = 0;

        return {
            next: () => {
                if (index < this.listSize) {
                    const value = this.at(index++)?.value as T;

                    return {
                        value: value,
                        done: false,
                    };
                }
                return {
                    done: true,
                };
            },
        };
    }
}
