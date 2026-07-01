# 📅 Day 12: Inheritance

## 🎯 Goal of the Day
Master **inheritance** — the second pillar of OOP. Learn how classes can inherit fields and methods from parent classes, enabling code reuse and establishing IS-A relationships.

---

## 📚 Topics Covered
1. What is Inheritance? — IS-A Relationship
2. `extends` Keyword
3. `super` Keyword — Calling Parent
4. Method Overriding
5. Types of Inheritance in Java
6. The `Object` Class — Root of All Classes
7. Constructor Chaining with Inheritance
8. `@Override` Annotation

---

## ⏰ Hour-by-Hour Study Plan (6 Hours)

### 🕐 Hour 1: Inheritance Basics

**Real-Life Analogy:** Animals → Dogs, Cats. All animals can eat and sleep (parent class), but dogs bark and cats meow (child-specific behavior).

```java
// Parent class (Superclass/Base class)
class Animal {
    String name;
    int age;

    Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void eat() {
        System.out.println(name + " is eating");
    }

    void sleep() {
        System.out.println(name + " is sleeping");
    }

    void displayInfo() {
        System.out.println("Animal: " + name + ", Age: " + age);
    }
}

// Child class (Subclass/Derived class)
class Dog extends Animal {
    String breed;

    Dog(String name, int age, String breed) {
        super(name, age);  // Call parent constructor
        this.breed = breed;
    }

    void bark() {
        System.out.println(name + " says: Woof! 🐕");
    }

    @Override
    void displayInfo() {
        super.displayInfo();  // Call parent method
        System.out.println("Breed: " + breed);
    }
}

class Cat extends Animal {
    boolean isIndoor;

    Cat(String name, int age, boolean isIndoor) {
        super(name, age);
        this.isIndoor = isIndoor;
    }

    void meow() {
        System.out.println(name + " says: Meow! 🐱");
    }
}

class InheritanceDemo {
    public static void main(String[] args) {
        Dog dog = new Dog("Buddy", 3, "Golden Retriever");
        dog.eat();          // Inherited from Animal
        dog.bark();         // Dog's own method
        dog.displayInfo();  // Overridden method

        Cat cat = new Cat("Whiskers", 2, true);
        cat.eat();          // Inherited
        cat.meow();         // Cat's own method
    }
}
```

### 🕑 Hour 2: super Keyword & Method Overriding

```java
class Shape {
    String color;
    Shape(String color) { this.color = color; }
    double area() { return 0; }
    void display() {
        System.out.println("Color: " + color + ", Area: " + area());
    }
}

class Circle extends Shape {
    double radius;
    Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    double area() { return Math.PI * radius * radius; }
}

class Rectangle extends Shape {
    double length, width;
    Rectangle(String color, double length, double width) {
        super(color);
        this.length = length;
        this.width = width;
    }

    @Override
    double area() { return length * width; }
}
```

### 🕒 Hour 3: Types of Inheritance

```
Single:    A → B
Multilevel: A → B → C
Hierarchical: A → B, A → C

Java does NOT support multiple inheritance with classes (A,B → C)
(Use interfaces instead — covered in Day 14)
```

### 🕓 Hour 4: Constructor Chaining & The Object Class

Every class implicitly extends `Object`. Key Object methods: `toString()`, `equals()`, `hashCode()`, `getClass()`.

### 🕔 Hour 5: Real-World Inheritance Example

Build an Employee hierarchy: `Employee` → `Manager`, `Developer`, `Intern` with salary calculation.

### 🕕 Hour 6: Revision & Practice

---

## 📝 After Study Session (Extra Practice)

### 10 Theory Questions
1. What is inheritance? What relationship does it represent?
2. What is the `extends` keyword?
3. What is the `super` keyword? Give 3 uses.
4. What is method overriding? Rules?
5. Why doesn't Java support multiple inheritance with classes?
6. What is the `Object` class?
7. What is constructor chaining in inheritance?
8. Can a constructor be inherited?
9. What is the `@Override` annotation? Is it mandatory?
10. What is the difference between IS-A and HAS-A relationships?

### 10 Coding Questions
1-10. Build class hierarchies: Vehicle→Car/Bike, Shape→Circle/Rectangle, Person→Student/Teacher.

### 2 Assignments
**Assignment 1:** Build a Vehicle hierarchy with fuel consumption calculations.
**Assignment 2:** Build a Payment system: Payment→CreditCard/UPI/BankTransfer.

---

## ✅ End of Day Checklist
- [ ] I understand inheritance and IS-A relationship
- [ ] I can use extends, super, and @Override
- [ ] I know the types of inheritance Java supports
- [ ] I am ready for Day 13
