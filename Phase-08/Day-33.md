# 📅 Day 33: Streams API (Part 1)

## 🎯 Goal of the Day
Master the Streams API — Java's powerful data processing pipeline.

## 📚 Topics Covered
1. What are Streams? (not I/O streams!)
2. Creating Streams
3. Intermediate Operations (filter, map, sorted, distinct, limit, skip)
4. Terminal Operations (forEach, collect, count, reduce)
5. Stream Pipeline Architecture

## ⏰ Key Code
```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Filter even, double them, collect to list
List<Integer> result = numbers.stream()
    .filter(n -> n % 2 == 0)        // Keep even: [2,4,6,8,10]
    .map(n -> n * 2)                // Double: [4,8,12,16,20]
    .sorted()                       // Sort
    .collect(Collectors.toList());   // Collect to List
System.out.println(result);         // [4, 8, 12, 16, 20]

// Chaining operations
long count = names.stream()
    .filter(name -> name.length() > 4)
    .count();

// reduce — combine elements
int sum = numbers.stream().reduce(0, Integer::sum);  // 55

// String operations
String csv = names.stream().collect(Collectors.joining(", "));
```

## ✅ End of Day Checklist
- [ ] I understand stream pipeline (source → operations → terminal)
- [ ] I can use filter, map, sorted, collect, reduce
- [ ] I am ready for Day 34
