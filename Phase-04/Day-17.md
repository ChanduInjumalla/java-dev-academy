# 📅 Day 17: Collections Framework — List (ArrayList, LinkedList)

## 🎯 Goal of the Day
Begin **Phase 4: Collections Framework**. Master the `List` interface, `ArrayList`, and `LinkedList` — dynamic data structures that overcome array limitations.

## 📚 Topics Covered
1. Why Collections? (Array limitations)
2. Collections Framework Hierarchy
3. List Interface
4. ArrayList — Dynamic Arrays
5. LinkedList — Doubly Linked List
6. ArrayList vs LinkedList — Performance
7. List Operations (CRUD, sort, search)

## ⏰ Hour-by-Hour Study Plan (6 Hours)

### 🕐 Hour 1: Collections Overview
```
                    Iterable
                       │
                   Collection
                  /    |     \
              List    Set    Queue
             /   \    / \      \
     ArrayList  LinkedList  HashSet  PriorityQueue
                         TreeSet  ArrayDeque
```

### 🕑 Hour 2: ArrayList
```java
import java.util.*;

List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.add("Charlie");
names.add(1, "David");        // Insert at index 1
names.set(0, "Anna");         // Replace at index 0
names.remove("Bob");          // Remove by value
names.remove(0);              // Remove by index
System.out.println(names);    // [David, Charlie]
System.out.println(names.size());
System.out.println(names.contains("David"));
Collections.sort(names);
```

### 🕒 Hour 3: LinkedList
```java
LinkedList<Integer> list = new LinkedList<>();
list.addFirst(1);
list.addLast(3);
list.add(1, 2);  // [1, 2, 3]
list.getFirst();  // 1
list.getLast();   // 3
list.removeFirst();
list.removeLast();
```

### 🕓 Hour 4: ArrayList vs LinkedList Performance
| Operation | ArrayList | LinkedList |
|-----------|-----------|------------|
| Access by index | O(1) ✅ | O(n) ❌ |
| Add at end | O(1) amortized | O(1) ✅ |
| Add at beginning | O(n) ❌ | O(1) ✅ |
| Remove from middle | O(n) | O(n) |
| Memory | Less | More (node pointers) |

### 🕔 Hour 5: List with Custom Objects
Storing and sorting `Student` objects in an ArrayList.

### 🕕 Hour 6: Revision & Practice

## 📝 After Study Session
### 10 Coding Questions
1-10. ArrayList/LinkedList operations, sorting custom objects.

### 2 Assignments
**Assignment 1:** Build a contact list manager using ArrayList.
**Assignment 2:** Implement a browser history using LinkedList.

## ✅ End of Day Checklist
- [ ] I understand the Collections hierarchy
- [ ] I can use ArrayList and LinkedList effectively
- [ ] I know when to use which
- [ ] I am ready for Day 18
