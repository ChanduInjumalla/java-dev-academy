# 📅 Day 32: Lambda Expressions

## 🎯 Goal of the Day
Begin **Phase 8: Java 8+ Features**. Master lambda expressions — the foundation of functional programming in Java.

## 📚 Topics Covered
1. What are Lambda Expressions?
2. Functional Interfaces (@FunctionalInterface)
3. Lambda Syntax Variations
4. Built-in Functional Interfaces (Predicate, Function, Consumer, Supplier)
5. Method References (::)
6. Lambda vs Anonymous Class

## ⏰ Key Code
```java
// Before lambdas (anonymous class)
Runnable r1 = new Runnable() {
    @Override public void run() { System.out.println("Hello!"); }
};

// With lambda — much cleaner!
Runnable r2 = () -> System.out.println("Hello!");

// Lambda with parameters
Comparator<String> comp = (a, b) -> a.compareTo(b);

// Built-in functional interfaces
Predicate<Integer> isEven = n -> n % 2 == 0;
Function<String, Integer> length = s -> s.length();
Consumer<String> printer = s -> System.out.println(s);
Supplier<Double> random = () -> Math.random();

// Method references
List<String> names = List.of("Alice", "Bob", "Charlie");
names.forEach(System.out::println);  // Method reference
```

## ✅ End of Day Checklist
- [ ] I understand lambda syntax and functional interfaces
- [ ] I can use Predicate, Function, Consumer, Supplier
- [ ] I am ready for Day 33
