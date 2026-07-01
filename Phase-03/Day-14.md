# 📅 Day 14: Abstraction — Abstract Classes & Interfaces

## 🎯 Goal of the Day
Master **abstraction** — the fourth pillar of OOP. Learn when to use abstract classes vs interfaces, and how they enable powerful design patterns.

---

## 📚 Topics Covered
1. What is Abstraction?
2. Abstract Classes — partial abstraction
3. Abstract Methods
4. Interfaces — complete abstraction
5. Abstract Class vs Interface — When to Use Which
6. Default & Static Methods in Interfaces (Java 8+)
7. Multiple Interface Implementation
8. Functional Interfaces (preview for lambdas)

---

## ⏰ Hour-by-Hour Study Plan (6 Hours)

### 🕐 Hour 1: Abstract Classes

```java
// Cannot instantiate an abstract class
abstract class Shape {
    String color;

    Shape(String color) { this.color = color; }

    // Abstract method — no body, MUST be implemented by subclasses
    abstract double area();
    abstract double perimeter();

    // Concrete method — has implementation
    void display() {
        System.out.printf("Shape[color=%s, area=%.2f, perimeter=%.2f]%n",
                color, area(), perimeter());
    }
}

class Circle extends Shape {
    double radius;
    Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    @Override double area() { return Math.PI * radius * radius; }
    @Override double perimeter() { return 2 * Math.PI * radius; }
}

class Rectangle extends Shape {
    double length, width;
    Rectangle(String color, double length, double width) {
        super(color);
        this.length = length;
        this.width = width;
    }
    @Override double area() { return length * width; }
    @Override double perimeter() { return 2 * (length + width); }
}
```

### 🕑 Hour 2: Interfaces

```java
interface Drawable {
    void draw();  // implicitly public abstract
    double getArea();
}

interface Resizable {
    void resize(double factor);
}

// A class can implement multiple interfaces!
class Square implements Drawable, Resizable {
    double side;

    Square(double side) { this.side = side; }

    @Override
    public void draw() { System.out.println("Drawing square with side " + side); }

    @Override
    public double getArea() { return side * side; }

    @Override
    public void resize(double factor) { side *= factor; }
}
```

### 🕒 Hour 3: Abstract Class vs Interface

| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Methods | Abstract + concrete | Abstract + default + static |
| Fields | Any type | Only public static final |
| Constructor | Yes | No |
| Inheritance | Single only | Multiple allowed |
| Access modifiers | Any | Public only (for methods) |
| Use when | Common base + some shared code | Define a contract/capability |

### 🕓 Hour 4: Default & Static Methods in Interfaces (Java 8+)

```java
interface Logger {
    void log(String message);

    // Default method — provides default implementation
    default void logInfo(String message) {
        log("INFO: " + message);
    }

    // Static method
    static Logger getConsoleLogger() {
        return message -> System.out.println("[LOG] " + message);
    }
}
```

### 🕔 Hour 5: Real-World Interface Design

Design a plugin system using interfaces: `Plugin`, `AudioPlugin`, `VideoPlugin`.

### 🕕 Hour 6: Revision & Practice

---

## 📝 After Study Session (Extra Practice)

### 10 Theory Questions
1. What is abstraction?
2. What is an abstract class? Can it be instantiated?
3. What is an interface?
4. Abstract class vs interface — differences?
5. Can an abstract class have constructors?
6. What are default methods in interfaces?
7. Can a class extend multiple classes?
8. Can a class implement multiple interfaces?
9. What is a marker interface?
10. What is a functional interface?

### 10 Coding Questions
Build abstract class and interface hierarchies for real scenarios.

### 2 Assignments
**Assignment 1:** Design a vehicle rental system with interfaces.
**Assignment 2:** Build a plugin system for a text editor.

---

## ✅ End of Day Checklist
- [ ] I understand abstract classes and interfaces
- [ ] I know when to use which
- [ ] I can implement multiple interfaces
- [ ] I am ready for Day 15
