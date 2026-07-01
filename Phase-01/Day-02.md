# 📅 Day 2: Variables, Data Types & Type Casting

## 🎯 Goal of the Day

Today you will master **variables** and **data types** — the foundation of every program. You'll learn how Java stores data, the difference between primitive and reference types, and how to convert between types. By the end of today, you'll write programs that store, manipulate, and display different kinds of data.

---

## 📚 Topics Covered

1. What are Variables?
2. Rules for Naming Variables
3. Primitive Data Types (8 types)
4. Reference Data Types
5. Literals & Constants
6. Type Casting (Widening & Narrowing)
7. Type Promotion in Expressions
8. `var` keyword (Java 10+)

---

## ⏰ Hour-by-Hour Study Plan (6 Hours)

---

### 🕐 Hour 1: Understanding Variables

#### What is a Variable?

A **variable** is a named container that holds a value in memory. Think of it as a **labeled box** where you store data.

**Real-Life Analogy:**
Imagine a **locker room** with numbered lockers. Each locker:
- Has a **name tag** (variable name)
- Has a **specific size** (data type)
- Stores **one item** (value)
- Can have its item **replaced** (value changed)

#### Declaring and Initializing Variables

```java
// Syntax: dataType variableName = value;

// Declaration (creating the variable)
int age;

// Initialization (assigning a value)
age = 22;

// Declaration + Initialization (in one line)
int age = 22;

// Multiple variables of same type
int x = 10, y = 20, z = 30;
```

**Line-by-Line Explanation:**
- `int` — the data type (integer — whole numbers)
- `age` — the variable name (you choose this)
- `=` — assignment operator (NOT "equals" — it means "store")
- `22` — the value being stored
- `;` — end of statement

#### Variable Naming Rules (MUST Follow)

| Rule | Valid | Invalid |
|------|-------|---------|
| Must start with letter, `_`, or `$` | `name`, `_count`, `$price` | `1name`, `@value` |
| Can contain letters, digits, `_`, `$` | `student1`, `total_amount` | `my-variable`, `total amount` |
| Cannot use Java keywords | `myClass` | `class`, `int`, `public` |
| Case-sensitive | `Name` ≠ `name` ≠ `NAME` | — |
| Should be camelCase (convention) | `firstName`, `totalAmount` | `firstname`, `FIRSTNAME` |

#### Best Practices for Variable Names

```java
// ✅ GOOD — descriptive and clear
int studentAge = 22;
String firstName = "Chandu";
double accountBalance = 50000.75;

// ❌ BAD — meaningless abbreviations
int a = 22;
String fn = "Chandu";
double ab = 50000.75;
```

---

### 🕑 Hour 2: Primitive Data Types — The 8 Pillars

Java has **8 primitive data types** — these are the most basic types and are NOT objects.

#### Overview Table

| Type | Size | Range | Default | Example |
|------|------|-------|---------|---------|
| `byte` | 1 byte (8 bits) | -128 to 127 | 0 | `byte b = 100;` |
| `short` | 2 bytes (16 bits) | -32,768 to 32,767 | 0 | `short s = 30000;` |
| `int` | 4 bytes (32 bits) | -2.1B to 2.1B | 0 | `int i = 100000;` |
| `long` | 8 bytes (64 bits) | -9.2×10¹⁸ to 9.2×10¹⁸ | 0L | `long l = 999999999L;` |
| `float` | 4 bytes (32 bits) | ±3.4×10³⁸ (6-7 digits precision) | 0.0f | `float f = 3.14f;` |
| `double` | 8 bytes (64 bits) | ±1.7×10³⁰⁸ (15 digits precision) | 0.0d | `double d = 3.14159;` |
| `char` | 2 bytes (16 bits) | 0 to 65,535 (Unicode) | '\u0000' | `char c = 'A';` |
| `boolean` | 1 bit (JVM dependent) | `true` or `false` | false | `boolean b = true;` |

**Memory Analogy:**
- `byte` = a small sticky note (can hold small numbers)
- `short` = a notepad page (bigger numbers)
- `int` = a full notebook (most common, default for whole numbers)
- `long` = a filing cabinet (very large numbers)
- `float` = a calculator with small display (decimal numbers, less precise)
- `double` = a scientific calculator (decimal numbers, very precise, default for decimals)
- `char` = a single letter stamp (one character)
- `boolean` = a light switch (on/off, true/false)

#### Complete Example Program

```java
public class DataTypesDemo {
    public static void main(String[] args) {
        // Integer types
        byte myByte = 127;           // Max value for byte
        short myShort = 32000;       // Useful for small numbers
        int myInt = 2000000000;      // Most commonly used
        long myLong = 9000000000L;   // Note: L suffix required

        // Floating-point types
        float myFloat = 3.14f;       // Note: f suffix required
        double myDouble = 3.141592653589793; // Default decimal type

        // Character type
        char myChar = 'A';           // Single quotes for char
        char myUnicode = '\u0041';   // Unicode for 'A'

        // Boolean type
        boolean isJavaFun = true;
        boolean isHard = false;

        // Print all values
        System.out.println("byte: " + myByte);
        System.out.println("short: " + myShort);
        System.out.println("int: " + myInt);
        System.out.println("long: " + myLong);
        System.out.println("float: " + myFloat);
        System.out.println("double: " + myDouble);
        System.out.println("char: " + myChar);
        System.out.println("unicode: " + myUnicode);
        System.out.println("boolean: " + isJavaFun);
    }
}
```

**Expected Output:**
```
byte: 127
short: 32000
int: 2000000000
long: 9000000000
float: 3.14
double: 3.141592653589793
char: A
unicode: A
boolean: true
```

#### Why Does Each Type Exist?

| Type | When to Use | Real-World Example |
|------|------------|-------------------|
| `byte` | Saving memory in large arrays | Image pixel data, file I/O |
| `short` | When range of byte isn't enough | Ports, small counters |
| `int` | Default choice for whole numbers | Age, count, quantity |
| `long` | When int isn't big enough | Population, file sizes, timestamps |
| `float` | When precision isn't critical | Game graphics, approximate values |
| `double` | Default choice for decimals | Financial calculations, scientific |
| `char` | Single characters | Grade ('A'), gender ('M'/'F') |
| `boolean` | True/false decisions | isLoggedIn, hasPermission |

---

### 🕒 Hour 3: Reference Types, Strings & Constants

#### Reference Types vs Primitive Types

```
┌──────────────────────┬──────────────────────┐
│   Primitive Types     │   Reference Types     │
├──────────────────────┼──────────────────────┤
│ Stores actual value  │ Stores memory address │
│ Stored on stack      │ Object on heap        │
│ 8 types only         │ Unlimited (any class) │
│ Lowercase names      │ Uppercase names       │
│ Cannot be null       │ Can be null           │
│ int, char, boolean.. │ String, Array, Object │
└──────────────────────┴──────────────────────┘
```

**Analogy:**
- **Primitive** = You write the phone number directly on a paper
- **Reference** = You write the *address* of where to find the phone number

#### Strings — The Most Used Reference Type

```java
public class StringDemo {
    public static void main(String[] args) {
        // String is NOT a primitive — it's a class (reference type)
        String name = "Chandu";        // String literal
        String city = new String("Hyderabad"); // Using constructor

        // String concatenation
        String fullInfo = name + " lives in " + city;
        System.out.println(fullInfo);

        // String length
        System.out.println("Name length: " + name.length());

        // String methods
        System.out.println("Uppercase: " + name.toUpperCase());
        System.out.println("Lowercase: " + name.toLowerCase());
        System.out.println("First char: " + name.charAt(0));

        // String is IMMUTABLE — every operation creates a new String
        String greeting = "Hello";
        greeting = greeting + " World"; // Creates new String object
        System.out.println(greeting);
    }
}
```

**Expected Output:**
```
Chandu lives in Hyderabad
Name length: 6
Uppercase: CHANDU
Lowercase: chandu
First char: C
Hello World
```

#### Constants — Values That Never Change

```java
public class ConstantsDemo {
    public static void main(String[] args) {
        // 'final' keyword makes a variable constant
        final double PI = 3.14159;
        final int MAX_STUDENTS = 100;
        final String COMPANY_NAME = "Google";

        System.out.println("PI = " + PI);
        System.out.println("Max students: " + MAX_STUDENTS);
        System.out.println("Company: " + COMPANY_NAME);

        // PI = 3.14;  // ❌ ERROR: Cannot assign a value to final variable
    }
}
```

**Why Use Constants?**
- Prevents accidental changes to important values
- Makes code more readable
- Easy to update in one place
- Convention: UPPER_SNAKE_CASE

#### Literals — Different Number Formats

```java
public class LiteralsDemo {
    public static void main(String[] args) {
        // Integer literals in different bases
        int decimal = 100;          // Decimal (base 10)
        int binary = 0b1100100;     // Binary (base 2) — prefix 0b
        int octal = 0144;           // Octal (base 8) — prefix 0
        int hex = 0x64;             // Hexadecimal (base 16) — prefix 0x

        System.out.println("Decimal: " + decimal);
        System.out.println("Binary 0b1100100: " + binary);
        System.out.println("Octal 0144: " + octal);
        System.out.println("Hex 0x64: " + hex);

        // Underscore in numeric literals (Java 7+) — for readability
        int billion = 1_000_000_000;
        long creditCard = 1234_5678_9012_3456L;
        System.out.println("Billion: " + billion);
    }
}
```

---

### 🕓 Hour 4: Type Casting — Widening & Narrowing

#### What is Type Casting?

**Type casting** is converting a value from one data type to another.

**Real-Life Analogy:**
Think of pouring water between containers:
- **Widening** = Pouring from a small glass into a large bucket — no spill (safe)
- **Narrowing** = Pouring from a large bucket into a small glass — might spill (data loss)

#### Widening (Implicit/Automatic) Casting

Java does this automatically — smaller type to larger type.

```
byte → short → int → long → float → double
                char ↗
```

```java
public class WideningDemo {
    public static void main(String[] args) {
        byte b = 42;
        short s = b;        // byte → short (automatic)
        int i = s;          // short → int (automatic)
        long l = i;         // int → long (automatic)
        float f = l;        // long → float (automatic)
        double d = f;       // float → double (automatic)

        System.out.println("byte: " + b);
        System.out.println("short: " + s);
        System.out.println("int: " + i);
        System.out.println("long: " + l);
        System.out.println("float: " + f);
        System.out.println("double: " + d);

        // char to int (automatic)
        char ch = 'A';
        int ascii = ch;     // char → int gives ASCII value
        System.out.println("'A' as int: " + ascii); // 65
    }
}
```

**Expected Output:**
```
byte: 42
short: 42
int: 42
long: 42
float: 42.0
double: 42.0
'A' as int: 65
```

#### Narrowing (Explicit/Manual) Casting

You must do this manually — larger type to smaller type. **Risk of data loss!**

```java
public class NarrowingDemo {
    public static void main(String[] args) {
        double d = 9.78;
        int i = (int) d;       // double → int (truncates decimal)
        System.out.println("double " + d + " → int " + i); // 9

        int big = 130;
        byte b = (byte) big;   // int → byte (overflow!)
        System.out.println("int " + big + " → byte " + b); // -126 (overflow)

        int num = 65;
        char ch = (char) num;  // int → char
        System.out.println("int " + num + " → char " + ch); // 'A'

        // Why did 130 become -126?
        // byte range: -128 to 127
        // 130 overflows: 130 - 256 = -126
    }
}
```

**Expected Output:**
```
double 9.78 → int 9
int 130 → byte -126
int 65 → char A
```

#### Type Promotion in Expressions

```java
public class TypePromotionDemo {
    public static void main(String[] args) {
        byte a = 10;
        byte b = 20;
        // byte result = a + b;  // ❌ ERROR! Result is promoted to int
        int result = a + b;      // ✅ Correct

        // Rule: byte, short, char are promoted to int in expressions
        byte x = 5;
        short y = 10;
        char z = 'A';            // 65 in int
        int total = x + y + z;   // All promoted to int
        System.out.println("Total: " + total); // 5 + 10 + 65 = 80

        // If one operand is double, result is double
        int p = 10;
        double q = 3.0;
        double div = p / q;      // int promoted to double
        System.out.println("Division: " + div); // 3.333...
    }
}
```

---

### 🕔 Hour 5: Wrapper Classes & var Keyword

#### Wrapper Classes — Objects for Primitives

Each primitive type has a corresponding **wrapper class** (reference type):

| Primitive | Wrapper Class |
|-----------|--------------|
| byte | Byte |
| short | Short |
| int | **Integer** |
| long | Long |
| float | Float |
| double | Double |
| char | **Character** |
| boolean | Boolean |

```java
public class WrapperDemo {
    public static void main(String[] args) {
        // Autoboxing: primitive → wrapper (automatic)
        int num = 42;
        Integer wrapped = num;     // autoboxing
        System.out.println("Wrapped: " + wrapped);

        // Unboxing: wrapper → primitive (automatic)
        Integer obj = 100;
        int primitive = obj;       // unboxing
        System.out.println("Primitive: " + primitive);

        // Useful wrapper methods
        String numStr = "123";
        int parsed = Integer.parseInt(numStr);  // String → int
        System.out.println("Parsed: " + parsed);

        // Integer properties
        System.out.println("Max int: " + Integer.MAX_VALUE);
        System.out.println("Min int: " + Integer.MIN_VALUE);

        // Convert int to String
        String str = Integer.toString(42);
        System.out.println("As string: " + str);
    }
}
```

**Why Do Wrapper Classes Exist?**
1. Collections (ArrayList, HashMap) can only store objects, not primitives
2. Utility methods (`parseInt`, `valueOf`, etc.)
3. Can be `null` (useful for database values that might be missing)
4. Required for generics

#### var Keyword (Java 10+)

```java
public class VarDemo {
    public static void main(String[] args) {
        // Java 10+ allows 'var' for local variables
        var name = "Chandu";        // Compiler infers: String
        var age = 22;               // Compiler infers: int
        var salary = 50000.0;       // Compiler infers: double
        var isActive = true;        // Compiler infers: boolean

        System.out.println(name.getClass().getSimpleName());    // String
        System.out.println(((Object) age).getClass().getSimpleName()); // Integer

        // ❌ Cannot use var without initialization
        // var unknown;  // ERROR: Cannot infer type

        // ❌ Cannot use var for method parameters
        // ❌ Cannot use var for class fields
    }
}
```

**When to Use var:**
- ✅ When the type is obvious from the right side
- ✅ For reducing verbosity in complex generic types
- ❌ When it makes code less readable
- ❌ For method parameters or return types

---

### 🕕 Hour 6: Revision & Mini Exercises

#### Quick Recap Diagram

```
    Data Types in Java
    ┌───────────────────────────────────────┐
    │                                       │
    ├── Primitive (8 types)                 │
    │   ├── Integer: byte, short, int, long │
    │   ├── Floating: float, double         │
    │   ├── Character: char                 │
    │   └── Boolean: boolean                │
    │                                       │
    └── Reference                           │
        ├── String                          │
        ├── Arrays                          │
        ├── Classes                         │
        └── Interfaces                      │
    └───────────────────────────────────────┘
```

#### Mini Coding Exercises

**Exercise 1:** Declare variables for a student record and print them.
```java
public class StudentRecord {
    public static void main(String[] args) {
        String name = "Chandu";
        int age = 22;
        char grade = 'A';
        double gpa = 8.75;
        boolean isGraduated = false;
        
        System.out.printf("Student: %s, Age: %d, Grade: %c, GPA: %.2f, Graduated: %b%n",
                          name, age, grade, gpa, isGraduated);
    }
}
```

**Exercise 2:** Demonstrate type casting.
```java
public class CastingPractice {
    public static void main(String[] args) {
        double price = 99.99;
        int roundedPrice = (int) price;
        System.out.println("Original: " + price);
        System.out.println("Rounded: " + roundedPrice);
        
        char letter = 'Z';
        int asciiValue = letter;
        System.out.println("'" + letter + "' = " + asciiValue);
    }
}
```

---

## 📝 After Study Session (Extra Practice)

### 10 Theory Questions

1. What is the difference between primitive and reference types?
2. How many primitive data types does Java have? Name all of them.
3. What is the default value of `int`, `boolean`, and `String`?
4. What is the difference between `float` and `double`?
5. Why do we add `L` suffix to `long` and `f` suffix to `float`?
6. What is type casting? What are the two types?
7. What happens when you cast `130` to a `byte`? Why?
8. What is autoboxing and unboxing?
9. Why can't we use `byte result = byte1 + byte2`? What type promotion rule applies?
10. What is the `final` keyword? How is it different from `const` in other languages?

### 10 Coding Questions

1. Write a program to swap two numbers using a third variable.
2. Write a program to swap two numbers WITHOUT using a third variable.
3. Write a program that converts temperature from Celsius to Fahrenheit. (F = C × 9/5 + 32)
4. Write a program that calculates the area and circumference of a circle given the radius.
5. Write a program that demonstrates all 8 primitive data types with meaningful examples.
6. Write a program that converts days into years, weeks, and remaining days.
7. Write a program that calculates simple interest (SI = P × R × T / 100).
8. Write a program that takes a character and prints its ASCII value.
9. Write a program that demonstrates data loss during narrowing conversion.
10. Write a program that uses wrapper class methods to parse strings into numbers.

### 5 Debugging Questions

**Debug 1:**
```java
public class Debug1 {
    public static void main(String[] args) {
        int x = 10;
        long y = x;
        int z = y;  // What's wrong here?
    }
}
```
*Fix: Need explicit cast: `int z = (int) y;`*

**Debug 2:**
```java
public class Debug2 {
    public static void main(String[] args) {
        float price = 99.99;  // What's wrong?
    }
}
```
*Fix: Add `f` suffix: `float price = 99.99f;`*

**Debug 3:**
```java
public class Debug3 {
    public static void main(String[] args) {
        byte a = 50;
        byte b = 60;
        byte sum = a + b;  // What's wrong?
    }
}
```
*Fix: Use `int sum = a + b;` or `byte sum = (byte)(a + b);`*

**Debug 4:**
```java
public class Debug4 {
    public static void main(String[] args) {
        char ch = "A";  // What's wrong?
    }
}
```
*Fix: Use single quotes for char: `char ch = 'A';`*

**Debug 5:**
```java
public class Debug5 {
    public static void main(String[] args) {
        final int MAX = 100;
        MAX = 200;  // What's wrong?
    }
}
```
*Fix: Cannot reassign a `final` variable. Remove the reassignment.*

### 2 Assignments

**Assignment 1: Unit Converter**
Write a program `UnitConverter.java` that converts:
- Kilometers to miles (1 km = 0.621371 miles)
- Kilograms to pounds (1 kg = 2.20462 pounds)
- Celsius to Fahrenheit (F = C × 9/5 + 32)
Declare all values as variables, perform conversions, and display results with printf.

**Assignment 2: Data Type Explorer**
Write a program `DataTypeExplorer.java` that prints the MIN and MAX values of all numeric primitive types using wrapper classes (e.g., `Integer.MAX_VALUE`, `Byte.MIN_VALUE`). Display results in a formatted table.

### 1 Revision Checklist

- [ ] I can declare and initialize variables of all 8 primitive types
- [ ] I know the size, range, and default value of each primitive type
- [ ] I understand the difference between primitive and reference types
- [ ] I can perform widening (implicit) type casting
- [ ] I can perform narrowing (explicit) type casting
- [ ] I understand type promotion in expressions
- [ ] I know what wrapper classes are and why they exist
- [ ] I understand autoboxing and unboxing

---

## 📓 Daily Notes

### Common Mistakes Beginners Make
1. **Using `=` instead of `==`** — `=` is assignment, `==` is comparison
2. **Forgetting `f` for float literals** — `3.14` is double by default
3. **Forgetting `L` for long literals** — Large numbers need `L` suffix
4. **Using double quotes for char** — `'A'` not `"A"`
5. **Integer division surprise** — `5 / 2 = 2` (not 2.5!) because both are int

### Important Interview Points
- Java is **strongly typed** — every variable must have a declared type
- `String` is a **reference type**, not a primitive
- Default values only apply to **class-level variables**, not local variables
- Local variables **must be initialized** before use
- `char` in Java is **2 bytes** (Unicode), unlike C where it's 1 byte (ASCII)

### Best Coding Practices
- Use `int` for most integer operations (it's the most efficient)
- Use `double` for decimal calculations (default precision)
- Use `long` for timestamps and large counts
- Use meaningful variable names always
- Declare variables as close to their use as possible
- Use `final` for values that shouldn't change

---

## 📚 Resources

- [Java Data Types - Oracle Docs](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html)
- [Type Casting in Java - GeeksforGeeks](https://www.geeksforgeeks.org/type-conversion-java-examples/)
- [Java Variables - W3Schools](https://www.w3schools.com/java/java_variables.asp)
- [Wrapper Classes - Baeldung](https://www.baeldung.com/java-wrapper-classes)

---

## ✅ End of Day Checklist

- [ ] I understood today's concepts
- [ ] I completed all coding examples
- [ ] I solved all practice questions
- [ ] I completed today's assignments
- [ ] I revised my notes
- [ ] I am ready for Day 3
