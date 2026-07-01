# 📅 Day 8: Methods (Functions)

## 🎯 Goal of the Day

Today you will master **methods** — reusable blocks of code that perform specific tasks. Methods are the building blocks of clean, organized, maintainable code. By the end of today, you'll write methods with different parameter types, return types, and understand method overloading.

---

## 📚 Topics Covered

1. What are Methods? Why Methods?
2. Method Syntax — Declaration, Parameters, Return Types
3. Method Calling & Execution Flow
4. Pass by Value in Java
5. Method Overloading
6. Variable Arguments (varargs)
7. Static vs Instance Methods
8. Method Best Practices

---

## ⏰ Hour-by-Hour Study Plan (6 Hours)

---

### 🕐 Hour 1: Method Basics

#### What is a Method?

A method is a **named block of code** that performs a task and can be **reused** by calling it.

**Real-Life Analogy:** A method is like a **recipe**. You write it once, and you can use it every time you want to cook that dish. The ingredients are **parameters**, and the final dish is the **return value**.

#### Method Syntax

```java
accessModifier returnType methodName(parameterList) {
    // method body
    return value; // if returnType is not void
}
```

```java
public class MethodBasics {
    // Method with no parameters and no return value
    static void greet() {
        System.out.println("Hello! Welcome to Java.");
    }

    // Method with parameters
    static void greetUser(String name) {
        System.out.println("Hello, " + name + "!");
    }

    // Method with return value
    static int add(int a, int b) {
        return a + b;
    }

    // Method with multiple parameters and return
    static double calculateArea(double length, double width) {
        return length * width;
    }

    public static void main(String[] args) {
        // Calling methods
        greet();                            // Hello! Welcome to Java.
        greetUser("Chandu");                // Hello, Chandu!

        int sum = add(10, 20);
        System.out.println("Sum: " + sum);  // Sum: 30

        double area = calculateArea(5.0, 3.0);
        System.out.println("Area: " + area); // Area: 15.0
    }
}
```

#### Return Types

| Return Type | Meaning | Example |
|------------|---------|---------|
| `void` | Returns nothing | `void printHello()` |
| `int` | Returns an integer | `int getAge()` |
| `double` | Returns a decimal | `double getGPA()` |
| `String` | Returns a string | `String getName()` |
| `boolean` | Returns true/false | `boolean isValid()` |
| `int[]` | Returns an array | `int[] getScores()` |

---

### 🕑 Hour 2: Pass by Value & Method Overloading

#### Java is Always Pass by Value

**For primitives:** A copy of the value is passed.
**For objects/arrays:** A copy of the reference is passed (but the reference points to the same object).

```java
public class PassByValue {
    static void changeValue(int x) {
        x = 100;  // Changes local copy only
    }

    static void changeArray(int[] arr) {
        arr[0] = 100;  // Changes actual array (same reference)
    }

    public static void main(String[] args) {
        int num = 10;
        changeValue(num);
        System.out.println("num after changeValue: " + num);  // 10 (unchanged!)

        int[] numbers = {1, 2, 3};
        changeArray(numbers);
        System.out.println("arr[0] after changeArray: " + numbers[0]);  // 100 (changed!)
    }
}
```

#### Method Overloading

**Method overloading** means having multiple methods with the **same name** but **different parameter lists**.

```java
public class OverloadingDemo {
    // Same method name, different parameter types
    static int add(int a, int b) {
        return a + b;
    }

    static double add(double a, double b) {
        return a + b;
    }

    static int add(int a, int b, int c) {
        return a + b + c;
    }

    static String add(String a, String b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(add(5, 3));           // 8 (int version)
        System.out.println(add(5.5, 3.3));       // 8.8 (double version)
        System.out.println(add(1, 2, 3));        // 6 (3-param version)
        System.out.println(add("Hello", " World")); // "Hello World" (String version)
    }
}
```

**Overloading Rules:**
- ✅ Different number of parameters
- ✅ Different parameter types
- ✅ Different parameter order
- ❌ Cannot overload by return type alone
- ❌ Cannot overload by parameter name alone

---

### 🕒 Hour 3: Varargs & Static Methods

#### Variable Arguments (varargs)

```java
public class VarargsDemo {
    // varargs — accepts zero or more arguments
    static int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) {
            total += n;
        }
        return total;
    }

    // varargs must be last parameter
    static void printInfo(String name, int... scores) {
        System.out.print(name + ": ");
        for (int s : scores) {
            System.out.print(s + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        System.out.println(sum());              // 0
        System.out.println(sum(1));             // 1
        System.out.println(sum(1, 2, 3));       // 6
        System.out.println(sum(1, 2, 3, 4, 5)); // 15

        printInfo("Chandu", 85, 90, 78, 92);
    }
}
```

---

### 🕓 Hour 4: Practical Method Examples

#### Temperature Converter

```java
public class TemperatureConverter {
    static double celsiusToFahrenheit(double celsius) {
        return (celsius * 9.0 / 5.0) + 32;
    }

    static double fahrenheitToCelsius(double fahrenheit) {
        return (fahrenheit - 32) * 5.0 / 9.0;
    }

    static boolean isPrime(int num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 == 0 || num % 3 == 0) return false;
        for (int i = 5; i * i <= num; i += 6) {
            if (num % i == 0 || num % (i + 2) == 0) return false;
        }
        return true;
    }

    static int factorial(int n) {
        if (n <= 1) return 1;
        int result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println("100°C = " + celsiusToFahrenheit(100) + "°F");
        System.out.println("212°F = " + fahrenheitToCelsius(212) + "°C");
        System.out.println("Is 17 prime? " + isPrime(17));
        System.out.println("5! = " + factorial(5));
    }
}
```

---

### 🕔 Hour 5: Method Design Best Practices

#### Clean Method Design

```java
public class CleanMethods {
    // ✅ GOOD: Single responsibility, descriptive name
    static boolean isEligibleToVote(int age) {
        return age >= 18;
    }

    // ✅ GOOD: Clear input and output
    static double calculateBMI(double weightKg, double heightM) {
        return weightKg / (heightM * heightM);
    }

    // ✅ GOOD: Returns meaningful result
    static String getBMICategory(double bmi) {
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25.0) return "Normal";
        if (bmi < 30.0) return "Overweight";
        return "Obese";
    }

    public static void main(String[] args) {
        double bmi = calculateBMI(70, 1.75);
        System.out.printf("BMI: %.1f (%s)%n", bmi, getBMICategory(bmi));
    }
}
```

**Method Best Practices:**
1. One method = one task (Single Responsibility)
2. Use descriptive names (`calculateArea` not `calc`)
3. Keep methods short (ideally under 20 lines)
4. Limit parameters (max 3-4)
5. Return early for edge cases
6. Avoid side effects when possible

---

### 🕕 Hour 6: Revision & Mini Exercises

Write 5 utility methods: `isPalindrome(String)`, `reverseString(String)`, `max(int, int, int)`, `power(int, int)`, `countVowels(String)`.

---

## 📝 After Study Session (Extra Practice)

### 10 Theory Questions

1. What is a method in Java? Why do we use methods?
2. What is the difference between `void` and non-void methods?
3. What is method overloading? Give rules.
4. Is Java pass-by-value or pass-by-reference?
5. What are varargs? What are the rules for using them?
6. Can we overload the `main` method?
7. What is the difference between static and instance methods?
8. What happens if a method has no return statement but its return type is int?
9. Can two methods have the same name and same parameters but different return types?
10. What is method signature?

### 10 Coding Questions

1. Write a method to check if a number is Armstrong.
2. Write a method to find GCD of two numbers.
3. Write overloaded methods to calculate area (circle, rectangle, triangle).
4. Write a method that returns an array of prime numbers up to n.
5. Write a method to convert decimal to binary.
6. Write a method to check if a string is a palindrome.
7. Write a method that accepts varargs and returns the average.
8. Write a method to find nCr (combinations).
9. Write a method to reverse an array in place.
10. Write a method that returns the nth Fibonacci number.

### 5 Debugging Questions

Fix method signature errors, return type mismatches, and missing return statements.

### 2 Assignments

**Assignment 1:** Create a `MathUtils` class with methods: `isPrime`, `factorial`, `gcd`, `lcm`, `power`, `fibonacci`.
**Assignment 2:** Create a `StringUtils` class with methods: `reverse`, `isPalindrome`, `countWords`, `capitalize`, `removeSpaces`.

---

## 📓 Daily Notes

### Interview Points
- Java is **always pass-by-value** (copies references for objects)
- Method overloading is **compile-time polymorphism**
- `main` method CAN be overloaded (but JVM only calls the standard one)
- Method signature = method name + parameter list (not return type)

---

## ✅ End of Day Checklist

- [ ] I understood method declaration, parameters, and return types
- [ ] I understand pass-by-value in Java
- [ ] I can implement method overloading
- [ ] I know varargs syntax and rules
- [ ] I completed all practice questions
- [ ] I am ready for Day 9
