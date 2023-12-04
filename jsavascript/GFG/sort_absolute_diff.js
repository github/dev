class Solution {
    //Function to sort the array according to difference with given number.
    sortABS(arr, N, K)
    {
        //your code here
        arr.sort((a,b) => {
            if (Math.abs(K-a) >= Math.abs(K-b)){
                return 1 
            }else{
                return -1
            }
        } )
        return arr
    }
}


/*

Sorting function  Notes

The `sort` method in JavaScript is used to arrange the elements of an array in a specific order. It can sort elements in ascending or descending order based on a comparison function that you provide. The comparison function determines the order in which elements should be sorted by returning a negative, zero, or positive value.

In simpler terms, the comparison function answers the question: "Should element A come before element B, or should element A come after element B in the sorted order?"

Here's how it works with some examples:

1. **Sorting Numbers in Ascending Order:**

   Let's say you have an array of numbers and you want to sort them in ascending order (from small to large).

   ```javascript
   const numbers = [5, 2, 8, 1, 9];
   numbers.sort((a, b) => a - b); // Compare A to B: If the result is negative, A comes before B.
   console.log(numbers); // Output: [1, 2, 5, 8, 9]
   ```

   The comparison function `(a, b) => a - b` compares each pair of numbers. If `a - b` is negative, it means `a` should come before `b`, and if it's positive, it means `a` should come after `b`.

2. **Sorting Strings in Ascending Order:**

   You can sort strings in ascending order using the default string comparison.

   ```javascript
   const fruits = ['banana', 'apple', 'cherry', 'date'];
   fruits.sort();
   console.log(fruits); // Output: ['apple', 'banana', 'cherry', 'date']
   ```

   JavaScript's default comparison for strings is based on their Unicode code points. It's similar to arranging words in a dictionary.

3. **Sorting in Descending Order:**

   If you want to sort elements in descending order (from large to small), you can reverse the order in the comparison function.

   ```javascript
   const numbers = [5, 2, 8, 1, 9];
   numbers.sort((a, b) => b - a); // Compare B to A: If the result is negative, B comes before A.
   console.log(numbers); // Output: [9, 8, 5, 2, 1]
   ```

   In this case, `b - a` means that `b` should come before `a` if the result is negative.

4. **Custom Sorting:**

   You can use a custom comparison function to sort in more complex ways. For example, sorting objects by a specific property:

   ```javascript
   const people = [
     { name: 'Alice', age: 28 },
     { name: 'Bob', age: 22 },
     { name: 'Charlie', age: 30 },
   ];
   people.sort((a, b) => a.age - b.age); // Sort people by age.
   console.log(people);
   ```

   Here, the comparison function compares the `age` property of objects to sort them by age.

In summary, the `sort` method uses a comparison function to determine the order in which elements are sorted. The function returns a negative value to move elements earlier in the array, a positive value to move them later, and zero to keep their relative positions unchanged. This allows you to sort arrays in various ways, including numbers, strings, and custom objects.
*/