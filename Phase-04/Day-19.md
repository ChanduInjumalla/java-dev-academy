# 📅 Day 19: Map Interface — HashMap, TreeMap, LinkedHashMap

## 🎯 Goal of the Day
Master the `Map` interface — key-value pairs for fast lookups. HashMap is one of the most used data structures in real-world Java.

## 📚 Topics Covered
1. Map Interface — Key-Value Pairs
2. HashMap — unordered, O(1) operations
3. LinkedHashMap — insertion order
4. TreeMap — sorted by keys
5. Internal Working of HashMap (Buckets, Hashing)
6. Collision Handling (Separate Chaining, Java 8 Treeification)
7. Iterating Maps

## ⏰ Hour-by-Hour Study Plan (6 Hours)

### 🕐 Hour 1: HashMap Basics
```java
Map<String, Integer> ages = new HashMap<>();
ages.put("Alice", 25);
ages.put("Bob", 30);
ages.put("Charlie", 28);
ages.get("Alice");        // 25
ages.getOrDefault("Dave", 0);  // 0
ages.containsKey("Bob");  // true
ages.remove("Charlie");
ages.putIfAbsent("Alice", 99); // No change, Alice exists
```

### 🕑 Hour 2: Iterating Maps
```java
// Method 1: entrySet()
for (Map.Entry<String, Integer> entry : ages.entrySet()) {
    System.out.println(entry.getKey() + " = " + entry.getValue());
}
// Method 2: keySet()
for (String key : ages.keySet()) { System.out.println(key); }
// Method 3: forEach (Java 8)
ages.forEach((key, value) -> System.out.println(key + ": " + value));
```

### 🕒 Hour 3: HashMap Internal Working (Buckets, Hashing, Collisions)
### 🕓 Hour 4: TreeMap & LinkedHashMap
### 🕔 Hour 5: Real-World Applications (Word Counter, Cache)
### 🕕 Hour 6: Revision & Practice

## 📝 After Study Session
### 10 Coding Questions
Word frequency counter, group by, find most common element.

## ✅ End of Day Checklist
- [ ] I can use HashMap, TreeMap, LinkedHashMap
- [ ] I understand how HashMap works internally
- [ ] I am ready for Day 20
