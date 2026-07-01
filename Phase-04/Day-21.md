# 📅 Day 21: Collections Utility, Comparable & Comparator

## 🎯 Goal of the Day
Master sorting custom objects, the Collections utility class, and iterators. This completes Phase 4.

## 📚 Topics Covered
1. Collections Utility Class (sort, shuffle, reverse, min, max)
2. Comparable Interface — Natural Ordering
3. Comparator Interface — Custom Ordering
4. Iterator & ListIterator
5. Iterable Interface
6. Unmodifiable Collections
7. Phase 4 Review

## ⏰ Hour-by-Hour Study Plan (6 Hours)

### Key Code
```java
class Student implements Comparable<Student> {
    String name; int marks;
    Student(String name, int marks) { this.name = name; this.marks = marks; }

    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.marks, other.marks); // Sort by marks
    }
}

// Comparator for sorting by name
Comparator<Student> byName = (s1, s2) -> s1.name.compareTo(s2.name);
Comparator<Student> byMarksDesc = Comparator.comparingInt(Student::getMarks).reversed();

Collections.sort(students);            // Uses Comparable
Collections.sort(students, byName);    // Uses Comparator
```

## ✅ End of Day Checklist
- [ ] I can sort custom objects using Comparable and Comparator
- [ ] I understand Collections utility methods
- [ ] Phase 4 is complete
- [ ] I am ready for Phase 5: Exception Handling

> 🎉 **Phase 4 Complete!** You've mastered the Collections Framework!
