# 📅 Day 11: Encapsulation & Access Modifiers

## 🎯 Goal of the Day
Master **encapsulation** — the first pillar of OOP. Learn to protect your data using access modifiers and provide controlled access through getters and setters. Understand packages and how Java organizes code.

---

## 📚 Topics Covered
1. What is Encapsulation? — Data Hiding
2. Access Modifiers (private, default, protected, public)
3. Getters and Setters
4. Data Validation in Setters
5. Packages — Organizing Your Code
6. Java Bean Convention (POJO)
7. Immutable Classes

---

## ⏰ Hour-by-Hour Study Plan (6 Hours)

### 🕐 Hour 1: Understanding Encapsulation

**Real-Life Analogy:** A bank ATM. You can deposit/withdraw (public methods), but you can't directly access the vault (private fields). The ATM validates your PIN and checks your balance before allowing transactions.

```java
// ❌ WITHOUT Encapsulation — anyone can set invalid data!
class StudentBad {
    String name;
    int age;     // Can be set to -5!
    double gpa;  // Can be set to 99.0!
}

// ✅ WITH Encapsulation — data is protected
class StudentGood {
    private String name;
    private int age;
    private double gpa;

    public String getName() { return name; }

    public void setName(String name) {
        if (name != null && !name.isEmpty()) {
            this.name = name;
        }
    }

    public int getAge() { return age; }

    public void setAge(int age) {
        if (age > 0 && age < 150) {
            this.age = age;
        } else {
            System.out.println("Invalid age!");
        }
    }

    public double getGpa() { return gpa; }

    public void setGpa(double gpa) {
        if (gpa >= 0.0 && gpa <= 10.0) {
            this.gpa = gpa;
        }
    }
}
```

### 🕑 Hour 2: Access Modifiers Deep Dive

| Modifier | Same Class | Same Package | Subclass | Other Package |
|----------|-----------|-------------|----------|---------------|
| `private` | ✅ | ❌ | ❌ | ❌ |
| `default` (none) | ✅ | ✅ | ❌ | ❌ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `public` | ✅ | ✅ | ✅ | ✅ |

```java
public class AccessDemo {
    private int privateVar = 1;    // Only this class
    int defaultVar = 2;           // Same package
    protected int protectedVar = 3; // Same package + subclasses
    public int publicVar = 4;      // Everywhere
}
```

### 🕒 Hour 3: Packages & Java Bean Convention

```java
package com.company.models;

// Java Bean / POJO (Plain Old Java Object)
public class Employee {
    private int id;
    private String name;
    private double salary;

    // No-arg constructor
    public Employee() {}

    // All-args constructor
    public Employee(int id, String name, double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    // Getters and Setters for all fields
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getSalary() { return salary; }
    public void setSalary(double salary) { this.salary = salary; }

    @Override
    public String toString() {
        return "Employee{id=" + id + ", name='" + name + "', salary=" + salary + "}";
    }
}
```

### 🕓 Hour 4: Immutable Classes

```java
// An immutable class — once created, cannot be changed
public final class ImmutablePerson {
    private final String name;
    private final int age;

    public ImmutablePerson(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public int getAge() { return age; }
    // No setters!

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}
```

### 🕔 Hour 5: Practice — Bank Account with Encapsulation

Build a fully encapsulated `BankAccount` class with validation on deposits, withdrawals, and interest calculation.

### 🕕 Hour 6: Revision & Mini Exercises

---

## 📝 After Study Session (Extra Practice)

### 10 Theory Questions
1. What is encapsulation? Why is it important?
2. List all four access modifiers and their scopes.
3. What is the difference between `private` and `protected`?
4. What is a getter/setter? Why not just make fields public?
5. What is a POJO/Java Bean?
6. How do you create an immutable class in Java?
7. What is a package? Why do we use packages?
8. What is the `default` access modifier?
9. Can a class be `private`? Why or why not?
10. What is data hiding? How is it achieved?

### 10 Coding Questions
1. Create an encapsulated `Student` class with validation.
2. Create a `Temperature` class that only accepts valid temperatures.
3. Create an immutable `Coordinate` class.
4. Create a `Password` class that validates password strength.
5-10. More encapsulation-focused exercises.

### 2 Assignments
**Assignment 1:** Build a `Contact` class (phone book entry) with full encapsulation.
**Assignment 2:** Build a `Product` class with inventory management methods.

---

## ✅ End of Day Checklist
- [ ] I understand encapsulation and data hiding
- [ ] I know all four access modifiers
- [ ] I can write proper getters/setters with validation
- [ ] I understand packages
- [ ] I can create immutable classes
- [ ] I am ready for Day 12
