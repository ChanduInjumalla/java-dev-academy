# 📅 Day 4: User Input & Control Flow (if-else, switch)

## 🎯 Goal of the Day

Today you will learn how to **take input from the user** using the `Scanner` class and make **decisions** in your programs using `if-else` and `switch` statements. By the end of today, you'll write interactive programs that respond differently based on user input.

---

## 📚 Topics Covered

1. Scanner Class — Reading User Input
2. if Statement
3. if-else Statement
4. if-else-if Ladder
5. Nested if-else
6. switch Statement
7. switch Expressions (Java 14+)
8. Best Practices for Control Flow

---

## ⏰ Hour-by-Hour Study Plan (6 Hours)

---

### 🕐 Hour 1: Scanner Class — Getting User Input

#### What is Scanner?

`Scanner` is a class in the `java.util` package that reads input from various sources (keyboard, files, strings).

**Real-Life Analogy:** Scanner is like a **receptionist** at a desk — you tell them what type of information you need (number, text), and they collect it from the visitor (user).

```java
import java.util.Scanner;  // MUST import this

public class ScannerDemo {
    public static void main(String[] args) {
        // Create Scanner object
        Scanner scanner = new Scanner(System.in);

        // Reading different types of input
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();     // Reads entire line

        System.out.print("Enter your age: ");
        int age = scanner.nextInt();          // Reads an integer

        System.out.print("Enter your GPA: ");
        double gpa = scanner.nextDouble();    // Reads a double

        System.out.println("\n--- Your Info ---");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("GPA: " + gpa);

        scanner.close();  // Always close the scanner
    }
}
```

#### Scanner Methods

| Method | Reads | Example Input |
|--------|-------|--------------|
| `nextInt()` | Integer | `42` |
| `nextLong()` | Long | `999999999` |
| `nextFloat()` | Float | `3.14` |
| `nextDouble()` | Double | `3.14159` |
| `nextBoolean()` | Boolean | `true` |
| `next()` | Single word (until space) | `Hello` |
| `nextLine()` | Entire line (until Enter) | `Hello World` |
| `nextByte()` | Byte | `100` |
| `nextShort()` | Short | `30000` |

#### ⚠️ The nextLine() Trap (VERY COMMON BUG!)

```java
import java.util.Scanner;

public class ScannerTrap {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter age: ");
        int age = scanner.nextInt();

        // ⚠️ BUG: nextInt() leaves a newline in the buffer
        // nextLine() reads that leftover newline instead of waiting for input!

        System.out.print("Enter name: ");
        String name = scanner.nextLine();  // SKIPPED! Gets empty string ""

        System.out.println("Age: " + age);
        System.out.println("Name: '" + name + "'"); // Empty!

        scanner.close();
    }
}
```

**Fix:** Add an extra `scanner.nextLine()` after `nextInt()` to consume the leftover newline:

```java
import java.util.Scanner;

public class ScannerFixed {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter age: ");
        int age = scanner.nextInt();
        scanner.nextLine();  // ✅ Consume leftover newline

        System.out.print("Enter name: ");
        String name = scanner.nextLine();  // Now works correctly!

        System.out.println("Age: " + age);
        System.out.println("Name: " + name);

        scanner.close();
    }
}
```

---

### 🕑 Hour 2: if and if-else Statements

#### Simple if Statement

```
    ┌─────────┐
    │condition │──── false ───→ (skip)
    └────┬─────┘
         │ true
         ▼
    ┌─────────┐
    │  code   │
    │  block  │
    └─────────┘
```

```java
public class IfDemo {
    public static void main(String[] args) {
        int age = 20;

        // Simple if
        if (age >= 18) {
            System.out.println("You are an adult.");
        }

        // Without braces (single statement — not recommended)
        if (age >= 18)
            System.out.println("Can vote!");

        // ⚠️ Why braces are important:
        if (age >= 18)
            System.out.println("Can vote!");
            System.out.println("Can drive!"); // This ALWAYS executes! Not inside if!
    }
}
```

**Best Practice:** ALWAYS use braces `{}`, even for single-line if statements.

#### if-else Statement

```
    ┌─────────┐
    │condition │
    └────┬─────┘
    true │     │ false
         ▼     ▼
    ┌──────┐ ┌──────┐
    │ if   │ │ else │
    │block │ │block │
    └──────┘ └──────┘
```

```java
import java.util.Scanner;

public class IfElseDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int num = scanner.nextInt();

        if (num % 2 == 0) {
            System.out.println(num + " is EVEN");
        } else {
            System.out.println(num + " is ODD");
        }

        // Voting eligibility
        System.out.print("Enter your age: ");
        int age = scanner.nextInt();

        if (age >= 18) {
            System.out.println("You are eligible to vote! 🗳️");
        } else {
            int yearsLeft = 18 - age;
            System.out.println("You cannot vote yet. Wait " + yearsLeft + " more years.");
        }

        scanner.close();
    }
}
```

---

### 🕒 Hour 3: if-else-if Ladder & Nested if

#### if-else-if Ladder

Used when you have **multiple conditions** to check in sequence.

```java
import java.util.Scanner;

public class GradeCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter your percentage: ");
        double percentage = scanner.nextDouble();

        String grade;

        if (percentage >= 90) {
            grade = "A+ (Outstanding!)";
        } else if (percentage >= 80) {
            grade = "A (Excellent!)";
        } else if (percentage >= 70) {
            grade = "B (Very Good)";
        } else if (percentage >= 60) {
            grade = "C (Good)";
        } else if (percentage >= 50) {
            grade = "D (Pass)";
        } else {
            grade = "F (Fail)";
        }

        System.out.println("Your grade: " + grade);

        scanner.close();
    }
}
```

#### Nested if-else

```java
import java.util.Scanner;

public class NestedIfDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter your age: ");
        int age = scanner.nextInt();

        System.out.print("Do you have a license? (true/false): ");
        boolean hasLicense = scanner.nextBoolean();

        if (age >= 18) {
            if (hasLicense) {
                System.out.println("✅ You can drive!");
            } else {
                System.out.println("⚠️ You're old enough, but get a license first!");
            }
        } else {
            System.out.println("❌ You're too young to drive.");
        }

        scanner.close();
    }
}
```

#### Real-World Example: Leap Year Checker

```java
import java.util.Scanner;

public class LeapYearChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a year: ");
        int year = scanner.nextInt();

        boolean isLeap;

        if (year % 400 == 0) {
            isLeap = true;
        } else if (year % 100 == 0) {
            isLeap = false;
        } else if (year % 4 == 0) {
            isLeap = true;
        } else {
            isLeap = false;
        }

        // One-liner alternative:
        // boolean isLeap = (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);

        System.out.println(year + (isLeap ? " is a Leap Year ✅" : " is NOT a Leap Year ❌"));

        scanner.close();
    }
}
```

---

### 🕓 Hour 4: switch Statement

#### What is switch?

`switch` is an alternative to long if-else-if chains when you're comparing a **single variable** against **multiple constant values**.

**Real-Life Analogy:** A switch statement is like a **TV remote** — you press a channel number, and it takes you directly to that channel. No need to flip through channels one by one (like if-else).

```java
import java.util.Scanner;

public class SwitchDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter day number (1-7): ");
        int day = scanner.nextInt();

        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            case 4:
                System.out.println("Thursday");
                break;
            case 5:
                System.out.println("Friday");
                break;
            case 6:
                System.out.println("Saturday 🎉");
                break;
            case 7:
                System.out.println("Sunday 🎉");
                break;
            default:
                System.out.println("Invalid day! Enter 1-7.");
        }

        scanner.close();
    }
}
```

#### ⚠️ The Fall-Through Problem

Without `break`, execution **falls through** to the next case:

```java
public class FallThroughDemo {
    public static void main(String[] args) {
        int day = 3;

        // WITHOUT break — fall-through!
        switch (day) {
            case 1: System.out.println("Monday");
            case 2: System.out.println("Tuesday");
            case 3: System.out.println("Wednesday");  // Starts here
            case 4: System.out.println("Thursday");    // Falls through!
            case 5: System.out.println("Friday");      // Falls through!
            default: System.out.println("Weekend");    // Falls through!
        }
        // Output: Wednesday, Thursday, Friday, Weekend
    }
}
```

#### Using Fall-Through Intentionally

```java
public class SwitchGrouping {
    public static void main(String[] args) {
        int month = 3;

        switch (month) {
            case 12: case 1: case 2:
                System.out.println("Winter ❄️");
                break;
            case 3: case 4: case 5:
                System.out.println("Spring 🌸");
                break;
            case 6: case 7: case 8:
                System.out.println("Summer ☀️");
                break;
            case 9: case 10: case 11:
                System.out.println("Autumn 🍂");
                break;
            default:
                System.out.println("Invalid month");
        }
    }
}
```

#### switch with Strings (Java 7+)

```java
import java.util.Scanner;

public class SwitchStringDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a fruit: ");
        String fruit = scanner.nextLine().toLowerCase();

        switch (fruit) {
            case "apple":
                System.out.println("🍎 Apples are rich in fiber!");
                break;
            case "banana":
                System.out.println("🍌 Bananas are rich in potassium!");
                break;
            case "orange":
                System.out.println("🍊 Oranges are rich in vitamin C!");
                break;
            default:
                System.out.println("I don't know about " + fruit);
        }

        scanner.close();
    }
}
```

---

### 🕔 Hour 5: Enhanced switch (Java 14+) & Complex Examples

#### switch Expression (Java 14+)

```java
public class EnhancedSwitchDemo {
    public static void main(String[] args) {
        int day = 3;

        // Enhanced switch — no break needed, no fall-through
        String dayName = switch (day) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            case 4 -> "Thursday";
            case 5 -> "Friday";
            case 6, 7 -> "Weekend! 🎉";
            default -> "Invalid";
        };

        System.out.println("Day " + day + " is " + dayName);

        // Enhanced switch with blocks
        String category = switch (day) {
            case 1, 2, 3, 4, 5 -> {
                System.out.println("It's a weekday");
                yield "Weekday";  // 'yield' returns value from block
            }
            case 6, 7 -> {
                System.out.println("It's the weekend!");
                yield "Weekend";
            }
            default -> "Invalid";
        };

        System.out.println("Category: " + category);
    }
}
```

#### Real-World Example: Simple Calculator

```java
import java.util.Scanner;

public class SimpleCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter first number: ");
        double num1 = scanner.nextDouble();

        System.out.print("Enter operator (+, -, *, /): ");
        char operator = scanner.next().charAt(0);

        System.out.print("Enter second number: ");
        double num2 = scanner.nextDouble();

        double result;
        boolean valid = true;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 != 0) {
                    result = num1 / num2;
                } else {
                    System.out.println("Error: Division by zero!");
                    result = 0;
                    valid = false;
                }
                break;
            default:
                System.out.println("Error: Invalid operator!");
                result = 0;
                valid = false;
        }

        if (valid) {
            System.out.printf("%.2f %c %.2f = %.2f%n", num1, operator, num2, result);
        }

        scanner.close();
    }
}
```

---

### 🕕 Hour 6: Revision & Mini Exercises

#### if-else vs switch — When to Use Which?

| Criteria | if-else | switch |
|----------|---------|--------|
| Complex conditions | ✅ Yes | ❌ No |
| Range checks (>, <) | ✅ Yes | ❌ No |
| Exact value matching | ✅ Yes | ✅ Yes (preferred) |
| Multiple exact values | Use if-else-if | ✅ Better |
| Boolean expressions | ✅ Yes | ❌ No |
| Supported types | Any | int, char, String, enum |

#### Mini Exercise: ATM Menu

```java
import java.util.Scanner;

public class ATMMenu {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        double balance = 50000.0;

        System.out.println("=== ATM MENU ===");
        System.out.println("1. Check Balance");
        System.out.println("2. Deposit");
        System.out.println("3. Withdraw");
        System.out.println("4. Exit");
        System.out.print("Choose option: ");

        int choice = scanner.nextInt();

        switch (choice) {
            case 1:
                System.out.printf("Your balance: ₹%.2f%n", balance);
                break;
            case 2:
                System.out.print("Enter deposit amount: ");
                double deposit = scanner.nextDouble();
                if (deposit > 0) {
                    balance += deposit;
                    System.out.printf("Deposited! New balance: ₹%.2f%n", balance);
                } else {
                    System.out.println("Invalid amount!");
                }
                break;
            case 3:
                System.out.print("Enter withdrawal amount: ");
                double withdraw = scanner.nextDouble();
                if (withdraw > 0 && withdraw <= balance) {
                    balance -= withdraw;
                    System.out.printf("Withdrawn! New balance: ₹%.2f%n", balance);
                } else {
                    System.out.println("Insufficient funds or invalid amount!");
                }
                break;
            case 4:
                System.out.println("Thank you! Goodbye.");
                break;
            default:
                System.out.println("Invalid option!");
        }

        scanner.close();
    }
}
```

---

## 📝 After Study Session (Extra Practice)

### 10 Theory Questions

1. What is the Scanner class? Which package is it in?
2. What is the difference between `next()` and `nextLine()`?
3. What is the `nextLine()` trap and how do you fix it?
4. When should you use `if-else` vs `switch`?
5. What happens if you forget `break` in a switch case?
6. What types can be used in a switch statement?
7. What is a `default` case in switch?
8. What is a switch expression (Java 14+)? What is `yield`?
9. Can you use `null` in a switch statement?
10. What is the difference between `if (x == 5)` and `if (5 == x)`?

### 10 Coding Questions

1. Write a program to check if a number is positive, negative, or zero.
2. Write a program to find the largest of three numbers using if-else.
3. Write a program to check if a character is a vowel or consonant using switch.
4. Write a program to determine the day of the week from a number (1-7) using switch.
5. Write a program to calculate electricity bill based on units consumed (use slab rates).
6. Write a program to check if a triangle is valid given three sides.
7. Write a program to check if a character is uppercase, lowercase, digit, or special character.
8. Write a program that acts as a simple menu-driven calculator.
9. Write a program to assign bus ticket prices based on age (child/adult/senior).
10. Write a program to determine the season from a month number.

### 5 Debugging Questions

**Debug 1:**
```java
Scanner scanner = new Scanner(System.in);
int num = scanner.nextInt();
String name = scanner.nextLine();  // Why is this skipped?
```

**Debug 2:**
```java
int x = 10;
if (x = 5) {  // What's wrong?
    System.out.println("Five");
}
```
*Fix: Use `==` not `=`*

**Debug 3:**
```java
switch (grade) {
    case "A":
        System.out.println("Excellent");
    case "B":
        System.out.println("Good");
}
// If grade is "A", what gets printed?
```

**Debug 4:**
```java
double d = 3.14;
switch (d) {  // What's wrong?
    case 3.14: System.out.println("Pi");
}
```
*Fix: `double` is not allowed in switch*

**Debug 5:**
```java
int marks = 85;
if (marks > 90)
    System.out.println("A+");
else if (marks > 80);  // What's wrong?
    System.out.println("A");
```
*Fix: Remove the semicolon after `else if` — it creates an empty statement*

### 2 Assignments

**Assignment 1: Student Report Card**
Write a program that takes marks in 5 subjects from the user, calculates total, percentage, and grade. Display a formatted report card.

**Assignment 2: Number Properties Checker**
Write a program that takes a number from the user and tells:
- Is it positive, negative, or zero?
- Is it even or odd?
- Is it a single digit, double digit, or more?
- Is it divisible by 5 and 11?

### 1 Mini Project: Simple Calculator

Build a complete calculator that:
- Takes two numbers and an operator from user
- Supports +, -, *, /, % operations
- Handles division by zero
- Displays result with 2 decimal places
- Asks if user wants to calculate again (Y/N)

### 1 Revision Checklist

- [ ] I can use Scanner to read different data types
- [ ] I know the nextLine() trap and how to fix it
- [ ] I can write if, if-else, if-else-if, and nested if statements
- [ ] I can write switch statements with proper break
- [ ] I know when to use if-else vs switch
- [ ] I understand fall-through in switch
- [ ] I can use enhanced switch (Java 14+)

---

## 📓 Daily Notes

### Common Mistakes
1. **The nextLine() trap** — always consume the leftover newline
2. **Missing break in switch** — causes fall-through
3. **Semicolon after if/else** — `if(condition);` creates empty body
4. **Using `=` instead of `==`** — assignment vs comparison
5. **Not closing Scanner** — causes resource leak warnings

### Interview Points
- Scanner is in `java.util` package
- switch supports `byte`, `short`, `int`, `char`, `String`, `enum`
- switch does NOT support `long`, `float`, `double`, `boolean`
- Fall-through is sometimes intentional (grouping cases)
- Enhanced switch (Java 14+) eliminates fall-through bugs

---

## 📚 Resources

- [Scanner Class - Oracle](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Scanner.html)
- [Control Flow - Oracle Tutorial](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html)
- [Switch Expressions - Baeldung](https://www.baeldung.com/java-switch)

---

## ✅ End of Day Checklist

- [ ] I understood today's concepts
- [ ] I completed all coding examples
- [ ] I solved all practice questions
- [ ] I completed today's assignments
- [ ] I built the simple calculator mini project
- [ ] I revised my notes
- [ ] I am ready for Day 5

---

> 🎉 **Congratulations!** You've completed Phase 1: Programming Fundamentals! You can now write basic Java programs that take input, perform calculations, and make decisions. Tomorrow, we start Phase 2: Core Java with loops!
