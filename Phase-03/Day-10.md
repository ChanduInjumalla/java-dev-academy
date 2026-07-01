# 📅 Day 10: Classes and Objects — The Heart of Java

## 🎯 Goal of the Day

Today marks the beginning of **Phase 3: Object-Oriented Programming** — the most important phase in your Java journey. You will learn about **classes and objects**, the fundamental building blocks of OOP. By the end of today, you'll create your own classes, instantiate objects, and understand constructors.

---

## 📚 Topics Covered

1. What is OOP? — The Four Pillars
2. Classes — Blueprints for Objects
3. Objects — Instances of Classes
4. Fields (Instance Variables) & Methods
5. Constructors — Default, Parameterized, Copy
6. `this` Keyword
7. `new` Keyword & Memory Allocation
8. Real-World Class Design

---

## ⏰ Hour-by-Hour Study Plan (6 Hours)

---

### 🕐 Hour 1: Introduction to OOP & Classes

#### What is OOP?

**Object-Oriented Programming** is a programming paradigm based on the concept of **objects** that contain **data** (fields) and **behavior** (methods).

**Real-Life Analogy:** Think of a **car**:
- **Class** = The blueprint/design of a car
- **Object** = An actual car built from that blueprint
- **Fields** = Color, speed, fuel level (data)
- **Methods** = Start(), brake(), accelerate() (behavior)

#### The Four Pillars of OOP

| Pillar | Description | Analogy |
|--------|------------|---------|
| **Encapsulation** | Bundling data + methods, hiding internals | A TV remote — you press buttons without knowing circuits |
| **Inheritance** | Creating new classes from existing ones | Children inherit traits from parents |
| **Polymorphism** | One interface, multiple implementations | A person acts differently as student, employee, friend |
| **Abstraction** | Showing essential features, hiding complexity | Driving a car without knowing engine internals |

#### Creating a Class

```java
public class Student {
    // Fields (instance variables) — the data
    String name;
    int age;
    double gpa;

    // Method — the behavior
    void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("GPA: " + gpa);
    }

    void study(String subject) {
        System.out.println(name + " is studying " + subject);
    }
}
```

#### Creating Objects

```java
public class Main {
    public static void main(String[] args) {
        // Creating objects using 'new' keyword
        Student s1 = new Student();
        s1.name = "Chandu";
        s1.age = 22;
        s1.gpa = 8.5;
        s1.displayInfo();
        s1.study("Java");

        Student s2 = new Student();
        s2.name = "Ravi";
        s2.age = 21;
        s2.gpa = 9.0;
        s2.displayInfo();

        // Both are Student objects but with different data
    }
}
```

**Memory Layout:**

```
    Stack                      Heap
┌──────────┐           ┌─────────────────┐
│ s1 ──────┼──────────→│ Student Object   │
│          │           │ name = "Chandu"  │
│          │           │ age = 22         │
│          │           │ gpa = 8.5        │
│          │           └─────────────────┘
│ s2 ──────┼──────────→┌─────────────────┐
│          │           │ Student Object   │
│          │           │ name = "Ravi"    │
│          │           │ age = 21         │
│          │           │ gpa = 9.0        │
└──────────┘           └─────────────────┘
```

---

### 🕑 Hour 2: Constructors

#### What is a Constructor?

A **constructor** is a special method that is called **automatically** when you create an object. It initializes the object's fields.

**Rules:**
- Same name as the class
- No return type (not even void)
- Called automatically with `new`
- Can be overloaded

```java
public class BankAccount {
    String owner;
    double balance;
    String accountNumber;

    // Default constructor (no parameters)
    BankAccount() {
        this.owner = "Unknown";
        this.balance = 0.0;
        this.accountNumber = "N/A";
        System.out.println("Default account created");
    }

    // Parameterized constructor
    BankAccount(String owner, double balance, String accountNumber) {
        this.owner = owner;
        this.balance = balance;
        this.accountNumber = accountNumber;
        System.out.println("Account created for " + owner);
    }

    // Copy constructor
    BankAccount(BankAccount other) {
        this.owner = other.owner;
        this.balance = other.balance;
        this.accountNumber = other.accountNumber + "_COPY";
    }

    void displayBalance() {
        System.out.printf("%s's Balance: ₹%.2f%n", owner, balance);
    }

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.printf("Deposited ₹%.2f. New Balance: ₹%.2f%n", amount, balance);
        }
    }

    void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.printf("Withdrawn ₹%.2f. New Balance: ₹%.2f%n", amount, balance);
        } else {
            System.out.println("Insufficient funds!");
        }
    }
}

class BankDemo {
    public static void main(String[] args) {
        BankAccount acc1 = new BankAccount();  // Default constructor
        BankAccount acc2 = new BankAccount("Chandu", 50000, "ACC001");

        acc2.deposit(10000);
        acc2.withdraw(5000);
        acc2.displayBalance();

        BankAccount acc3 = new BankAccount(acc2);  // Copy constructor
        acc3.displayBalance();
    }
}
```

---

### 🕒 Hour 3: `this` Keyword Deep Dive

```java
public class Employee {
    String name;
    int id;
    double salary;

    // 'this' refers to the current object
    Employee(String name, int id, double salary) {
        this.name = name;       // this.name = field, name = parameter
        this.id = id;
        this.salary = salary;
    }

    // Constructor chaining using this()
    Employee(String name, int id) {
        this(name, id, 30000.0);  // Calls 3-param constructor
    }

    Employee(String name) {
        this(name, 0);  // Calls 2-param constructor
    }

    void display() {
        System.out.printf("ID: %d, Name: %s, Salary: ₹%.2f%n", id, name, salary);
    }

    // Method returning 'this' for method chaining
    Employee setName(String name) {
        this.name = name;
        return this;
    }

    Employee setSalary(double salary) {
        this.salary = salary;
        return this;
    }
}

class EmployeeDemo {
    public static void main(String[] args) {
        Employee e1 = new Employee("Chandu", 101, 75000);
        e1.display();

        Employee e2 = new Employee("Ravi", 102);
        e2.display();

        // Method chaining
        Employee e3 = new Employee("Priya")
                .setName("Priya Singh")
                .setSalary(65000);
        e3.display();
    }
}
```

---

### 🕓 Hour 4: Real-World Class Design

```java
public class Product {
    private String name;
    private double price;
    private int quantity;
    private static int totalProducts = 0;

    Product(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        totalProducts++;
    }

    double getTotalValue() {
        return price * quantity;
    }

    void displayProduct() {
        System.out.printf("%-20s ₹%8.2f  Qty: %3d  Total: ₹%10.2f%n",
                name, price, quantity, getTotalValue());
    }

    static int getTotalProducts() {
        return totalProducts;
    }
}

class ShopDemo {
    public static void main(String[] args) {
        Product[] products = {
            new Product("Laptop", 55000, 5),
            new Product("Mouse", 500, 20),
            new Product("Keyboard", 1500, 15),
            new Product("Monitor", 15000, 8)
        };

        System.out.println("=== INVENTORY ===");
        System.out.printf("%-20s %10s  %5s  %12s%n", "Product", "Price", "Qty", "Total");
        System.out.println("-".repeat(55));

        double grandTotal = 0;
        for (Product p : products) {
            p.displayProduct();
            grandTotal += p.getTotalValue();
        }

        System.out.println("-".repeat(55));
        System.out.printf("Total Products: %d | Grand Total: ₹%.2f%n",
                Product.getTotalProducts(), grandTotal);
    }
}
```

---

### 🕔 Hour 5: Object Interaction & toString()

```java
public class Rectangle {
    double length, width;

    Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    double area() { return length * width; }
    double perimeter() { return 2 * (length + width); }

    // Override toString for meaningful print
    @Override
    public String toString() {
        return String.format("Rectangle[%.1f x %.1f, Area=%.1f]", length, width, area());
    }

    // Override equals for content comparison
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Rectangle other = (Rectangle) obj;
        return length == other.length && width == other.width;
    }
}

class RectangleDemo {
    public static void main(String[] args) {
        Rectangle r1 = new Rectangle(5, 3);
        Rectangle r2 = new Rectangle(5, 3);

        System.out.println(r1);              // Calls toString()
        System.out.println(r1.equals(r2));   // true (content comparison)
        System.out.println(r1 == r2);        // false (different objects)
    }
}
```

---

### 🕕 Hour 6: Revision & Mini Project

Build a `Student Management System` with a `Student` class that has constructors, methods for adding grades, calculating GPA, and displaying student info.

---

## 📝 After Study Session (Extra Practice)

### 10 Theory Questions
1. What is the difference between a class and an object?
2. What is a constructor? How is it different from a method?
3. What is the purpose of the `this` keyword?
4. What is constructor overloading? Give an example.
5. What is constructor chaining?
6. What is the default constructor? When is it created automatically?
7. Can a constructor be private? When would you use this?
8. What is the `new` keyword? What does it do?
9. Where are objects stored in memory? Where are references stored?
10. What is the `toString()` method? Why should you override it?

### 10 Coding Questions
1. Create a `Book` class with title, author, price, and methods to display and apply discount.
2. Create a `Circle` class with radius, and methods for area, circumference, and comparison.
3. Create a `Time` class with hours, minutes, seconds, and methods to add two times.
4. Create a `BankAccount` class with deposit, withdraw, and transfer methods.
5. Create a `Car` class with make, model, speed, and methods to accelerate and brake.
6-10. Build increasingly complex class designs.

### 2 Assignments
**Assignment 1:** Student Management System — CRUD operations on students.
**Assignment 2:** Library Book Tracker — Track books with checkout/return.

---

## ✅ End of Day Checklist

- [ ] I can create classes with fields and methods
- [ ] I understand constructors (default, parameterized, copy)
- [ ] I know how to use the `this` keyword
- [ ] I understand memory allocation for objects
- [ ] I completed all practice questions
- [ ] I am ready for Day 11
