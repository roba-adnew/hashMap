function node(key, value, next = null) {
    return {key, value, next}
}

function linkedList() {
    let head = tail = node(null, null);
    let length = 0;

    function append(newNode) {
        length++;

        if (!head.key) {
            head = tail = newNode;
            return;
        }

        if (!tail.key) {
            head.next = tail = newNode;
            return;
        }

        tail.next = newNode;
        tail = newNode;
        return;
    }

    function prepend(key, value) {
        const newNode = node(key, value);
        length++;

        if(!head.value) {
            head = tail = newNode;
            return;
        }

        newNode.next = head;
        head = newNode;
        return;
    }

    function size() {
        return length;
    }

    function getHead() {
        return head;
    }

    function getTail() {
        return tail;
    }

    function at(index) {
        let searchNode = head;
        for (let i = 0; i < index ; i++) {
            searchNode = searchNode.next;
        }

        return searchNode;
    }

    function pop() {
        if (!head.value) {
            return;
        }

        length--;
        if (length === 1) {
            head = tail = null;
            return;
        }

        const oldTail = tail;
        const secondToLast = at(length);
        secondToLast.next = null;
        tail = secondToLast;
        return oldTail;
    }

    function contains(key) {
        if (!head.key || head.key === null) {
            return false;
        }

        let searchNode = head;
        for (let i = 0; i < length ; i++) {
            if (searchNode.key === key) {
                break;
            }
            searchNode = searchNode.next;
        }

        if (searchNode.key === key) {
            return true;
        }
        else {
            return false;
        }
    }

    function findIndex(key) {
        if (!head.key) {
            return null;
        }

        let searchNode = head;
        for (let i = 0; i < length; i++) {
            if (searchNode.key === key) {
                return i;
            }
            searchNode = searchNode.next;
        }

        return null;
    }

    function findValue(key) {
        if (!head.key) {
            return null;
        }

        let searchNode = head;
        for (let i = 0; i < length; i++) {
            if (searchNode.key === key) {
                return searchNode.value;
            }
            searchNode = searchNode.next;
        }

        return null;
    }

    function toString() {
        let nodeString = '';
        let searchNode = head;

        for (let i = 0; i < length; i++) {
            if (searchNode.value) {
                nodeString += "( " + searchNode.value + " ) -> ";
            }
            else {
                break;
            }
            searchNode = searchNode.next;
        }
        nodeString += "null";
        console.log(nodeString);
        return;
    }

    function removeAt(index) {
        if (!head.value || index >= length) {
            return;
        }

        length--;

        if (length === 0) {
            head = tail = node(null, null);
            return;
        }

        if (index === 0) {
            head = head.next;
            return;
        }

        if (index === length - 1) {
            pop();
            return;
        }

        let priorNode = at(index - 1);
        let currentNode = at(index);

        priorNode.next = currentNode.next;
        return;
    }

    function clear() {
        head = tail = node(null, null);
        length = 0;
        return;
    }

    return { append, prepend, size, getHead, getTail, at, pop, contains, findIndex, findValue, toString, removeAt, clear }
}

function hashMap() {

    const capacity = 100;
    let num_keys = 0;

    const buckets = Array(capacity);

    function hash(key) {
        let hashCode = 0;

        const primeNumber = 17;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        hashCode %= 100;
        return hashCode;
    }

    function set(key, value) {
        num_keys++;
        const newNode = node(key, value)
        const hashedKey = hash(key);

        if (hashedKey < 0 || hashedKey >= capacity) {
            throw new Error("Trying to access index out of bound");
        }

        if (!buckets[hashedKey]) {
            buckets[hashedKey] = linkedList();
        }

        buckets[hashedKey].append(newNode);
        return;
    }

    function get(key) {
        const hashedKey = hash(key);

        if (hashedKey < 0 || hashedKey >= capacity) {
            throw new Error("Trying to access index out of bound");
        }

        if (buckets[hashedKey]) {
            return buckets[hashedKey].findValue(key);
        }

        return null;
    }

    function has(key) {
        const hashedKey = hash(key);

        if (hashedKey < 0 || hashedKey >= capacity) {
            throw new Error("Trying to access index out of bound");
        }

        const keyExists = buckets[hashedKey].contains(key);
        return keyExists;
    }

    function remove(key) {
        if (has(key)) {
            const hashedKey = hash(key);
            const index = buckets[hashedKey].findIndex(key);
            buckets[hashedKey].removeAt(index);
            num_keys++;
            return true;
        }
        else {
            return false;
        }
    }

    function length() {
        return num_keys;
    }

    function clear() {
        for (let i = 0; i < capacity; i++) {
            if (buckets[i]) {
                buckets[i].clear();
            }
        }

        num_keys = 0;
        return;
    }

    function keys() {
        const keys = [];

        for (let i = 0; i < capacity; i++) {
            if (buckets[i]) {
                let searchNode = buckets[i].getHead();;
                do {
                    keys.push(searchNode.key);
                    searchNode = searchNode.next;
                }
                while (searchNode && searchNode.key !== null)
            }
        }

        return keys;
    }

    function values() {
        const values = [];

        for (let i = 0; i < capacity; i++) {
            if (buckets[i]) {
                let searchNode = buckets[i].getHead();;
                do {
                    values.push(searchNode.value);
                    searchNode = searchNode.next;
                }
                while (searchNode && searchNode.key !== null)
            }
        }

        return values;
    }

    function entries() {
        const entries = [];

        for (let i = 0; i < capacity; i++) {
            if (buckets[i]) {
                let searchNode = buckets[i].getHead();;
                do {
                    const entry = [searchNode.key, searchNode.value]
                    entries.push(entry);
                    searchNode = searchNode.next;
                }
                while (searchNode && searchNode.key !== null)
            }
        }

        return entries;
    }


    return { set, get, has, remove, length, clear, keys, values, entries }
}