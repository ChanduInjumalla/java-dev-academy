# 📅 Day 30: Serialization & Java NIO

## 🎯 Goal of the Day
Learn object serialization, deserialization, and modern Java NIO (Path, Files, Channels).

## 📚 Topics Covered
1. Serialization — converting objects to byte streams
2. ObjectInputStream & ObjectOutputStream
3. Serializable Interface & transient keyword
4. Java NIO — Path, Paths, Files
5. Files utility class operations
6. Byte Streams vs Character Streams

## ⏰ Key Code
```java
// Java NIO — modern file operations
Path path = Paths.get("data.txt");
Files.writeString(path, "Hello NIO!");
String content = Files.readString(path);
List<String> lines = Files.readAllLines(path);
Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
Files.walk(Paths.get(".")).forEach(System.out::println);
```

## ✅ End of Day Checklist
- [ ] I understand serialization/deserialization
- [ ] I can use Java NIO Path and Files
- [ ] I am ready for Day 31
