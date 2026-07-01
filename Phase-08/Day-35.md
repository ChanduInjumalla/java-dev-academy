# 📅 Day 35: Optional & Date/Time API

## 🎯 Goal of the Day
Master `Optional` for null-safe programming and the modern Date/Time API (java.time).

## 📚 Topics Covered
1. Optional Class — avoiding NullPointerException
2. Optional Methods (of, ofNullable, isPresent, ifPresent, orElse, map, flatMap)
3. LocalDate, LocalTime, LocalDateTime
4. Period & Duration
5. DateTimeFormatter
6. ZonedDateTime & Instant

## ⏰ Key Code
```java
// Optional — no more null checks!
Optional<String> name = Optional.ofNullable(getUserName());
String result = name.orElse("Unknown");
name.ifPresent(n -> System.out.println("Hello, " + n));
Optional<Integer> len = name.map(String::length);

// Date/Time API
LocalDate today = LocalDate.now();
LocalDate birthday = LocalDate.of(2003, Month.MARCH, 15);
Period age = Period.between(birthday, today);
LocalDateTime meeting = LocalDateTime.of(2025, 7, 6, 10, 0);
String formatted = meeting.format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm"));
```

## ✅ End of Day Checklist
- [ ] I can use Optional to avoid null checks
- [ ] I can work with the Date/Time API
- [ ] I am ready for Day 36
