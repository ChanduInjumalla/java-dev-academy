# 📅 Day 37: Generics

## 🎯 Goal of the Day
Begin **Phase 9: Advanced Java**. Master generics — type-safe programming that eliminates ClassCastException.

## 📚 Topics Covered
1. Why Generics? (Type safety)
2. Generic Classes
3. Generic Methods
4. Bounded Type Parameters (extends, super)
5. Wildcards (?, ? extends T, ? super T)
6. Type Erasure
7. PECS Principle (Producer Extends, Consumer Super)

## ⏰ Key Code
```java
// Generic class
class Box<T> {
    private T item;
    public void set(T item) { this.item = item; }
    public T get() { return item; }
}
Box<String> stringBox = new Box<>();
stringBox.set("Hello");

// Generic method
static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) > 0 ? a : b;
}

// Wildcards
void printList(List<?> list) { }                    // Any type
void printNumbers(List<? extends Number> list) { }   // Number or subclass
void addIntegers(List<? super Integer> list) { }     // Integer or superclass
```

## ✅ End of Day Checklist
- [ ] I can write generic classes and methods
- [ ] I understand bounded types and wildcards
- [ ] I am ready for Day 38
