# 📅 Day 13: Polymorphism

## 🎯 Goal of the Day
Master **polymorphism** — the third pillar of OOP. Understand compile-time (method overloading) and runtime (method overriding) polymorphism, upcasting, downcasting, and the power of programming to interfaces.

---

## 📚 Topics Covered
1. What is Polymorphism? — "Many Forms"
2. Compile-Time Polymorphism (Method Overloading)
3. Runtime Polymorphism (Method Overriding)
4. Upcasting and Downcasting
5. `instanceof` Operator
6. Dynamic Method Dispatch
7. Covariant Return Types

---

## ⏰ Hour-by-Hour Study Plan (6 Hours)

### 🕐 Hour 1: Understanding Polymorphism

**Real-Life Analogy:** A person can be a student, an employee, and a parent simultaneously. The same person behaves differently in different contexts — that's polymorphism.

```java
class Animal {
    void sound() { System.out.println("Some sound"); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Woof! 🐕"); }
}
class Cat extends Animal {
    @Override
    void sound() { System.out.println("Meow! 🐱"); }
}
class Duck extends Animal {
    @Override
    void sound() { System.out.println("Quack! 🦆"); }
}

class PolymorphismDemo {
    public static void main(String[] args) {
        // Runtime polymorphism — parent reference, child object
        Animal animal1 = new Dog();   // Upcasting
        Animal animal2 = new Cat();
        Animal animal3 = new Duck();

        animal1.sound();  // Woof! (Dog's version called)
        animal2.sound();  // Meow! (Cat's version called)
        animal3.sound();  // Quack! (Duck's version called)

        // Same reference type, different behavior — POLYMORPHISM!
        Animal[] animals = {new Dog(), new Cat(), new Duck()};
        for (Animal a : animals) {
            a.sound();  // Dynamic dispatch decides at runtime
        }
    }
}
```

### 🕑 Hour 2: Compile-Time vs Runtime Polymorphism

| Aspect | Compile-Time | Runtime |
|--------|-------------|---------|
| Also called | Static binding, Early binding | Dynamic binding, Late binding |
| Achieved by | Method overloading | Method overriding |
| Resolved at | Compile time | Runtime |
| Performance | Faster | Slightly slower |

### 🕒 Hour 3: Upcasting & Downcasting

```java
Animal a = new Dog();        // Upcasting (implicit, safe)
Dog d = (Dog) a;             // Downcasting (explicit, use instanceof first!)

if (a instanceof Dog) {
    Dog dog = (Dog) a;       // Safe downcasting
    dog.bark();              // Now can call Dog-specific method
}

// Java 16+ Pattern matching for instanceof
if (a instanceof Dog dog) {
    dog.bark();              // 'dog' is already cast!
}
```

### 🕓 Hour 4: Real-World Polymorphism

Build a payment processing system where `Payment` is the parent, and `CreditCard`, `DebitCard`, `UPI` override the `processPayment()` method.

### 🕔 Hour 5: Polymorphism with Arrays & Collections

Process an array of `Shape` objects (Circle, Rectangle, Triangle) and calculate total area polymorphically.

### 🕕 Hour 6: Revision & Practice

---

## 📝 After Study Session (Extra Practice)

### 10 Theory Questions
1. What is polymorphism? What are its types?
2. What is the difference between overloading and overriding?
3. What is dynamic method dispatch?
4. What is upcasting? Is it safe?
5. What is downcasting? Why use instanceof?
6. Can static methods be overridden?
7. Can private methods be overridden?
8. Can final methods be overridden?
9. What are covariant return types?
10. What is the advantage of polymorphism?

### 10 Coding Questions
1-10. Design polymorphic systems: shapes, vehicles, notifications, media players.

### 2 Assignments
**Assignment 1:** Build a notification system (Email, SMS, Push) using polymorphism.
**Assignment 2:** Build a media player that handles Audio, Video, Podcast differently.

---

## ✅ End of Day Checklist
- [ ] I understand compile-time and runtime polymorphism
- [ ] I can use upcasting and downcasting safely
- [ ] I understand dynamic method dispatch
- [ ] I am ready for Day 14
