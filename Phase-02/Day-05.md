# 📅 Day 5: Loops — for, while, do-while

## 🎯 Goal of the Day

Today you will master **loops** — the mechanism that lets your program repeat actions. Loops are fundamental to every program, from simple counters to complex algorithms. By the end of today, you'll be comfortable with all three loop types and know when to use each one.

---

## 📚 Topics Covered

1. Why We Need Loops
2. `for` Loop — Syntax, Flow, Examples
3. `while` Loop — Syntax, Flow, Examples
4. `do-while` Loop — Syntax, Flow, Examples
5. Nested Loops
6. Loop Control — `break` and `continue`
7. Labeled break and continue
8. Infinite Loops
9. Pattern Printing (Interview Favorite!)

---

## ⏰ Hour-by-Hour Study Plan (6 Hours)

---

### 🕐 Hour 1: for Loop

#### Why Do We Need Loops?

Without loops, to print "Hello" 5 times:
```java
System.out.println("Hello");  // Copy-paste 5 times? What about 1000 times?
System.out.println("Hello");
System.out.println("Hello");
System.out.println("Hello");
System.out.println("Hello");
```

With a loop:
```java
for (int i = 0; i < 5; i++) {
    System.out.println("Hello");
}
```

**Real-Life Analogy:** A loop is like a **washing machine cycle** — it repeats the same steps (wash, rinse, spin) until the cycle count is complete.

#### for Loop Syntax

```
for (initialization; condition; update) {
    // code to repeat
}
```

```
┌────────────────┐
│ Initialization │ (runs once)
└───────┬────────┘
        ▼
┌───────────────┐     false
│   Condition   │──────────→ EXIT LOOP
└───────┬───────┘
        │ true
        ▼
┌───────────────┐
│  Loop Body    │
└───────┬───────┘
        ▼
┌───────────────┐
│    Update     │──→ (back to Condition)
└───────────────┘
```

```java
public class ForLoopDemo {
    public static void main(String[] args) {
        // Basic for loop — print 1 to 5
        System.out.println("Counting 1 to 5:");
        for (int i = 1; i <= 5; i++) {
            System.out.println("i = " + i);
        }

        // Dry Run:
        // i=1: 1<=5? true → print 1, i becomes 2
        // i=2: 2<=5? true → print 2, i becomes 3
        // i=3: 3<=5? true → print 3, i becomes 4
        // i=4: 4<=5? true → print 4, i becomes 5
        // i=5: 5<=5? true → print 5, i becomes 6
        // i=6: 6<=5? false → EXIT

        // Count down
        System.out.println("\nCountdown:");
        for (int i = 10; i >= 1; i--) {
            System.out.println(i);
        }

        // Print even numbers 2 to 20
        System.out.println("\nEven numbers 2-20:");
        for (int i = 2; i <= 20; i += 2) {
            System.out.print(i + " ");
        }
        System.out.println();

        // Sum of 1 to 100
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            sum += i;
        }
        System.out.println("\nSum of 1 to 100: " + sum); // 5050

        // Multiplication table
        int num = 7;
        System.out.println("\nMultiplication Table of " + num + ":");
        for (int i = 1; i <= 10; i++) {
            System.out.printf("%d × %d = %d%n", num, i, num * i);
        }
    }
}
```

#### Factorial Calculation

```java
import java.util.Scanner;

public class Factorial {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = scanner.nextInt();

        long factorial = 1;  // Use long — factorial grows fast!
        for (int i = 1; i <= n; i++) {
            factorial *= i;
        }

        System.out.println(n + "! = " + factorial);
        // 5! = 1 × 2 × 3 × 4 × 5 = 120

        // Time Complexity: O(n)
        // Space Complexity: O(1)

        scanner.close();
    }
}
```

---

### 🕑 Hour 2: while and do-while Loops

#### while Loop

**Use when:** You don't know in advance how many times to repeat.

**Analogy:** Like reading a book — "while there are pages left, keep reading."

```java
public class WhileDemo {
    public static void main(String[] args) {
        // Basic while loop
        int count = 1;
        while (count <= 5) {
            System.out.println("Count: " + count);
            count++;
        }

        // Sum of digits
        int number = 12345;
        int sum = 0;
        int temp = number;
        while (temp > 0) {
            int digit = temp % 10;    // Extract last digit
            sum += digit;             // Add to sum
            temp /= 10;              // Remove last digit
        }
        System.out.println("Sum of digits of " + number + ": " + sum); // 15

        // Dry Run for 12345:
        // temp=12345: digit=5, sum=5, temp=1234
        // temp=1234:  digit=4, sum=9, temp=123
        // temp=123:   digit=3, sum=12, temp=12
        // temp=12:    digit=2, sum=14, temp=1
        // temp=1:     digit=1, sum=15, temp=0
        // temp=0: condition false → EXIT
    }
}
```

#### Reverse a Number

```java
import java.util.Scanner;

public class ReverseNumber {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int number = scanner.nextInt();

        int reversed = 0;
        int temp = number;

        while (temp != 0) {
            int digit = temp % 10;
            reversed = reversed * 10 + digit;
            temp /= 10;
        }

        System.out.println("Original: " + number);
        System.out.println("Reversed: " + reversed);

        // Check palindrome
        if (number == reversed) {
            System.out.println(number + " is a palindrome! ✅");
        } else {
            System.out.println(number + " is NOT a palindrome ❌");
        }

        scanner.close();
    }
}
```

#### do-while Loop

**Key Difference:** Executes the body **at least once**, then checks the condition.

**Analogy:** Like a do-while is a restaurant — you eat first (do), then check if you're still hungry (while). You eat at least one plate!

```java
import java.util.Scanner;

public class DoWhileDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Menu-driven program — perfect use case for do-while!
        int choice;
        do {
            System.out.println("\n=== MENU ===");
            System.out.println("1. Say Hello");
            System.out.println("2. Say Goodbye");
            System.out.println("3. Exit");
            System.out.print("Choose: ");
            choice = scanner.nextInt();

            switch (choice) {
                case 1: System.out.println("Hello! 👋"); break;
                case 2: System.out.println("Goodbye! 👋"); break;
                case 3: System.out.println("Exiting..."); break;
                default: System.out.println("Invalid choice!");
            }
        } while (choice != 3);

        scanner.close();
    }
}
```

#### Comparison: for vs while vs do-while

| Aspect | for | while | do-while |
|--------|-----|-------|----------|
| Best for | Known iterations | Unknown iterations | At least one execution |
| Condition check | Before body | Before body | After body |
| Min executions | 0 | 0 | 1 |
| Example use | Counting, arrays | User input validation | Menu systems |

---

### 🕒 Hour 3: Nested Loops & Pattern Printing

#### Nested Loops

```java
public class NestedLoopDemo {
    public static void main(String[] args) {
        // Simple nested loop
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                System.out.print("(" + i + "," + j + ") ");
            }
            System.out.println();
        }
    }
}
```

**Output:**
```
(1,1) (1,2) (1,3) 
(2,1) (2,2) (2,3) 
(3,1) (3,2) (3,3) 
```

#### Pattern 1: Right Triangle

```java
// *
// * *
// * * *
// * * * *
// * * * * *

for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print("* ");
    }
    System.out.println();
}
```

#### Pattern 2: Inverted Triangle

```java
// * * * * *
// * * * *
// * * *
// * *
// *

for (int i = 5; i >= 1; i--) {
    for (int j = 1; j <= i; j++) {
        System.out.print("* ");
    }
    System.out.println();
}
```

#### Pattern 3: Number Triangle

```java
// 1
// 1 2
// 1 2 3
// 1 2 3 4
// 1 2 3 4 5

for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print(j + " ");
    }
    System.out.println();
}
```

#### Pattern 4: Pyramid

```java
//         *
//       * * *
//     * * * * *
//   * * * * * * *
// * * * * * * * * *

int n = 5;
for (int i = 1; i <= n; i++) {
    // Print spaces
    for (int j = 1; j <= n - i; j++) {
        System.out.print("  ");
    }
    // Print stars
    for (int j = 1; j <= 2 * i - 1; j++) {
        System.out.print("* ");
    }
    System.out.println();
}
```

---

### 🕓 Hour 4: break, continue & Labeled Statements

#### break — Exit the Loop Immediately

```java
public class BreakDemo {
    public static void main(String[] args) {
        // Find first number divisible by 7 between 50 and 100
        for (int i = 50; i <= 100; i++) {
            if (i % 7 == 0) {
                System.out.println("First number divisible by 7: " + i);
                break;  // Exit loop immediately
            }
        }

        // Search in array
        int[] numbers = {10, 25, 30, 45, 50};
        int target = 30;
        boolean found = false;
        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] == target) {
                System.out.println("Found " + target + " at index " + i);
                found = true;
                break;
            }
        }
        if (!found) {
            System.out.println(target + " not found!");
        }
    }
}
```

#### continue — Skip Current Iteration

```java
public class ContinueDemo {
    public static void main(String[] args) {
        // Print only odd numbers 1-20
        for (int i = 1; i <= 20; i++) {
            if (i % 2 == 0) {
                continue;  // Skip even numbers
            }
            System.out.print(i + " ");
        }
        System.out.println();
        // Output: 1 3 5 7 9 11 13 15 17 19

        // Skip multiples of 3
        for (int i = 1; i <= 15; i++) {
            if (i % 3 == 0) continue;
            System.out.print(i + " ");
        }
        System.out.println();
        // Output: 1 2 4 5 7 8 10 11 13 14
    }
}
```

#### Labeled break and continue

```java
public class LabeledDemo {
    public static void main(String[] args) {
        // Labeled break — break out of outer loop
        outer:
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= 5; j++) {
                if (i * j > 10) {
                    System.out.println("Breaking at i=" + i + ", j=" + j);
                    break outer;  // Breaks OUTER loop
                }
                System.out.print(i * j + "\t");
            }
            System.out.println();
        }
    }
}
```

---

### 🕔 Hour 5: Classic Loop Problems

#### Prime Number Checker

```java
import java.util.Scanner;

public class PrimeChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = scanner.nextInt();

        boolean isPrime = true;

        if (num <= 1) {
            isPrime = false;
        } else {
            for (int i = 2; i <= Math.sqrt(num); i++) {
                if (num % i == 0) {
                    isPrime = false;
                    break;
                }
            }
        }

        System.out.println(num + (isPrime ? " is Prime ✅" : " is NOT Prime ❌"));

        // Time Complexity: O(√n)
        scanner.close();
    }
}
```

#### Fibonacci Series

```java
public class Fibonacci {
    public static void main(String[] args) {
        int n = 10;  // Print first 10 Fibonacci numbers
        int a = 0, b = 1;

        System.out.print("Fibonacci: " + a + " " + b);
        for (int i = 2; i < n; i++) {
            int next = a + b;
            System.out.print(" " + next);
            a = b;
            b = next;
        }
        System.out.println();
        // Output: 0 1 1 2 3 5 8 13 21 34
    }
}
```

#### Armstrong Number

```java
// An Armstrong number: sum of cubes of digits equals the number
// 153 = 1³ + 5³ + 3³ = 1 + 125 + 27 = 153 ✅

public class ArmstrongChecker {
    public static void main(String[] args) {
        int number = 153;
        int original = number;
        int sum = 0;

        while (number > 0) {
            int digit = number % 10;
            sum += digit * digit * digit;
            number /= 10;
        }

        System.out.println(original + (sum == original ? " is Armstrong ✅" : " is NOT Armstrong ❌"));
    }
}
```

---

### 🕕 Hour 6: Revision & Practice

#### Summary Table

| Loop | Use When | Minimum Runs |
|------|----------|-------------|
| `for` | Count is known | 0 |
| `while` | Count is unknown | 0 |
| `do-while` | Must run at least once | 1 |
| `break` | Want to exit early | — |
| `continue` | Want to skip an iteration | — |

---

## 📝 After Study Session (Extra Practice)

### 10 Theory Questions

1. What are the three types of loops in Java?
2. What is the difference between `while` and `do-while`?
3. When should you use a `for` loop vs a `while` loop?
4. What does `break` do inside a loop?
5. What does `continue` do inside a loop?
6. What is an infinite loop? Give an example.
7. What is a labeled break?
8. What is the time complexity of a nested loop with two loops of n iterations?
9. Can you declare multiple variables in a for loop initialization?
10. What happens if you forget to update the loop variable in a while loop?

### 10 Coding Questions

1. Print all prime numbers between 1 and 100.
2. Print the first 20 Fibonacci numbers.
3. Check if a number is a palindrome using a loop.
4. Count the number of digits in a number.
5. Print the multiplication table (1-10) in a formatted table.
6. Calculate the power of a number (x^n) without using Math.pow().
7. Find GCD (Greatest Common Divisor) of two numbers using a loop.
8. Print diamond pattern with stars.
9. Print Floyd's triangle (1, 2 3, 4 5 6, ...).
10. Calculate sum of a series: 1 - 1/2 + 1/3 - 1/4 + ... + 1/n.

### 5 Debugging Questions

**Debug 1:** Infinite loop — what's wrong?
```java
int i = 0;
while (i < 5) {
    System.out.println(i);
    // Missing i++
}
```

**Debug 2:** Off-by-one error
```java
for (int i = 1; i < 5; i++) {
    System.out.println(i);  // Prints 1-4, not 1-5
}
```

**Debug 3:** Logic error
```java
int sum = 0;
for (int i = 1; i <= 10; i++);  // Semicolon makes empty loop!
{
    sum += i;  // 'i' doesn't exist here
}
```

**Debug 4:** Wrong loop type
```java
// Should use do-while but uses while
Scanner scanner = new Scanner(System.in);
int choice = 0;
while (choice != 5) {
    // Menu only shows if choice != 5, but choice starts at 0
}
```

**Debug 5:** Break misunderstanding
```java
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (j == 2) break;  // Only breaks inner loop!
        System.out.print(j);
    }
}
```

### 2 Assignments

**Assignment 1: Number System Converter**
Write a program that takes a decimal number and converts it to binary, octal, and hexadecimal using loops (not built-in methods).

**Assignment 2: Pattern Printer**
Print 5 different patterns: right triangle, inverted triangle, pyramid, diamond, and a number pattern of your choice.

### 1 Mini Project: Guess the Number Game

Build a game where the computer picks a random number (1-100) and the user guesses. Give hints ("Too high!", "Too low!") and count attempts.

---

## 📓 Daily Notes

### Common Mistakes
1. **Off-by-one errors** — `<` vs `<=` in loop condition
2. **Infinite loops** — forgetting to update loop variable
3. **Semicolon after for/while** — creates empty loop body
4. **Using wrong loop type** — for when while is better and vice versa

### Interview Points
- Time complexity of single loop: O(n), nested loop: O(n²)
- Know how to trace through loop execution (dry run)
- Pattern printing is very common in Java interviews
- Prime number, Fibonacci, palindrome are classic problems

---

## 📚 Resources

- [Java Loops - Oracle Tutorial](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html)
- [Loop Patterns - GeeksforGeeks](https://www.geeksforgeeks.org/programs-printing-pyramid-patterns-java/)
- [HackerRank Loops Challenge](https://www.hackerrank.com/challenges/java-loops-i/problem)

---

## ✅ End of Day Checklist

- [ ] I understood today's concepts
- [ ] I completed all coding examples
- [ ] I solved all practice questions
- [ ] I completed today's assignments
- [ ] I built the Guess the Number game
- [ ] I revised my notes
- [ ] I am ready for Day 6
