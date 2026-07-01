---
day: 1
phase: 1
title: Introduction to Java
difficulty: Beginner
estimatedTime: 6 hours
xp: 100
---

# 📅 Day 1: Introduction to Java & Your First Program

## 🎯 Goal of the Day

Today you will understand **what Java is**, **why it's so popular**, and **how it works internally**. You'll set up your development environment and write your very first Java program. By the end of today, you'll compile and run Java code on your own machine.

---

## 📚 Topics Covered

1. What is Java? — History, creator, versions
2. Why Java? — Features and advantages
3. Java vs Python — Key differences
4. How Java Works — JDK, JRE, JVM architecture
5. Setting Up Development Environment — JDK + IntelliJ IDEA
6. Writing Your First Java Program — "Hello, World!"
7. Understanding the Compilation Process
8. Java Program Structure — Anatomy of a Java file

---

## ⏰ Hour-by-Hour Study Plan (6 Hours)

---

### 🕐 Hour 1: What is Java & Why Java?

#### What is Java?

Java is a **high-level, class-based, object-oriented programming language** developed by **James Gosling** at **Sun Microsystems** (now owned by Oracle) in **1995**.

**Real-Life Analogy:**
Think of Java like **English** — it's a universal language that works everywhere. Just as English is understood across many countries, Java programs run on any device that has a Java Virtual Machine (JVM).

#### Brief History

| Year | Event |
|------|-------|
| 1991 | James Gosling starts "Oak" project |
| 1995 | Oak is renamed to "Java" and released |
| 1996 | JDK 1.0 released |
| 2006 | Java becomes open-source |
| 2010 | Oracle acquires Sun Microsystems |
| 2014 | Java 8 released (lambdas, streams) |
| 2017 | Java 9 (modules) — 6-month release cycle starts |
| 2021 | Java 17 LTS released |
| 2023 | Java 21 LTS released |

#### Why is Java So Popular?

| Feature | Explanation |
|---------|------------|
| **Platform Independent** | "Write Once, Run Anywhere" (WORA) — code runs on Windows, Mac, Linux |
| **Object-Oriented** | Everything is organized into objects and classes |
| **Strongly Typed** | Every variable must have a declared type — fewer bugs |
| **Automatic Memory Management** | Garbage Collector handles memory — no manual memory management |
| **Rich Standard Library** | Huge built-in library for networking, I/O, collections, etc. |
| **Multi-threaded** | Built-in support for concurrent programming |
| **Secure** | No pointers, bytecode verification, security manager |
| **Backward Compatible** | Old Java code generally works with new Java versions |
| **Huge Community** | Millions of developers, tons of libraries and frameworks |

#### Where is Java Used in Real Companies?

- **Android App Development** — Android apps are written in Java/Kotlin
- **Enterprise Backend** — Banks (JPMorgan, Goldman Sachs), e-commerce (Amazon, Flipkart)
- **Web Applications** — Spring Boot powers millions of web services
- **Big Data** — Hadoop, Apache Spark, Kafka are Java-based
- **Cloud Services** — AWS, Google Cloud use Java extensively
- **Government & Healthcare** — Critical systems built with Java

#### Java vs Python (Since You Know Python)

| Aspect | Java | Python |
|--------|------|--------|
| Typing | Static (declare types) | Dynamic (no type declaration) |
| Speed | Faster (compiled to bytecode) | Slower (interpreted) |
| Syntax | Verbose (more boilerplate) | Concise (less code) |
| Compilation | Compiled then interpreted | Interpreted directly |
| Semicolons | Required (`;`) | Not required |
| Braces | Uses `{}` for blocks | Uses indentation |
| Main method | Required to run | Not required |
| OOP | Everything is in a class | Supports OOP but not mandatory |

**Example — Printing "Hello" in both languages:**

```python
# Python
print("Hello, World!")
```

```java
// Java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

**Key Insight:** Java is more verbose than Python, but this verbosity makes large-scale applications easier to maintain and debug.

---

### 🕑 Hour 2: How Java Works Internally — JDK, JRE, JVM

#### The Java Ecosystem

```
┌─────────────────────────────────────────────────┐
│                    JDK                           │
│  (Java Development Kit)                         │
│  ┌─────────────────────────────────────────┐    │
│  │               JRE                        │    │
│  │  (Java Runtime Environment)              │    │
│  │  ┌─────────────────────────────────┐    │    │
│  │  │            JVM                   │    │    │
│  │  │  (Java Virtual Machine)          │    │    │
│  │  │                                  │    │    │
│  │  │  • Class Loader                  │    │    │
│  │  │  • Bytecode Verifier             │    │    │
│  │  │  • Execution Engine              │    │    │
│  │  │  • Garbage Collector             │    │    │
│  │  └─────────────────────────────────┘    │    │
│  │  + Java Class Libraries (rt.jar)        │    │
│  └─────────────────────────────────────────┘    │
│  + Development Tools (javac, java, javadoc)     │
└─────────────────────────────────────────────────┘
```

#### JVM (Java Virtual Machine)

**What:** An abstract machine that runs Java bytecode.

**Real-Life Analogy:** Think of JVM as a **translator at the United Nations**. The speaker (your Java code) speaks one language, and the translator (JVM) converts it into the language the listener (your operating system) understands.

**Key Components:**
1. **Class Loader** — Loads `.class` files into memory
2. **Bytecode Verifier** — Checks code for security violations
3. **Execution Engine** — Executes the bytecode
   - **Interpreter** — Reads bytecode line by line
   - **JIT Compiler** — Compiles hot bytecode to native machine code for speed
4. **Garbage Collector** — Automatically frees unused memory

#### JRE (Java Runtime Environment)

**What:** JVM + Java class libraries. It's everything needed to **run** Java programs.

**Analogy:** If JVM is the engine of a car, JRE is the engine + fuel + tires — everything needed to drive (run programs).

#### JDK (Java Development Kit)

**What:** JRE + development tools (compiler, debugger, etc.). It's everything needed to **develop** Java programs.

**Analogy:** JDK is the complete car factory — it has the engine (JVM), all car parts (JRE), AND the tools to build new cars (development tools).

#### How Java Code Runs — Step by Step

```
  HelloWorld.java          (Your source code)
        │
        ▼
  javac HelloWorld.java    (Java Compiler)
        │
        ▼
  HelloWorld.class         (Bytecode — platform independent)
        │
        ▼
  java HelloWorld          (JVM loads and executes)
        │
        ▼
  "Hello, World!"          (Output on your screen)
```

**Why Two Steps?**
- **Step 1 (Compilation):** `javac` converts human-readable `.java` file to bytecode `.class` file
- **Step 2 (Execution):** `java` command starts JVM which reads and executes the `.class` file

This two-step process is what makes Java **platform independent** — the `.class` file can run on ANY operating system that has a JVM.

---

### 🕒 Hour 3: Setting Up Your Development Environment

#### Step 1: Install JDK 17 (or later)

**Download from:** https://adoptium.net/ (Adoptium — recommended) or https://www.oracle.com/java/technologies/downloads/

**Verify installation:**
```bash
java -version
javac -version
```

Expected output:
```
openjdk version "17.0.x" 2022-xx-xx
OpenJDK Runtime Environment Temurin-17.0.x+x (build 17.0.x+x)
OpenJDK 64-Bit Server VM Temurin-17.0.x+x (build 17.0.x+x, mixed mode)
```

#### Step 2: Set JAVA_HOME Environment Variable

**macOS/Linux (add to ~/.bashrc or ~/.zshrc):**
```bash
export JAVA_HOME=$(/usr/libexec/java_home)
export PATH=$JAVA_HOME/bin:$PATH
```

**Windows:**
1. Search "Environment Variables" in Start menu
2. Add `JAVA_HOME` pointing to your JDK installation directory
3. Add `%JAVA_HOME%\bin` to your PATH

#### Step 3: Install IntelliJ IDEA Community Edition

**Download from:** https://www.jetbrains.com/idea/download/

IntelliJ IDEA is the **most popular IDE for Java development**. It provides:
- Intelligent code completion
- Built-in compiler and debugger
- Version control integration
- Powerful refactoring tools

#### Step 4: Create Your First Project in IntelliJ

1. Open IntelliJ IDEA
2. Click "New Project"
3. Select "Java"
4. Choose your JDK (17+)
5. Click "Create"
6. Right-click `src` → New → Java Class → Name it `HelloWorld`

---

### 🕓 Hour 4: Writing Your First Java Program

#### The "Hello, World!" Program

```java
// File: HelloWorld.java
// This is a single-line comment

/*
 * This is a multi-line comment.
 * Our very first Java program!
 */

public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

#### Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `// File: HelloWorld.java` | Single-line comment — ignored by compiler |
| 3-6 | `/* ... */` | Multi-line comment block |
| 8 | `public class HelloWorld` | Declares a public class named `HelloWorld` |
| | `public` | Access modifier — this class is accessible from anywhere |
| | `class` | Keyword to define a class (blueprint for objects) |
| | `HelloWorld` | Name of the class (MUST match the filename) |
| | `{` | Opening brace — starts the class body |
| 9 | `public static void main(String[] args)` | The main method — entry point of the program |
| | `public` | Accessible from anywhere |
| | `static` | Can be called without creating an object |
| | `void` | Returns nothing |
| | `main` | Method name — JVM looks for this specific name |
| | `String[] args` | Array of strings — command-line arguments |
| 10 | `System.out.println(...)` | Prints text to the console |
| | `System` | A built-in class |
| | `out` | Standard output stream |
| | `println` | Method that prints and adds a new line |
| 11 | `}` | Closes the main method |
| 12 | `}` | Closes the class |

#### Expected Output
```
Hello, World!
```

#### Compiling and Running from Command Line

```bash
# Step 1: Navigate to your file's directory
# Step 2: Compile
javac HelloWorld.java

# Step 3: Run (note: no .class extension)
java HelloWorld
```

#### Common Mistakes Beginners Make

| Mistake | Error Message | Fix |
|---------|--------------|-----|
| Filename ≠ class name | `error: class HelloWorld is public, should be declared in a file named HelloWorld.java` | Filename must match class name exactly |
| Missing semicolon | `error: ';' expected` | Add `;` at end of statements |
| Wrong case | `error: cannot find symbol` | Java is case-sensitive: `String` ≠ `string` |
| Missing main method | `Main method not found` | Must have `public static void main(String[] args)` |
| Using `System.out.Println` | `error: cannot find symbol` | It's `println` (lowercase 'p') |

---

### 🕔 Hour 5: More Programs & Understanding Java Syntax

#### Program 2: Printing Multiple Lines

```java
public class MultiLine {
    public static void main(String[] args) {
        System.out.println("My name is Chandu");
        System.out.println("I am learning Java");
        System.out.println("Day 1 of 90");
    }
}
```

**Output:**
```
My name is Chandu
I am learning Java
Day 1 of 90
```

#### print vs println vs printf

```java
public class PrintDemo {
    public static void main(String[] args) {
        // println — prints and moves to next line
        System.out.println("Hello");
        System.out.println("World");
        
        // print — prints but stays on same line
        System.out.print("Hello ");
        System.out.print("World");
        System.out.println(); // just moves to next line
        
        // printf — formatted printing (like Python's f-string)
        String name = "Chandu";
        int age = 22;
        System.out.printf("Name: %s, Age: %d%n", name, age);
    }
}
```

**Output:**
```
Hello
World
Hello World
Name: Chandu, Age: 22
```

#### Format Specifiers for printf

| Specifier | Type | Example |
|-----------|------|---------|
| `%s` | String | `"Hello"` |
| `%d` | Integer | `42` |
| `%f` | Float/Double | `3.14` |
| `%.2f` | Float with 2 decimals | `3.14` |
| `%c` | Character | `'A'` |
| `%b` | Boolean | `true` |
| `%n` | New line | (platform-independent) |

#### Program 3: Escape Sequences

```java
public class EscapeDemo {
    public static void main(String[] args) {
        System.out.println("Hello\tWorld");     // Tab
        System.out.println("Hello\nWorld");     // New line
        System.out.println("She said \"Hi\"");  // Double quotes
        System.out.println("Path: C:\\Users");  // Backslash
        System.out.println("Hello\bWorld");     // Backspace
    }
}
```

**Output:**
```
Hello	World
Hello
World
She said "Hi"
Path: C:\Users
HelloWorld
```

#### Java Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Class | PascalCase | `StudentRecord`, `BankAccount` |
| Method | camelCase | `calculateTotal()`, `getUserName()` |
| Variable | camelCase | `firstName`, `totalAmount` |
| Constant | UPPER_SNAKE_CASE | `MAX_SIZE`, `PI_VALUE` |
| Package | lowercase | `com.company.project` |

---

### 🕕 Hour 6: Revision & Mini Exercises

#### Quick Recap

1. ✅ Java was created by James Gosling at Sun Microsystems in 1995
2. ✅ Java is platform-independent because of JVM
3. ✅ JDK = JRE + Dev Tools; JRE = JVM + Libraries
4. ✅ Java code: `.java` → compile → `.class` → run on JVM
5. ✅ Every Java program needs a class and a `main` method
6. ✅ `System.out.println()` prints to console
7. ✅ Java is case-sensitive and uses semicolons

#### Mini Coding Exercises

**Exercise 1:** Write a program that prints your name, age, and city on separate lines.

```java
public class AboutMe {
    public static void main(String[] args) {
        System.out.println("Name: Chandu");
        System.out.println("Age: 22");
        System.out.println("City: Hyderabad");
    }
}
```

**Exercise 2:** Write a program using `printf` to display formatted output.

```java
public class FormattedOutput {
    public static void main(String[] args) {
        String name = "Chandu";
        int age = 22;
        double gpa = 8.5;
        System.out.printf("Student: %s%n", name);
        System.out.printf("Age: %d years%n", age);
        System.out.printf("GPA: %.1f%n", gpa);
    }
}
```

**Exercise 3:** Write a program that demonstrates all escape sequences.

```java
public class EscapeSequences {
    public static void main(String[] args) {
        System.out.println("Tab:\tHere");
        System.out.println("New Line:\nHere");
        System.out.println("Quote: \"Hello\"");
        System.out.println("Backslash: \\");
        System.out.println("Single Quote: \'A\'");
    }
}
```

---

## 📝 After Study Session (Extra Practice)

### 10 Theory Questions

1. Who created Java and in which year?
2. What does WORA stand for and what does it mean?
3. What is the difference between JDK, JRE, and JVM?
4. What is bytecode? Why is it important?
5. Why does Java need both a compiler AND an interpreter?
6. What is the role of the Garbage Collector in JVM?
7. Why must the filename match the public class name?
8. What is the purpose of the `main` method in Java?
9. What does `public static void main(String[] args)` mean — explain each keyword?
10. What is the difference between `print()`, `println()`, and `printf()`?

### 10 Coding Questions

1. Write a program to print "I love Java" 5 times (use 5 println statements).
2. Write a program to print a triangle pattern using `*` and `println`.
3. Write a program that prints your full introduction (name, education, hobby) using `printf`.
4. Write a program that uses `\t` to create a simple table with headers and data.
5. Write a program that prints a box made of `*` characters (5x5).
6. Write a program to print the lyrics of your favorite song (each line separate).
7. Write a program that uses both `print` and `println` to create a single line of output from multiple print calls.
8. Write a program that prints Java keywords you've learned today, one per line.
9. Write a program that prints a simple "receipt" with item names and prices using `printf`.
10. Write a program with intentional comments explaining each line (practice commenting).

### 5 Debugging Questions

**Debug 1:** Find and fix the error:
```java
public class Debug1 {
    public static void main(String[] args) {
        System.out.println("Hello World")
    }
}
```
*Hint: Missing semicolon*

**Debug 2:** Find and fix the error:
```java
public class debug2 {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```
*Hint: Filename must match class name — but the real issue is the convention. This will compile if the file is named `debug2.java`, but it violates naming conventions.*

**Debug 3:** Find and fix the error:
```java
public class Debug3 {
    public static void Main(String[] args) {
        System.out.println("Hello World");
    }
}
```
*Hint: `Main` should be `main` (lowercase 'm')*

**Debug 4:** Find and fix the error:
```java
public class Debug4 {
    public static void main(String[] args) {
        System.out.Println("Hello World");
    }
}
```
*Hint: `Println` should be `println` (lowercase 'p')*

**Debug 5:** Find and fix the error:
```java
public class Debug5 {
    public static void main(String args) {
        System.out.println("Hello World");
    }
}
```
*Hint: `String args` should be `String[] args` (array of strings)*

### 2 Assignments

**Assignment 1: Personal Bio Program**
Create a Java program called `PersonalBio.java` that prints:
- Your full name
- Your age
- Your city
- Your favorite programming language
- Why you are learning Java
- Your goal for the next 90 days

Use a combination of `println` and `printf` to make the output look professional.

**Assignment 2: ASCII Art**
Create a Java program called `AsciiArt.java` that prints a simple ASCII art picture using `println`. For example, a house, a cat, or a rocket ship.

### 1 Revision Checklist

- [ ] I can explain what Java is in one sentence
- [ ] I know the difference between JDK, JRE, and JVM
- [ ] I can draw the JDK/JRE/JVM diagram from memory
- [ ] I have JDK installed and verified with `java -version`
- [ ] I can write, compile, and run a Java program
- [ ] I know what every word in `public static void main(String[] args)` means
- [ ] I know the difference between `print`, `println`, and `printf`
- [ ] I know Java naming conventions

---

## 📓 Daily Notes

### Common Mistakes Beginners Make
1. **Forgetting semicolons** — Every statement in Java ends with `;`
2. **Case sensitivity** — `System` ≠ `system`, `String` ≠ `string`
3. **Filename mismatch** — Public class name must match filename exactly
4. **Running .java instead of .class** — Use `java ClassName` (no extension)
5. **Not saving before compiling** — Always save your file first

### Important Interview Points
- Java is **platform-independent** at the source level (WORA)
- JVM is **platform-dependent** (different JVM for Windows, Mac, Linux)
- Java is **both compiled AND interpreted**
- Java does **not have pointers** (unlike C/C++) — this is a security feature
- **Garbage Collection** is automatic — you don't need to free memory manually

### Best Coding Practices
- Always name your class starting with an uppercase letter
- Use meaningful class names (not `Test1`, `Demo`)
- Add comments to explain your code
- Keep your code properly indented
- One class per file (for now)

### Frequently Asked Interview Questions
1. **Q: Is Java fully object-oriented?**
   A: No, because it has primitive data types (int, char, etc.) which are not objects.

2. **Q: What is the difference between JDK, JRE, and JVM?**
   A: JDK is for development (includes compiler), JRE is for running (includes JVM + libraries), JVM is the engine that executes bytecode.

3. **Q: Why is Java platform independent?**
   A: Because Java code is compiled to bytecode (.class files), which can run on any platform that has a JVM.

4. **Q: What is bytecode?**
   A: Bytecode is an intermediate representation of your Java code that the JVM can understand and execute. It's not machine code — it's platform-independent.

---

## 📚 Resources

### Official Documentation
- [Java Documentation](https://docs.oracle.com/en/java/)
- [Java Tutorials by Oracle](https://docs.oracle.com/javase/tutorial/)

### YouTube Videos
- [Java Tutorial for Beginners by Programming with Mosh](https://www.youtube.com/watch?v=eIrMbAQSU34)
- [Java Full Course by Bro Code](https://www.youtube.com/watch?v=xk4_1vDrzzo)
- [Core Java by Durga Sir](https://www.youtube.com/playlist?list=PLd3UqWTnYXOkWWJIwMJiYClhFbrvFPGEp)

### Articles
- [Java Overview - GeeksforGeeks](https://www.geeksforgeeks.org/java/)
- [Java Introduction - W3Schools](https://www.w3schools.com/java/java_intro.asp)
- [JVM Architecture - Baeldung](https://www.baeldung.com/jvm-vs-jre-vs-jdk)

### Books
- "Head First Java" by Kathy Sierra & Bert Bates (Best for beginners)
- "Java: The Complete Reference" by Herbert Schildt

### Practice Websites
- [HackerRank Java](https://www.hackerrank.com/domains/java)
- [Codecademy Java](https://www.codecademy.com/learn/learn-java)

---

## ✅ End of Day Checklist

- [ ] I understood today's concepts
- [ ] I installed JDK and IntelliJ IDEA
- [ ] I wrote and ran my first Java program
- [ ] I completed all coding examples from the hour-by-hour plan
- [ ] I solved all 10 coding practice questions
- [ ] I completed both assignments
- [ ] I answered all theory questions
- [ ] I fixed all debugging exercises
- [ ] I revised my notes
- [ ] I am ready for Day 2

---

> **Congratulations! 🎉** You've completed Day 1. You now know what Java is, how it works, and you've written your first program. Tomorrow, we'll dive into variables and data types — the building blocks of every program.
