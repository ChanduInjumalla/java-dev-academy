# 📅 Day 9: Recursion & Phase 2 Review

## 🎯 Goal of the Day

Today you will master **recursion** — a technique where a method calls itself. Recursion is fundamental to algorithms and a favorite topic in interviews. You'll also review everything from Phase 2 (Core Java) and solidify your understanding.

---

## 📚 Topics Covered

1. What is Recursion?
2. How Recursion Works — Call Stack
3. Base Case vs Recursive Case
4. Classic Recursion Problems
5. Recursion vs Iteration
6. Tail Recursion
7. Phase 2 Review & Practice

---

## ⏰ Hour-by-Hour Study Plan (6 Hours)

---

### 🕐 Hour 1: Recursion Fundamentals

#### What is Recursion?

**Recursion** is when a method calls **itself** to solve a smaller version of the same problem.

**Real-Life Analogy:** Russian nesting dolls (Matryoshka) — open one doll, find a smaller one inside, keep opening until you reach the smallest doll (base case).

```java
public class RecursionBasics {
    // Countdown using recursion
    static void countdown(int n) {
        if (n <= 0) {          // Base case — STOP condition
            System.out.println("Done!");
            return;
        }
        System.out.println(n);
        countdown(n - 1);      // Recursive call with smaller problem
    }

    // Factorial: n! = n × (n-1)!
    static long factorial(int n) {
        if (n <= 1) return 1;   // Base case
        return n * factorial(n - 1);  // Recursive case
    }

    public static void main(String[] args) {
        countdown(5);
        System.out.println("5! = " + factorial(5)); // 120
    }
}
```

#### How the Call Stack Works

```
factorial(5)
├── 5 * factorial(4)
│   ├── 4 * factorial(3)
│   │   ├── 3 * factorial(2)
│   │   │   ├── 2 * factorial(1)
│   │   │   │   └── returns 1      ← Base case
│   │   │   └── returns 2 * 1 = 2
│   │   └── returns 3 * 2 = 6
│   └── returns 4 * 6 = 24
└── returns 5 * 24 = 120
```

---

### 🕑 Hour 2: Classic Recursion Problems

#### Fibonacci Number

```java
static int fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
    // Time Complexity: O(2^n) — very slow!
    // Better to use iteration or memoization
}
```

#### Power Calculation

```java
static double power(double base, int exp) {
    if (exp == 0) return 1;
    if (exp < 0) return 1.0 / power(base, -exp);
    return base * power(base, exp - 1);
}
// power(2, 10) = 1024
```

#### Sum of Digits

```java
static int sumOfDigits(int n) {
    if (n == 0) return 0;
    return (n % 10) + sumOfDigits(n / 10);
}
// sumOfDigits(12345) = 15
```

#### String Reversal

```java
static String reverse(String str) {
    if (str.isEmpty()) return str;
    return reverse(str.substring(1)) + str.charAt(0);
}
// reverse("Hello") = "olleH"
```

---

### 🕒 Hour 3: Advanced Recursion

#### Tower of Hanoi

```java
static void towerOfHanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        System.out.println("Move disk 1 from " + from + " to " + to);
        return;
    }
    towerOfHanoi(n - 1, from, aux, to);
    System.out.println("Move disk " + n + " from " + from + " to " + to);
    towerOfHanoi(n - 1, aux, to, from);
}
// Time Complexity: O(2^n)
```

#### Binary Search (Recursive)

```java
static int binarySearch(int[] arr, int target, int low, int high) {
    if (low > high) return -1;  // Not found
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return binarySearch(arr, target, mid + 1, high);
    return binarySearch(arr, target, low, mid - 1);
    // Time Complexity: O(log n)
}
```

---

### 🕓 Hour 4: Recursion vs Iteration

| Aspect | Recursion | Iteration |
|--------|-----------|-----------|
| Approach | Calls itself | Uses loops |
| Memory | Uses call stack (more) | Uses loop variables (less) |
| Risk | Stack overflow | Infinite loop |
| Readability | More elegant for some problems | More straightforward |
| Performance | Often slower (overhead) | Usually faster |
| Best for | Trees, graphs, divide & conquer | Linear processing, counting |

```java
// Iteration is usually preferred for simple tasks
static long factorialIterative(int n) {
    long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

---

### 🕔 Hour 5: Phase 2 Comprehensive Review

Review all topics from Days 5-9:
- ✅ Loops (for, while, do-while, break, continue)
- ✅ Arrays (1D, 2D, operations, sorting)
- ✅ Strings (immutability, methods, StringBuilder)
- ✅ Methods (overloading, pass-by-value, varargs)
- ✅ Recursion (base case, call stack, classic problems)

#### Integration Exercise: Student Grade Manager

```java
import java.util.Scanner;
import java.util.Arrays;

public class StudentGradeManager {
    static double calculateAverage(int[] marks) {
        int sum = 0;
        for (int mark : marks) sum += mark;
        return (double) sum / marks.length;
    }

    static String getGrade(double avg) {
        if (avg >= 90) return "A+";
        if (avg >= 80) return "A";
        if (avg >= 70) return "B";
        if (avg >= 60) return "C";
        return "F";
    }

    static int findMax(int[] marks) {
        int max = marks[0];
        for (int m : marks) if (m > max) max = m;
        return max;
    }

    static int findMin(int[] marks) {
        int min = marks[0];
        for (int m : marks) if (m < min) min = m;
        return min;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Number of subjects: ");
        int n = scanner.nextInt();
        int[] marks = new int[n];

        for (int i = 0; i < n; i++) {
            System.out.print("Marks for Subject " + (i + 1) + ": ");
            marks[i] = scanner.nextInt();
        }

        double avg = calculateAverage(marks);
        System.out.println("\n=== REPORT CARD ===");
        System.out.println("Marks: " + Arrays.toString(marks));
        System.out.printf("Average: %.2f%n", avg);
        System.out.println("Grade: " + getGrade(avg));
        System.out.println("Highest: " + findMax(marks));
        System.out.println("Lowest: " + findMin(marks));

        scanner.close();
    }
}
```

---

### 🕕 Hour 6: Revision & Practice

Practice combining loops, arrays, strings, methods, and recursion.

---

## 📝 After Study Session (Extra Practice)

### 10 Theory Questions
1. What is recursion? What are its two essential parts?
2. What is a stack overflow? When does it happen in recursion?
3. What is the difference between recursion and iteration?
4. What is tail recursion?
5. What is the time complexity of recursive Fibonacci? How to improve it?
6-10. Review questions from Days 5-8.

### 10 Coding Questions
1. Write a recursive method to calculate power (x^n).
2. Write a recursive method to check if a string is a palindrome.
3. Write a recursive method to find GCD using Euclid's algorithm.
4. Write a recursive method to print numbers 1 to n without a loop.
5. Write a recursive method to count occurrences of a character in a string.
6. Solve Tower of Hanoi for n=4.
7. Write recursive binary search.
8. Write a recursive method to find the sum of an array.
9. Write a recursive method to print Fibonacci series up to n terms.
10. Write a recursive method to convert decimal to binary.

### 2 Assignments

**Assignment 1:** Implement merge sort using recursion.
**Assignment 2:** Build a recursive directory-like tree printer.

### 1 Mini Project: Math Quiz Game
Create a quiz game that generates random math problems, checks answers, tracks score, and uses methods for clean organization.

---

## ✅ End of Day Checklist

- [ ] I understand recursion and the call stack
- [ ] I can identify base case and recursive case
- [ ] I solved classic recursion problems
- [ ] I completed the Phase 2 review
- [ ] I am ready for Phase 3: OOP

---

> 🎉 **Phase 2 Complete!** You now know Core Java fundamentals. Tomorrow begins the most important phase — Object-Oriented Programming. Get excited!
