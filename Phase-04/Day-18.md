# 📅 Day 18: Set Interface — HashSet, TreeSet, LinkedHashSet

## 🎯 Goal of the Day
Master the `Set` interface — collections that store **unique elements only**. Understand hashing, TreeSet ordering, and when to use each implementation.

## 📚 Topics Covered
1. Set Interface — no duplicates
2. HashSet — unordered, fastest
3. LinkedHashSet — insertion order
4. TreeSet — sorted order
5. How Hashing Works
6. equals() and hashCode() Contract
7. Set Operations (union, intersection, difference)

## ⏰ Hour-by-Hour Study Plan (6 Hours)

### 🕐 Hour 1: HashSet Basics
```java
Set<String> fruits = new HashSet<>();
fruits.add("Apple");
fruits.add("Banana");
fruits.add("Apple");  // Duplicate — NOT added
System.out.println(fruits);  // [Apple, Banana] — no order guarantee
System.out.println(fruits.size());  // 2
```

### 🕑 Hour 2: TreeSet & LinkedHashSet
```java
TreeSet<Integer> sorted = new TreeSet<>(List.of(5, 2, 8, 1, 9));
System.out.println(sorted);  // [1, 2, 5, 8, 9] — sorted!
sorted.first();  // 1
sorted.last();   // 9

LinkedHashSet<String> ordered = new LinkedHashSet<>();
ordered.add("C"); ordered.add("A"); ordered.add("B");
System.out.println(ordered);  // [C, A, B] — insertion order
```

### 🕒 Hour 3: Hashing & equals/hashCode Contract
### 🕓 Hour 4: Set Operations
```java
Set<Integer> a = new HashSet<>(List.of(1, 2, 3, 4));
Set<Integer> b = new HashSet<>(List.of(3, 4, 5, 6));
Set<Integer> union = new HashSet<>(a); union.addAll(b);       // [1,2,3,4,5,6]
Set<Integer> intersection = new HashSet<>(a); intersection.retainAll(b); // [3,4]
Set<Integer> difference = new HashSet<>(a); difference.removeAll(b);     // [1,2]
```

### 🕔 Hour 5: Real-World Use Cases
### 🕕 Hour 6: Revision & Practice

## 📝 After Study Session
### 10 Coding Questions
Remove duplicates, find unique elements, set math operations.

## ✅ End of Day Checklist
- [ ] I understand HashSet, TreeSet, LinkedHashSet
- [ ] I know the equals/hashCode contract
- [ ] I am ready for Day 19
