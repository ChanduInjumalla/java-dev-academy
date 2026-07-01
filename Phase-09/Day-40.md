# 📅 Day 40: Design Patterns (Part 2) & Enums Deep Dive

## 🎯 Goal of the Day
Continue design patterns and master Java Enums as more than simple constants.

## 📚 Topics Covered
1. Strategy Pattern
2. Adapter Pattern
3. Decorator Pattern
4. Enum Deep Dive (methods, fields, abstract methods in enums)
5. Enum as Singleton
6. Phase 9 Review

## ⏰ Key Code
```java
// Strategy Pattern
interface SortStrategy { void sort(int[] arr); }
class BubbleSortStrategy implements SortStrategy { /*...*/ }
class QuickSortStrategy implements SortStrategy { /*...*/ }

// Rich Enum
enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6);

    private final double mass, radius;
    Planet(double mass, double radius) { this.mass = mass; this.radius = radius; }
    double surfaceGravity() { return 6.67300E-11 * mass / (radius * radius); }
}
```

## ✅ End of Day Checklist — Phase 9 Complete!
- [ ] I know Strategy, Adapter, Decorator patterns
- [ ] I understand rich Enums
- [ ] Ready for Phase 10: Database
