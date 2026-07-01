# 🎯 Java Developer Interview Preparation

## Table of Contents
1. [Core Java Questions](#core-java)
2. [OOP Questions](#oop)
3. [Collections Questions](#collections)
4. [Exception Handling Questions](#exceptions)
5. [Multithreading Questions](#multithreading)
6. [Java 8+ Questions](#java-8)
7. [Spring & Spring Boot Questions](#spring)
8. [REST API Questions](#rest-api)
9. [Database & JPA Questions](#database)
10. [Coding Problems](#coding)
11. [HR & Behavioral Questions](#hr)

---

## Core Java

### Top 30 Core Java Interview Questions

1. **What is Java? Why is it platform-independent?**
   - Java is a high-level, OOP language. Platform-independent because Java code compiles to bytecode that runs on JVM, which is available for all platforms.

2. **What is the difference between JDK, JRE, and JVM?**
   - JDK = JRE + Development tools (compiler, debugger)
   - JRE = JVM + Class libraries (runtime environment)
   - JVM = Engine that executes bytecode

3. **Why are Strings immutable in Java?**
   - Security (used in class loading, networking)
   - Thread safety
   - String Pool optimization
   - HashCode caching

4. **What is the difference between `==` and `.equals()`?**
   - `==` compares references (memory addresses)
   - `.equals()` compares content (values)
   - For Strings: always use `.equals()`

5. **What is the String Pool?**
   - A special memory area in heap where String literals are stored
   - If a String with same content exists, reference is reused
   - `new String("abc")` bypasses the pool

6. **What are wrapper classes? What is autoboxing?**
   - Wrapper classes provide object versions of primitives (Integer, Double)
   - Autoboxing: automatic conversion from primitive to wrapper
   - Unboxing: automatic conversion from wrapper to primitive

7. **What is the `final` keyword?**
   - `final` variable: cannot be reassigned
   - `final` method: cannot be overridden
   - `final` class: cannot be extended

8. **What is the `static` keyword?**
   - `static` field: belongs to class, shared by all objects
   - `static` method: can be called without object
   - `static` block: executed once when class loads
   - `static` inner class: doesn't need outer class instance

9. **Explain `pass by value` in Java.**
   - Java is always pass-by-value
   - For primitives: a copy of the value is passed
   - For objects: a copy of the reference is passed (but points to same object)

10. **What are access modifiers in Java?**
    - `private`: same class only
    - `default` (no modifier): same package
    - `protected`: same package + subclasses
    - `public`: everywhere

---

## OOP

### Top 20 OOP Questions

1. **What are the four pillars of OOP?**
   - Encapsulation, Inheritance, Polymorphism, Abstraction

2. **What is the difference between abstract class and interface?**
   - Abstract class: partial abstraction, can have constructors, fields, concrete methods; single inheritance
   - Interface: full abstraction (before Java 8), no constructors, only constants; multiple inheritance

3. **What is method overloading vs method overriding?**
   - Overloading: same name, different parameters (compile-time polymorphism)
   - Overriding: same name and parameters in child class (runtime polymorphism)

4. **Can we override static methods? Private methods?**
   - Static methods: No (they are hidden, not overridden)
   - Private methods: No (not visible to subclass)

5. **What is the diamond problem? How does Java solve it?**
   - When a class inherits from two classes with same method
   - Java prevents this by not allowing multiple class inheritance
   - With interfaces (default methods), you must override the conflicting method

---

## Collections

### Top 15 Collections Questions

1. **ArrayList vs LinkedList?**
   - ArrayList: O(1) random access, O(n) insert/delete in middle
   - LinkedList: O(n) random access, O(1) insert/delete at ends

2. **HashMap internal working?**
   - Array of buckets, each bucket is a linked list (or tree after Java 8)
   - Key → hashCode() → index → store in bucket
   - Collisions handled by separate chaining

3. **HashMap vs TreeMap vs LinkedHashMap?**
   - HashMap: unordered, O(1) operations
   - TreeMap: sorted by keys, O(log n) operations
   - LinkedHashMap: insertion-ordered, O(1) operations

4. **What is the equals() and hashCode() contract?**
   - If `a.equals(b)` is true, then `a.hashCode() == b.hashCode()`
   - If hashCodes are equal, objects may or may not be equal
   - Must override both together

---

## Spring & Spring Boot

### Top 25 Spring Boot Questions

1. **What is Spring Boot? How is it different from Spring?**
   - Spring Boot is an opinionated framework that simplifies Spring configuration
   - Auto-configuration, starter dependencies, embedded server
   - No XML configuration needed

2. **What is Dependency Injection?**
   - IoC pattern where dependencies are provided (injected) rather than created
   - Types: Constructor (preferred), Setter, Field injection
   - Promotes loose coupling

3. **What are Spring Boot Starter dependencies?**
   - Pre-configured dependency bundles (e.g., spring-boot-starter-web)
   - Reduce dependency management overhead

4. **What is @SpringBootApplication?**
   - Combines @Configuration + @EnableAutoConfiguration + @ComponentScan

5. **What is auto-configuration?**
   - Spring Boot automatically configures beans based on classpath
   - E.g., adds DataSource if JDBC driver is on classpath

6. **Explain the @RestController annotation.**
   - Combines @Controller + @ResponseBody
   - Methods return data directly (JSON) instead of view names

7. **What is Spring Security? How does JWT work?**
   - Framework for authentication and authorization
   - JWT: Token-based auth — login → token → subsequent requests include token

---

## Coding Problems

### Common Coding Interview Questions

1. Reverse a String
2. Check if a String is palindrome
3. Find duplicates in an array
4. Two Sum problem (find pair that sums to target)
5. FizzBuzz
6. Fibonacci (iterative and recursive)
7. Check if a number is prime
8. Find the missing number in array 1 to n
9. Reverse a linked list
10. Check balanced parentheses using Stack
11. Merge two sorted arrays
12. Binary search
13. Find the second largest element in an array
14. Remove duplicates from sorted array
15. Implement a simple LRU Cache

---

## HR & Behavioral Questions

1. Tell me about yourself.
2. Why do you want to be a Java Developer?
3. What are your strengths and weaknesses?
4. Where do you see yourself in 5 years?
5. Tell me about a challenging project.
6. How do you handle tight deadlines?
7. Do you prefer working alone or in a team?
8. How do you stay updated with technology?
9. What do you know about our company?
10. Do you have any questions for us?

### Tips for HR Rounds
- Research the company beforehand
- Prepare STAR method answers (Situation, Task, Action, Result)
- Show enthusiasm for Java development
- Ask thoughtful questions about team, projects, and growth
- Be honest about your experience level as a fresher
- Highlight your 90-day learning journey and projects
