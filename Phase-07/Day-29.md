# 📅 Day 29: File I/O Basics

## 🎯 Goal of the Day
Begin **Phase 7: File Handling**. Learn to read from and write to files using Java I/O.

## 📚 Topics Covered
1. File Class — file/directory operations
2. FileReader & FileWriter (character streams)
3. BufferedReader & BufferedWriter (efficient I/O)
4. Reading/Writing text files
5. Scanner for file reading
6. PrintWriter for file writing

## ⏰ Key Code
```java
// Writing to a file
try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
    writer.write("Hello, Java File I/O!");
    writer.newLine();
    writer.write("Line 2");
}

// Reading from a file
try (BufferedReader reader = new BufferedReader(new FileReader("output.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}
```

## ✅ End of Day Checklist
- [ ] I can read and write text files
- [ ] I understand character streams
- [ ] I am ready for Day 30
