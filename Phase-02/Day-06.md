# 📅 Day 6: Arrays — 1D and 2D

## 🎯 Goal of the Day

Today you will master **arrays** — the first data structure you'll learn. Arrays let you store multiple values of the same type in a single variable. By the end of today, you'll declare, initialize, traverse, search, and sort arrays confidently.

---

## 📚 Topics Covered

1. What are Arrays? Why Arrays?
2. 1D Array — Declaration, Initialization, Access
3. Array Traversal (for loop, for-each)
4. Common Array Operations (search, find max/min, reverse)
5. 2D Arrays (Matrices)
6. Arrays Class Utility Methods
7. Array Limitations & Common Pitfalls

---

## ⏰ Hour-by-Hour Study Plan (6 Hours)

---

### 🕐 Hour 1: 1D Array Fundamentals

#### What is an Array?

An array is a **fixed-size, ordered collection** of elements of the **same data type**, stored in **contiguous memory locations**.

**Real-Life Analogy:** An array is like a **row of lockers** in a school:
- All lockers are the same size (same data type)
- Each locker has a number (index)
- The number of lockers is fixed when installed (fixed size)
- You access lockers by their number (index-based access)

#### Array Declaration and Initialization

```java
public class ArrayBasics {
    public static void main(String[] args) {
        // Method 1: Declare, then initialize
        int[] numbers;              // Declaration
        numbers = new int[5];       // Allocate memory for 5 integers
        numbers[0] = 10;            // Assign values by index
        numbers[1] = 20;
        numbers[2] = 30;
        numbers[3] = 40;
        numbers[4] = 50;

        // Method 2: Declare and initialize in one line
        int[] scores = new int[]{85, 90, 78, 92, 88};

        // Method 3: Shorthand (most common)
        int[] marks = {95, 85, 75, 65, 55};

        // Array properties
        System.out.println("Length: " + marks.length);     // 5
        System.out.println("First element: " + marks[0]);  // 95
        System.out.println("Last element: " + marks[marks.length - 1]); // 55

        // Default values
        int[] defaults = new int[3];
        System.out.println(defaults[0]); // 0 (default for int)

        boolean[] bools = new boolean[3];
        System.out.println(bools[0]); // false (default for boolean)

        String[] strings = new String[3];
        System.out.println(strings[0]); // null (default for reference types)
    }
}
```

**Memory Layout:**

```
Index:    [0]   [1]   [2]   [3]   [4]
Value:    | 95 | 85  | 75  | 65  | 55 |
Address:  100   104   108   112   116  (each int = 4 bytes)
```

#### ⚠️ Important Rules
- Array index starts at **0**, not 1
- Last index is `array.length - 1`
- Accessing invalid index throws `ArrayIndexOutOfBoundsException`
- Array size is **fixed** after creation — cannot grow or shrink

---

### 🕑 Hour 2: Array Traversal & Operations

#### Traversing Arrays

```java
public class ArrayTraversal {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};

        // Method 1: Traditional for loop
        System.out.println("Using for loop:");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + " ");
        }
        System.out.println();

        // Method 2: Enhanced for-each loop (Java 5+)
        System.out.println("Using for-each:");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();

        // When to use which?
        // for loop: when you need the index
        // for-each: when you just need the values
    }
}
```

#### Finding Maximum and Minimum

```java
public class MaxMinArray {
    public static void main(String[] args) {
        int[] numbers = {34, 12, 78, 56, 23, 89, 45};

        int max = numbers[0];
        int min = numbers[0];

        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
            if (numbers[i] < min) {
                min = numbers[i];
            }
        }

        System.out.println("Maximum: " + max); // 89
        System.out.println("Minimum: " + min); // 12

        // Time Complexity: O(n)
        // Space Complexity: O(1)
    }
}
```

#### Linear Search

```java
public class LinearSearch {
    public static void main(String[] args) {
        int[] arr = {10, 25, 30, 45, 50, 65, 70};
        int target = 45;
        int index = -1;

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                index = i;
                break;
            }
        }

        if (index != -1) {
            System.out.println("Found " + target + " at index " + index);
        } else {
            System.out.println(target + " not found!");
        }

        // Time Complexity: O(n)
    }
}
```

#### Reverse an Array

```java
public class ReverseArray {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};

        // Two-pointer approach
        int left = 0, right = arr.length - 1;
        while (left < right) {
            // Swap
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }

        System.out.print("Reversed: ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        // Output: 5 4 3 2 1
    }
}
```

---

### 🕒 Hour 3: Sorting & Arrays Utility Class

#### Bubble Sort

```java
public class BubbleSort {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};

        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }

        System.out.print("Sorted: ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        // Output: 11 12 22 25 34 64 90
        // Time Complexity: O(n²)
    }
}
```

#### Arrays Utility Class

```java
import java.util.Arrays;

public class ArraysUtilDemo {
    public static void main(String[] args) {
        int[] arr = {50, 20, 40, 10, 30};

        // Sort
        Arrays.sort(arr);
        System.out.println("Sorted: " + Arrays.toString(arr));
        // [10, 20, 30, 40, 50]

        // Binary Search (array MUST be sorted first)
        int index = Arrays.binarySearch(arr, 30);
        System.out.println("30 found at index: " + index); // 2

        // Fill
        int[] filled = new int[5];
        Arrays.fill(filled, 7);
        System.out.println("Filled: " + Arrays.toString(filled));
        // [7, 7, 7, 7, 7]

        // Copy
        int[] copy = Arrays.copyOf(arr, 3);
        System.out.println("Copy (first 3): " + Arrays.toString(copy));
        // [10, 20, 30]

        // Equals
        int[] arr1 = {1, 2, 3};
        int[] arr2 = {1, 2, 3};
        System.out.println("Arrays equal: " + Arrays.equals(arr1, arr2)); // true
    }
}
```

---

### 🕓 Hour 4: 2D Arrays (Matrices)

#### 2D Array Basics

**Analogy:** A 2D array is like a **spreadsheet** — it has rows and columns.

```java
public class TwoDArrayDemo {
    public static void main(String[] args) {
        // Declaration
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        // Access elements: matrix[row][column]
        System.out.println("Element at [1][2]: " + matrix[1][2]); // 6

        // Traverse 2D array
        System.out.println("Matrix:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.printf("%4d", matrix[i][j]);
            }
            System.out.println();
        }

        // Using for-each
        System.out.println("\nUsing for-each:");
        for (int[] row : matrix) {
            for (int val : row) {
                System.out.printf("%4d", val);
            }
            System.out.println();
        }

        // Dimensions
        System.out.println("Rows: " + matrix.length);        // 3
        System.out.println("Columns: " + matrix[0].length);  // 3
    }
}
```

#### Matrix Operations

```java
public class MatrixOperations {
    public static void main(String[] args) {
        int[][] a = {{1, 2}, {3, 4}};
        int[][] b = {{5, 6}, {7, 8}};
        int rows = 2, cols = 2;

        // Matrix Addition
        int[][] sum = new int[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                sum[i][j] = a[i][j] + b[i][j];
            }
        }

        System.out.println("Matrix Sum:");
        for (int[] row : sum) {
            for (int val : row) {
                System.out.printf("%4d", val);
            }
            System.out.println();
        }
        // Output: 6  8
        //        10 12

        // Transpose
        int[][] transpose = new int[cols][rows];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                transpose[j][i] = a[i][j];
            }
        }

        System.out.println("\nTranspose of A:");
        for (int[] row : transpose) {
            for (int val : row) {
                System.out.printf("%4d", val);
            }
            System.out.println();
        }
    }
}
```

---

### 🕔 Hour 5: Jagged Arrays & Common Patterns

#### Jagged Arrays (Ragged Arrays)

Rows can have **different lengths**.

```java
public class JaggedArrayDemo {
    public static void main(String[] args) {
        // Each row has different number of columns
        int[][] jagged = new int[3][];
        jagged[0] = new int[]{1, 2};
        jagged[1] = new int[]{3, 4, 5};
        jagged[2] = new int[]{6};

        for (int i = 0; i < jagged.length; i++) {
            System.out.print("Row " + i + ": ");
            for (int j = 0; j < jagged[i].length; j++) {
                System.out.print(jagged[i][j] + " ");
            }
            System.out.println();
        }
    }
}
```

#### Passing Arrays to Methods

```java
public class ArrayMethods {
    // Method that takes an array and returns the sum
    static int sum(int[] arr) {
        int total = 0;
        for (int num : arr) {
            total += num;
        }
        return total;
    }

    // Method that modifies an array (arrays are pass-by-reference!)
    static void doubleValues(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            arr[i] *= 2;
        }
    }

    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};

        System.out.println("Sum: " + sum(numbers)); // 150

        doubleValues(numbers); // Modifies original array!
        System.out.println("Doubled: " + java.util.Arrays.toString(numbers));
        // [20, 40, 60, 80, 100]
    }
}
```

---

### 🕕 Hour 6: Revision & Mini Exercises

#### Key Takeaways
- Arrays are fixed-size, zero-indexed
- Use `for` loop when you need index, `for-each` when you don't
- `Arrays` utility class for sort, search, copy, fill
- 2D arrays = array of arrays
- Arrays are passed by reference to methods

---

## 📝 After Study Session (Extra Practice)

### 10 Theory Questions

1. What is an array? What are its advantages and disadvantages?
2. What is the default value of elements in an int array? String array?
3. What is `ArrayIndexOutOfBoundsException`?
4. What is the difference between `for` loop and `for-each` loop for arrays?
5. What is a 2D array? How is it stored in memory?
6. What is a jagged array?
7. Are arrays in Java objects?
8. Can you change the size of an array after creation?
9. What is the time complexity of accessing an element by index?
10. What is the difference between `Arrays.sort()` and bubble sort?

### 10 Coding Questions

1. Find the second largest element in an array.
2. Remove duplicates from a sorted array.
3. Rotate an array by k positions.
4. Find the frequency of each element in an array.
5. Merge two sorted arrays into one sorted array.
6. Check if an array is a palindrome.
7. Find the missing number from 1 to n in an array.
8. Move all zeros to the end of the array.
9. Find the sum of diagonal elements of a matrix.
10. Multiply two matrices.

### 5 Debugging Questions

**Debug 1:**
```java
int[] arr = new int[5];
arr[5] = 10;  // What's wrong?
```
*Fix: Index 5 is out of bounds. Max index is 4.*

**Debug 2:**
```java
int[] arr = {1, 2, 3};
System.out.println(arr);  // Prints weird output like [I@1b6d3586
```
*Fix: Use `Arrays.toString(arr)` to print array contents.*

**Debug 3:**
```java
int[] a = {1, 2, 3};
int[] b = a;
b[0] = 99;
System.out.println(a[0]);  // What prints?
```
*Answer: 99. Both a and b reference the same array!*

**Debug 4:**
```java
int[] arr = {5, 3, 1, 4, 2};
int index = Arrays.binarySearch(arr, 3);  // Wrong result?
```
*Fix: Array must be sorted before binary search!*

**Debug 5:**
```java
int[][] matrix = new int[3][3];
System.out.println(matrix.length);     // 3
System.out.println(matrix[0].length);  // 3
System.out.println(matrix.length());   // What's wrong?
```
*Fix: `length` is a field, not a method. No parentheses!*

### 2 Assignments

**Assignment 1: Student Grade Analyzer**
Create a program that stores marks of 10 students in an array, calculates average, finds highest/lowest marks, counts students above average, and displays results.

**Assignment 2: Tic-Tac-Toe Board**
Create a 3x3 2D array representing a tic-tac-toe board. Print the board, let users place X or O by entering row and column, and check for a winner.

---

## 📓 Daily Notes

### Common Mistakes
1. **Off-by-one with array index** — Remember: 0 to length-1
2. **Printing array directly** — Use `Arrays.toString()`
3. **Confusing length (field) vs length() (method)** — Arrays use `.length`, Strings use `.length()`
4. **Not sorting before binary search**
5. **Shallow copy confusion** — `b = a` copies reference, not values

### Interview Points
- Array access is O(1) — constant time
- Linear search is O(n), binary search is O(log n)
- Arrays are stored on the heap (reference type)
- `ArrayIndexOutOfBoundsException` is very common in interviews

---

## 📚 Resources

- [Java Arrays - Oracle](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html)
- [Arrays Class - Oracle](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Arrays.html)
- [Array Problems - LeetCode](https://leetcode.com/tag/array/)

---

## ✅ End of Day Checklist

- [ ] I understood today's concepts
- [ ] I completed all coding examples
- [ ] I solved all practice questions
- [ ] I completed today's assignments
- [ ] I revised my notes
- [ ] I am ready for Day 7
