# 📅 Day 34: Streams API (Part 2)

## 🎯 Goal of the Day
Advanced Streams: Collectors, grouping, partitioning, flatMap, and parallel streams.

## 📚 Topics Covered
1. Collectors (toList, toSet, toMap, joining)
2. Collectors.groupingBy & partitioningBy
3. flatMap — flattening nested structures
4. Stream of Objects
5. Parallel Streams
6. Stream Best Practices & Pitfalls

## ⏰ Key Code
```java
// groupingBy
Map<String, List<Employee>> byDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDepartment));

// partitioningBy
Map<Boolean, List<Integer>> evenOdd = numbers.stream()
    .collect(Collectors.partitioningBy(n -> n % 2 == 0));

// flatMap
List<List<Integer>> nestedList = List.of(List.of(1,2), List.of(3,4));
List<Integer> flat = nestedList.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList());  // [1, 2, 3, 4]

// Parallel streams (use for large datasets)
long sum = numbers.parallelStream().mapToLong(Long::valueOf).sum();
```

## ✅ End of Day Checklist
- [ ] I can use advanced Collectors
- [ ] I understand groupingBy and partitioningBy
- [ ] I know when to use parallel streams
- [ ] I am ready for Day 35
