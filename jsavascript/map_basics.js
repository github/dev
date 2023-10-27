// Creating a new Map
const myMap = new Map();

// Adding key-value pairs to the Map
myMap.set('name', 'John');
myMap.set('age', 30);
myMap.set('city', 'New York');

// Accessing values using keys
console.log(myMap.get('name')); // Output: 'John'
console.log(myMap.get('age'));  // Output: 30
console.log(myMap.get('city')); // Output: 'New York'

// Checking if a key exists in the Map
console.log(myMap.has('name')); // Output: true
console.log(myMap.has('gender')); // Output: false

// Deleting a key-value pair from the Map
myMap.delete('age');
console.log(myMap.has('age')); // Output: false

// Iterating through the keys and values in the Map
for (const [key, value] of myMap) {
    console.log(`${key}: ${value}`);
}
// Output:
// name: John
// city: New York

// Getting an array of keys or values from the Map
const keys = Array.from(myMap.keys());
const values = Array.from(myMap.values());
console.log(keys);   // Output: ['name', 'city']
console.log(values); // Output: ['John', 'New York']

// Getting the size of the Map
console.log(myMap.size); // Output: 2
