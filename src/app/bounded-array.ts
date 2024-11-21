
export class UserEvents {
    
}

export type MouseMove = {
    x:number,
    y:number,
    time:number
}

export class BoundedArray {
    maxSize: number;
    items: MouseMove[];
    constructor(maxSize = 50) {
        this.maxSize = maxSize;
        this.items = [];
    }

    push(element: MouseMove) {
        if (this.items.length >= this.maxSize) {
            this.items.shift(); // Remove the first element
        }
        this.items.push(element);
        return this.items.length;
    }

    // Additional useful methods
    get length() {
        return this.items.length;
    }

    get all() {
        return [...this.items]; // Return a copy to prevent direct manipulation
    }

    get first() {
        return this.items[0];
    }

    get last() {
        return this.items[this.items.length - 1];
    }

    clear() {
        this.items = [];
    }

    toArray() {
        return [...this.items];
    }
}

// Example usage:
const boundedArray = new BoundedArray(50);

// // Add elements
// for (let i = 1; i <= 55; i++) {
//     boundedArray.push(i);
// }

// console.log(boundedArray.length); // Output: 50
// console.log(boundedArray.first);  // Output: 6 (as 1-5 were removed)
// console.log(boundedArray.last);   // Output: 55