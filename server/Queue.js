class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  // Add an element to the queue
  enqueue(data) {
    // Create a new node with the given data
    let node = new Node(data);
    // If head is null (there are no elements in the stack),
    // Set first and last to be the new node
    if (!this.first) {
      this.first = node;
      this.last = node;
    }
    // Otherwise
    else {
      // Set the last node of the queue's next to be the new node
      this.last.next = node;
      // Set the last to the new node
      this.last = node;
    }
    // Increase the length of the queue by one
    this.length++;
    // Although not completely necessary, enqueue methods usually return the length of the queue
    return this.length;
  }

  // Remove a node from the queue and return its data
  dequeue() {
    let data = null;
    // If there are no items in the queue
    if (!this.first) {
      // Do nothing
    }
    // If there is only one item in the queue
    else if (this.length == 1) {
      // Assign the first node's data to the data variable
      data = this.first.data;
      // Set the first and last node to null
      this.first = null;
      this.last = null;
      // Decrease the length of the queue by one
      this.length--;
    }
    // If there are multiple items in the queue
    else {
      // Assign the first node's data to the data variable
      data = this.first.data;
      // Assign the new first node to be first's next node
      this.first = this.first.next;
      // Decrease the length of the queue by one
      this.length--;
    }
    // Return the data
    return data;
  }
}

module.exports = {
  queue: Queue,
};
