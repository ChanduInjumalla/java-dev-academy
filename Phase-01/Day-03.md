# 📅 Day 3: Operators and Expressions

## 🎯 Goal of the Day

Today you will master **all operators in Java** — the tools that let you perform calculations, make comparisons, and create logical conditions. Operators are used in literally every program you'll ever write. By the end of today, you'll be able to write complex expressions and understand operator precedence.

---

## 📚 Topics Covered

1. Arithmetic Operators (+, -, *, /, %)
2. Assignment Operators (=, +=, -=, etc.)
3. Comparison/Relational Operators (==, !=, <, >, <=, >=)
4. Logical Operators (&&, ||, !)
5. Unary Operators (++, --, +, -, ~, !)
6. Bitwise Operators (&, |, ^, ~, <<, >>)
7. Ternary Operator (?:)
8. Operator Precedence & Associativity
9. instanceof Operator

---

## ⏰ Hour-by-Hour Study Plan (6 Hours)

---

### 🕐 Hour 1: Arithmetic & Assignment Operators

#### Arithmetic Operators

**Real-Life Analogy:** These are like the buttons on a calculator — they perform basic math.

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `+` | Addition | `10 + 3` | `13` |
| `-` | Subtraction | `10 - 3` | `7` |
| `*` | Multiplication | `10 * 3` | `30` |
| `/` | Division | `10 / 3` | `3` (integer division!) |
| `%` | Modulus (remainder) | `10 % 3` | `1` |

```java
public class ArithmeticDemo {
    public static void main(String[] args) {
        int a = 17, b = 5;

        System.out.println("a + b = " + (a + b));   // 22
        System.out.println("a - b = " + (a - b));   // 12
        System.out.println("a * b = " + (a * b));   // 85
        System.out.println("a / b = " + (a / b));   // 3 (NOT 3.4!)
        System.out.println("a % b = " + (a % b));   // 2

        // ⚠️ IMPORTANT: Integer division truncates!
        System.out.println("17 / 5 = " + (17 / 5));      // 3
        System.out.println("17.0 / 5 = " + (17.0 / 5));  // 3.4

        // ⚠️ Division by zero
        // System.out.println(10 / 0);     // ArithmeticException!
        System.out.println(10.0 / 0);      // Infinity (no error for doubles)
    }
}
```

**Expected Output:**
```
a + b = 22
a - b = 12
a * b = 85
a / b = 3
a % b = 2
17 / 5 = 3
17.0 / 5 = 3.4
Infinity
```

**Common Mistake:** `17 / 5` gives `3`, not `3.4`! For decimal results, at least one operand must be a decimal: `17.0 / 5` or `(double) 17 / 5`.

#### Modulus Operator — Why Is It Useful?

```java
public class ModulusDemo {
    public static void main(String[] args) {
        // Check if a number is even or odd
        int num = 15;
        if (num % 2 == 0) {
            System.out.println(num + " is even");
        } else {
            System.out.println(num + " is odd");
        }

        // Extract last digit
        int number = 12345;
        int lastDigit = number % 10;
        System.out.println("Last digit of " + number + ": " + lastDigit); // 5

        // Check divisibility
        System.out.println("Is 100 divisible by 25? " + (100 % 25 == 0)); // true
    }
}
```

#### Assignment Operators

| Operator | Example | Equivalent To |
|----------|---------|--------------|
| `=` | `x = 10` | Assign 10 to x |
| `+=` | `x += 5` | `x = x + 5` |
| `-=` | `x -= 5` | `x = x - 5` |
| `*=` | `x *= 5` | `x = x * 5` |
| `/=` | `x /= 5` | `x = x / 5` |
| `%=` | `x %= 5` | `x = x % 5` |

```java
public class AssignmentDemo {
    public static void main(String[] args) {
        int score = 100;
        System.out.println("Initial: " + score);    // 100

        score += 20;   // score = score + 20
        System.out.println("After +=20: " + score);  // 120

        score -= 30;   // score = score - 30
        System.out.println("After -=30: " + score);  // 90

        score *= 2;    // score = score * 2
        System.out.println("After *=2: " + score);   // 180

        score /= 3;    // score = score / 3
        System.out.println("After /=3: " + score);   // 60

        score %= 7;    // score = score % 7
        System.out.println("After %=7: " + score);   // 4
    }
}
```

---

### 🕑 Hour 2: Comparison & Logical Operators

#### Comparison (Relational) Operators

These always return `boolean` (true/false). Used in if-statements and loops.

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| `==` | Equal to | `5 == 5` | `true` |
| `!=` | Not equal to | `5 != 3` | `true` |
| `>` | Greater than | `5 > 3` | `true` |
| `<` | Less than | `5 < 3` | `false` |
| `>=` | Greater or equal | `5 >= 5` | `true` |
| `<=` | Less or equal | `5 <= 3` | `false` |

```java
public class ComparisonDemo {
    public static void main(String[] args) {
        int a = 10, b = 20;

        System.out.println("a == b: " + (a == b));  // false
        System.out.println("a != b: " + (a != b));  // true
        System.out.println("a > b: " + (a > b));    // false
        System.out.println("a < b: " + (a < b));    // true
        System.out.println("a >= 10: " + (a >= 10)); // true
        System.out.println("b <= 15: " + (b <= 15)); // false

        // ⚠️ IMPORTANT: == vs .equals() for Strings
        String s1 = "Hello";
        String s2 = "Hello";
        String s3 = new String("Hello");

        System.out.println(s1 == s2);       // true (same reference in string pool)
        System.out.println(s1 == s3);       // false (different objects!)
        System.out.println(s1.equals(s3));  // true (same content)
    }
}
```

**Key Interview Point:** Always use `.equals()` for String comparison, not `==`. The `==` operator compares references (memory addresses), while `.equals()` compares content.

#### Logical Operators

| Operator | Name | Description |
|----------|------|------------|
| `&&` | Logical AND | Both conditions must be true |
| `\|\|` | Logical OR | At least one condition must be true |
| `!` | Logical NOT | Reverses the boolean value |

**Truth Table:**

| A | B | A && B | A \|\| B | !A |
|---|---|--------|----------|-----|
| true | true | true | true | false |
| true | false | false | true | false |
| false | true | false | true | true |
| false | false | false | false | true |

```java
public class LogicalDemo {
    public static void main(String[] args) {
        int age = 22;
        boolean hasLicense = true;
        boolean isInsured = false;

        // AND — both must be true
        System.out.println("Can drive: " + (age >= 18 && hasLicense)); // true

        // OR — at least one must be true
        System.out.println("Has coverage: " + (hasLicense || isInsured)); // true

        // NOT — reverses the value
        System.out.println("Not insured: " + !isInsured); // true

        // Short-circuit evaluation
        // In &&: if first is false, second is NOT evaluated
        // In ||: if first is true, second is NOT evaluated
        int x = 0;
        // x != 0 is false, so (10/x > 1) is NEVER evaluated — no error!
        boolean result = (x != 0) && (10 / x > 1);
        System.out.println("Short-circuit: " + result); // false
    }
}
```

**Short-Circuit Evaluation (Important Interview Topic):**
- `&&` — If left side is `false`, right side is **not evaluated** (result is already `false`)
- `||` — If left side is `true`, right side is **not evaluated** (result is already `true`)
- This prevents errors and improves performance!

---

### 🕒 Hour 3: Unary Operators (++ and --)

#### Increment and Decrement

| Operator | Name | Description |
|----------|------|------------|
| `++x` | Pre-increment | Increment THEN use |
| `x++` | Post-increment | Use THEN increment |
| `--x` | Pre-decrement | Decrement THEN use |
| `x--` | Post-decrement | Use THEN decrement |

```java
public class UnaryDemo {
    public static void main(String[] args) {
        // Post-increment: use current value, THEN increment
        int a = 5;
        System.out.println("a++: " + a++);  // prints 5, then a becomes 6
        System.out.println("a now: " + a);    // 6

        // Pre-increment: increment FIRST, then use new value
        int b = 5;
        System.out.println("++b: " + (++b));  // b becomes 6, prints 6
        System.out.println("b now: " + b);    // 6

        // Tricky example (INTERVIEW FAVORITE!)
        int x = 10;
        int y = x++ + ++x;
        // Step 1: x++ → use 10, then x becomes 11
        // Step 2: ++x → x becomes 12, use 12
        // y = 10 + 12 = 22
        System.out.println("y = " + y);   // 22
        System.out.println("x = " + x);   // 12

        // Other unary operators
        int num = 10;
        System.out.println("+num: " + (+num));   // 10 (unary plus)
        System.out.println("-num: " + (-num));   // -10 (unary minus)

        boolean flag = true;
        System.out.println("!flag: " + !flag);   // false (logical NOT)
    }
}
```

**Dry Run of `y = x++ + ++x` (where x = 10):**

| Step | Expression | x Value | Notes |
|------|-----------|---------|-------|
| Start | `y = x++ + ++x` | 10 | |
| Step 1 | `x++` returns 10 | 11 | Use 10, then increment |
| Step 2 | `++x` returns 12 | 12 | Increment first, then use |
| Step 3 | `y = 10 + 12` | 12 | y = 22 |

---

### 🕓 Hour 4: Bitwise & Ternary Operators

#### Bitwise Operators

These work at the **binary (bit) level**. Used in low-level programming, cryptography, and optimizations.

| Operator | Name | Description |
|----------|------|------------|
| `&` | AND | Both bits must be 1 |
| `\|` | OR | At least one bit must be 1 |
| `^` | XOR | Bits must be different |
| `~` | NOT | Flips all bits |
| `<<` | Left shift | Multiply by 2^n |
| `>>` | Right shift | Divide by 2^n |

```java
public class BitwiseDemo {
    public static void main(String[] args) {
        int a = 5;  // binary: 0101
        int b = 3;  // binary: 0011

        System.out.println("a & b = " + (a & b));   // 0001 = 1
        System.out.println("a | b = " + (a | b));   // 0111 = 7
        System.out.println("a ^ b = " + (a ^ b));   // 0110 = 6
        System.out.println("~a = " + (~a));          // -(5+1) = -6

        // Shift operators
        System.out.println("5 << 1 = " + (5 << 1)); // 10 (multiply by 2)
        System.out.println("5 << 2 = " + (5 << 2)); // 20 (multiply by 4)
        System.out.println("20 >> 1 = " + (20 >> 1)); // 10 (divide by 2)
        System.out.println("20 >> 2 = " + (20 >> 2)); // 5 (divide by 4)
    }
}
```

#### Ternary Operator

The **ternary operator** is a shorthand for if-else. It's the only operator that takes three operands.

**Syntax:** `condition ? valueIfTrue : valueIfFalse`

```java
public class TernaryDemo {
    public static void main(String[] args) {
        int age = 20;

        // Traditional if-else
        String status1;
        if (age >= 18) {
            status1 = "Adult";
        } else {
            status1 = "Minor";
        }

        // Same thing with ternary — much shorter!
        String status2 = (age >= 18) ? "Adult" : "Minor";

        System.out.println(status1); // Adult
        System.out.println(status2); // Adult

        // Finding maximum of two numbers
        int a = 15, b = 20;
        int max = (a > b) ? a : b;
        System.out.println("Max: " + max); // 20

        // Nested ternary (use sparingly — can reduce readability)
        int num = 0;
        String result = (num > 0) ? "Positive" : (num < 0) ? "Negative" : "Zero";
        System.out.println(num + " is " + result); // Zero
    }
}
```

---

### 🕔 Hour 5: Operator Precedence & instanceof

#### Operator Precedence (Highest to Lowest)

| Priority | Operators | Description |
|----------|----------|-------------|
| 1 | `()` | Parentheses |
| 2 | `++`, `--`, `!`, `~` | Unary |
| 3 | `*`, `/`, `%` | Multiplication, Division, Modulus |
| 4 | `+`, `-` | Addition, Subtraction |
| 5 | `<<`, `>>` | Shift |
| 6 | `<`, `<=`, `>`, `>=` | Relational |
| 7 | `==`, `!=` | Equality |
| 8 | `&` | Bitwise AND |
| 9 | `^` | Bitwise XOR |
| 10 | `\|` | Bitwise OR |
| 11 | `&&` | Logical AND |
| 12 | `\|\|` | Logical OR |
| 13 | `? :` | Ternary |
| 14 | `=`, `+=`, `-=` etc. | Assignment |

**Best Practice:** When in doubt, use **parentheses** to make your intent clear!

```java
public class PrecedenceDemo {
    public static void main(String[] args) {
        // Without parentheses — hard to read
        int result1 = 2 + 3 * 4;        // 14 (not 20!)
        System.out.println("2 + 3 * 4 = " + result1);

        // With parentheses — clear intent
        int result2 = (2 + 3) * 4;      // 20
        System.out.println("(2 + 3) * 4 = " + result2);

        // Complex expression
        int a = 5, b = 3, c = 2;
        int result3 = a + b * c - a / c + a % c;
        // = 5 + (3*2) - (5/2) + (5%2)
        // = 5 + 6 - 2 + 1
        // = 10
        System.out.println("Complex: " + result3);
    }
}
```

#### instanceof Operator

Checks if an object is an instance of a particular class.

```java
public class InstanceofDemo {
    public static void main(String[] args) {
        String name = "Chandu";
        Integer num = 42;

        System.out.println(name instanceof String);  // true
        System.out.println(num instanceof Integer);   // true
        System.out.println(name instanceof Object);   // true (every class extends Object)

        // null is not an instance of anything
        String nullStr = null;
        System.out.println(nullStr instanceof String); // false
    }
}
```

---

### 🕕 Hour 6: Revision & Mini Exercises

#### Comprehensive Example

```java
public class OperatorMasterClass {
    public static void main(String[] args) {
        // Scenario: Calculate final price with discount and tax
        double originalPrice = 1000.0;
        double discountPercent = 20.0;
        double taxPercent = 18.0;

        double discountAmount = originalPrice * discountPercent / 100;
        double priceAfterDiscount = originalPrice - discountAmount;
        double taxAmount = priceAfterDiscount * taxPercent / 100;
        double finalPrice = priceAfterDiscount + taxAmount;

        System.out.printf("Original Price: ₹%.2f%n", originalPrice);
        System.out.printf("Discount (%.0f%%): -₹%.2f%n", discountPercent, discountAmount);
        System.out.printf("Price After Discount: ₹%.2f%n", priceAfterDiscount);
        System.out.printf("Tax (%.0f%%): +₹%.2f%n", taxPercent, taxAmount);
        System.out.printf("Final Price: ₹%.2f%n", finalPrice);

        // Is it affordable?
        double budget = 1000.0;
        String affordable = (finalPrice <= budget) ? "Yes, within budget!" : "No, over budget!";
        System.out.println("Affordable? " + affordable);
    }
}
```

---

## 📝 After Study Session (Extra Practice)

### 10 Theory Questions

1. What is the difference between `/` and `%` operators?
2. What happens when you divide an integer by zero? What about a double by zero?
3. What is the difference between `&&` and `&`?
4. Explain short-circuit evaluation with an example.
5. What is the difference between `++x` and `x++`?
6. What is the ternary operator? Give its syntax.
7. What is operator precedence? Why does `2 + 3 * 4` give 14?
8. What is the `instanceof` operator?
9. What are bitwise operators? Give a real-world use case.
10. What is the difference between `==` and `.equals()` for Strings?

### 10 Coding Questions

1. Write a program to check if a number is even or odd using the modulus operator.
2. Write a program to find the maximum of three numbers using the ternary operator.
3. Write a program to swap two numbers using XOR (bitwise) without a third variable.
4. Write a program to check if a year is a leap year.
5. Write a program that calculates the area of a triangle given base and height.
6. Write a program that converts seconds to hours, minutes, and seconds.
7. Write a program to check if a number is positive, negative, or zero using ternary.
8. Write a program to demonstrate all assignment operators.
9. Write a program to multiply a number by 8 using bit shifting (left shift by 3).
10. Write a program to calculate the percentage of marks in 5 subjects.

### 5 Debugging Questions

**Debug 1:**
```java
int a = 10, b = 3;
double result = a / b;  // Expected 3.333, got 3.0. Why?
```
*Fix: `double result = (double) a / b;`*

**Debug 2:**
```java
boolean result = true && false || true && false;
// What is the result? Trace the evaluation.
```
*Answer: `false`. `(true && false)` = false, `(true && false)` = false, `false || false` = false*

**Debug 3:**
```java
int x = 5;
System.out.println(x++ + ++x);  // What's the output?
```
*Answer: 5 + 7 = 12. After x++ → x=6, then ++x → x=7*

**Debug 4:**
```java
int a = 10;
a += a -= a *= a;  // What is a?
```
*Answer: Evaluate right to left: a*=a → a=100, a-=100 → a=0, a+=0 → a=0*

**Debug 5:**
```java
System.out.println(10 > 5 > 3);  // What's wrong?
```
*Fix: `10 > 5` returns `boolean true`, and `true > 3` is invalid. Use `10 > 5 && 5 > 3`.*

### 2 Assignments

**Assignment 1: Grade Calculator**
Write a program that takes marks in 5 subjects, calculates total, percentage, and assigns a grade:
- 90%+ → A+, 80-89% → A, 70-79% → B, 60-69% → C, Below 60% → F

**Assignment 2: BMI Calculator**
Write a program that calculates BMI (weight in kg / height² in meters) and prints the category (Underweight, Normal, Overweight, Obese).

### 1 Revision Checklist

- [ ] I know all arithmetic operators and integer division behavior
- [ ] I understand compound assignment operators (+=, -=, etc.)
- [ ] I can use comparison operators correctly
- [ ] I understand logical operators and short-circuit evaluation
- [ ] I know the difference between pre/post increment
- [ ] I can use the ternary operator
- [ ] I understand operator precedence

---

## 📓 Daily Notes

### Common Mistakes
1. **Integer division** — `5/2 = 2` not `2.5`
2. **Confusing `=` and `==`** — assignment vs comparison
3. **String comparison with `==`** — use `.equals()` instead
4. **Forgetting operator precedence** — use parentheses

### Interview Points
- Short-circuit evaluation is a **very common interview question**
- `++x` vs `x++` — expect tricky expression evaluation questions
- Bitwise XOR swap is a **classic interview question**
- `==` vs `.equals()` — **most asked Java interview question**

---

## 📚 Resources

- [Java Operators - Oracle](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html)
- [Operator Precedence - GeeksforGeeks](https://www.geeksforgeeks.org/operators-in-java/)
- [Bitwise Operators - Baeldung](https://www.baeldung.com/java-bitwise-operators)

---

## ✅ End of Day Checklist

- [ ] I understood today's concepts
- [ ] I completed all coding examples
- [ ] I solved all practice questions
- [ ] I completed today's assignments
- [ ] I revised my notes
- [ ] I am ready for Day 4
