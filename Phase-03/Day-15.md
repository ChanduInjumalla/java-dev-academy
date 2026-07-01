# 📅 Day 15: Advanced OOP — static, final, Inner Classes, Object Class

## 🎯 Goal of the Day
Deep dive into advanced OOP concepts: `static` keyword, `final` keyword, inner classes, and the `Object` class methods.

## 📚 Topics Covered
1. `static` keyword — fields, methods, blocks, nested classes
2. `final` keyword — variables, methods, classes
3. Inner Classes — member, local, anonymous, static nested
4. Object Class — toString(), equals(), hashCode(), clone()
5. Singleton Pattern (using static + private constructor)

## ⏰ Hour-by-Hour Study Plan (6 Hours)

### 🕐 Hour 1: static Keyword
```java
class Counter {
    static int count = 0;  // Shared across ALL objects
    String name;

    Counter(String name) {
        this.name = name;
        count++;  // Incremented for every new object
    }

    static int getCount() { return count; }  // static method

    static {
        System.out.println("Static block executed ONCE when class loads");
    }
}
```
- `static` fields belong to the CLASS, not objects
- `static` methods can be called without creating an object
- `static` blocks run once when the class is loaded
- `static` methods cannot access instance members

### 🕑 Hour 2: final Keyword
```java
final class ImmutablePoint {           // Cannot be extended
    private final int x, y;            // Cannot be reassigned

    ImmutablePoint(int x, int y) { this.x = x; this.y = y; }
    final int getX() { return x; }     // Cannot be overridden
}
```

### 🕒 Hour 3: Inner Classes
```java
class Outer {
    private int x = 10;

    class Inner {
        void display() { System.out.println("x = " + x); }  // Can access private
    }

    static class StaticNested {
        void display() { System.out.println("Static nested class"); }
    }
}
// Anonymous class — commonly used with interfaces
Runnable r = new Runnable() {
    @Override public void run() { System.out.println("Anonymous!"); }
};
```

### 🕓 Hour 4: Object Class Methods (equals, hashCode, toString)
### 🕔 Hour 5: Singleton Pattern & Enum Classes
### 🕕 Hour 6: Revision & Practice

## 📝 After Study Session (Extra Practice)
### 10 Theory Questions
1-10. Questions on static, final, inner classes, Object class methods.

### 10 Coding Questions
1-10. Implement singleton, static utilities, inner class patterns.

### 2 Assignments
**Assignment 1:** Build a Logger utility class using Singleton pattern.
**Assignment 2:** Build a Math utility class with static methods.

## ✅ End of Day Checklist
- [ ] I understand static fields, methods, and blocks
- [ ] I know when to use final on variables, methods, and classes
- [ ] I understand inner class types
- [ ] I can override equals(), hashCode(), and toString()
- [ ] I am ready for Day 16
