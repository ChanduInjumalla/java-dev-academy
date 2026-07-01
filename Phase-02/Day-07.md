# 📅 Day 7: Strings & StringBuilder

## 🎯 Goal of the Day

Today you will master **Strings** — the most used data type in Java applications. You'll learn about String immutability, all essential String methods, `StringBuilder`, `StringBuffer`, and string comparison techniques. Strings are heavily tested in interviews!

---

## 📚 Topics Covered

1. String Basics & String Pool
2. String Immutability — Why & How
3. Essential String Methods (20+ methods)
4. String Comparison (==, equals, compareTo)
5. StringBuilder & StringBuffer
6. String Formatting & Conversion
7. Regular Expressions Basics

---

## ⏰ Hour-by-Hour Study Plan (6 Hours)

---

### 🕐 Hour 1: String Fundamentals & String Pool

#### What is a String?

A `String` is a sequence of characters. In Java, `String` is a **class** (reference type), not a primitive.

```java
public class StringBasics {
    public static void main(String[] args) {
        // Two ways to create strings
        String s1 = "Hello";                  // String literal (uses String Pool)
        String s2 = new String("Hello");      // Using constructor (creates on Heap)

        // String Pool (Intern Pool)
        String a = "Java";
        String b = "Java";
        System.out.println(a == b);           // true — same reference in pool!

        String c = new String("Java");
        System.out.println(a == c);           // false — different objects!
        System.out.println(a.equals(c));      // true — same content!
    }
}
```

**String Pool Diagram:**

```
         Stack                    Heap
    ┌────────────┐        ┌──────────────────┐
    │ a ──────────┼───┐    │  String Pool      │
    │ b ──────────┼───┤    │  ┌──────────┐    │
    │             │   └──→ │  │  "Java"  │    │
    │             │        │  └──────────┘    │
    │ c ──────────┼──────→ │  ┌──────────┐    │
    │             │        │  │  "Java"  │    │ (separate object)
    └────────────┘        │  └──────────┘    │
                          └──────────────────┘
```

#### String Immutability

**Strings are IMMUTABLE** — once created, their value **cannot be changed**. Every operation creates a **new** String object.

```java
public class ImmutabilityDemo {
    public static void main(String[] args) {
        String name = "Hello";
        System.out.println("Before: " + name);
        System.out.println("HashCode: " + System.identityHashCode(name));

        name = name + " World";  // Creates NEW String, doesn't modify old one
        System.out.println("After: " + name);
        System.out.println("HashCode: " + System.identityHashCode(name));
        // Different hashcode — proves it's a new object!

        // The original "Hello" is now eligible for garbage collection
    }
}
```

**Why Are Strings Immutable?**
1. **Security** — Strings used in class loading, network connections, file paths
2. **Thread Safety** — Immutable objects are inherently thread-safe
3. **String Pool** — Multiple references can share same String safely
4. **Hashing** — String's hashCode can be cached (used in HashMap keys)

---

### 🕑 Hour 2: Essential String Methods

```java
public class StringMethods {
    public static void main(String[] args) {
        String str = "Hello, Java World!";

        // Length
        System.out.println("Length: " + str.length());          // 18

        // Character access
        System.out.println("charAt(0): " + str.charAt(0));     // 'H'
        System.out.println("charAt(7): " + str.charAt(7));     // 'J'

        // Substring
        System.out.println("substring(7): " + str.substring(7));       // "Java World!"
        System.out.println("substring(7,11): " + str.substring(7, 11)); // "Java"

        // Case conversion
        System.out.println("Upper: " + str.toUpperCase());     // "HELLO, JAVA WORLD!"
        System.out.println("Lower: " + str.toLowerCase());     // "hello, java world!"

        // Searching
        System.out.println("indexOf('J'): " + str.indexOf('J'));           // 7
        System.out.println("lastIndexOf('a'): " + str.lastIndexOf('a'));   // 10
        System.out.println("contains(\"Java\"): " + str.contains("Java")); // true

        // Checking
        System.out.println("startsWith(\"Hello\"): " + str.startsWith("Hello")); // true
        System.out.println("endsWith(\"!\"): " + str.endsWith("!"));             // true
        System.out.println("isEmpty: " + str.isEmpty());                          // false

        // Modifying (creates new strings)
        System.out.println("trim: '" + "  Hello  ".trim() + "'");           // 'Hello'
        System.out.println("replace: " + str.replace("Java", "Python"));    // "Hello, Python World!"
        System.out.println("replaceAll: " + "a1b2c3".replaceAll("[0-9]", "")); // "abc"

        // Splitting
        String csv = "apple,banana,cherry";
        String[] fruits = csv.split(",");
        for (String fruit : fruits) {
            System.out.println("Fruit: " + fruit);
        }

        // Joining
        String joined = String.join(" - ", "Java", "Python", "C++");
        System.out.println("Joined: " + joined);  // "Java - Python - C++"

        // Converting
        int num = 42;
        String numStr = String.valueOf(num);       // int → String
        int parsed = Integer.parseInt("123");      // String → int

        // char array
        char[] chars = str.toCharArray();
        String fromChars = new String(chars);
    }
}
```

#### String Comparison — A Critical Topic

```java
public class StringComparison {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = "Hello";
        String s3 = new String("Hello");
        String s4 = "hello";

        // == compares REFERENCES (memory addresses)
        System.out.println(s1 == s2);       // true  (same pool reference)
        System.out.println(s1 == s3);       // false (different objects)

        // .equals() compares CONTENT
        System.out.println(s1.equals(s2));  // true
        System.out.println(s1.equals(s3));  // true
        System.out.println(s1.equals(s4));  // false (case-sensitive)

        // .equalsIgnoreCase() — case-insensitive
        System.out.println(s1.equalsIgnoreCase(s4)); // true

        // .compareTo() — lexicographic comparison (returns int)
        System.out.println("apple".compareTo("banana"));  // negative (apple < banana)
        System.out.println("banana".compareTo("apple"));  // positive (banana > apple)
        System.out.println("apple".compareTo("apple"));   // 0 (equal)

        // ⚠️ GOLDEN RULE: ALWAYS use .equals() for String comparison
        // NEVER use == for comparing String content!
    }
}
```

---

### 🕒 Hour 3: StringBuilder & StringBuffer

#### Why Do We Need StringBuilder?

Since Strings are immutable, concatenating in a loop creates many garbage objects:

```java
// ❌ BAD — Creates 10,000 temporary String objects!
String result = "";
for (int i = 0; i < 10000; i++) {
    result += i;  // Each += creates a new String
}
```

```java
// ✅ GOOD — StringBuilder is mutable, much faster!
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    sb.append(i);
}
String result = sb.toString();
```

#### StringBuilder Methods

```java
public class StringBuilderDemo {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Hello");

        // Append
        sb.append(" World");
        System.out.println("Append: " + sb);         // "Hello World"

        // Insert
        sb.insert(5, ",");
        System.out.println("Insert: " + sb);          // "Hello, World"

        // Delete
        sb.delete(5, 7);
        System.out.println("Delete: " + sb);          // "HelloWorld"

        // Replace
        sb.replace(5, 10, " Java");
        System.out.println("Replace: " + sb);          // "Hello Java"

        // Reverse
        sb.reverse();
        System.out.println("Reverse: " + sb);          // "avaJ olleH"

        // Capacity and Length
        StringBuilder sb2 = new StringBuilder();
        System.out.println("Default capacity: " + sb2.capacity());  // 16
        System.out.println("Length: " + sb2.length());              // 0

        // Method chaining
        String result = new StringBuilder("Hello")
                .append(" ")
                .append("World")
                .append("!")
                .toString();
        System.out.println("Chained: " + result);  // "Hello World!"
    }
}
```

#### String vs StringBuilder vs StringBuffer

| Feature | String | StringBuilder | StringBuffer |
|---------|--------|--------------|-------------|
| Mutability | Immutable | Mutable | Mutable |
| Thread-safe | Yes (immutable) | No | Yes (synchronized) |
| Performance | Slow (concatenation) | Fast | Slower than SB |
| Use when | Few modifications | Single-threaded | Multi-threaded |

---

### 🕓 Hour 4: String Practice Problems

#### Check if String is Palindrome

```java
public class PalindromeString {
    public static void main(String[] args) {
        String str = "madam";

        // Method 1: Using StringBuilder
        String reversed = new StringBuilder(str).reverse().toString();
        System.out.println(str.equals(reversed) ? "Palindrome ✅" : "Not palindrome ❌");

        // Method 2: Two-pointer approach
        boolean isPalindrome = true;
        int left = 0, right = str.length() - 1;
        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) {
                isPalindrome = false;
                break;
            }
            left++;
            right--;
        }
        System.out.println("Two-pointer: " + (isPalindrome ? "Palindrome" : "Not palindrome"));
    }
}
```

#### Count Characters

```java
public class CharacterCount {
    public static void main(String[] args) {
        String str = "Hello World";

        int vowels = 0, consonants = 0, digits = 0, spaces = 0;

        for (char ch : str.toLowerCase().toCharArray()) {
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                vowels++;
            } else if (ch >= 'a' && ch <= 'z') {
                consonants++;
            } else if (ch >= '0' && ch <= '9') {
                digits++;
            } else if (ch == ' ') {
                spaces++;
            }
        }

        System.out.println("Vowels: " + vowels);
        System.out.println("Consonants: " + consonants);
        System.out.println("Digits: " + digits);
        System.out.println("Spaces: " + spaces);
    }
}
```

#### Find Duplicate Characters

```java
public class DuplicateChars {
    public static void main(String[] args) {
        String str = "programming";

        System.out.println("Duplicate characters in '" + str + "':");
        for (int i = 0; i < str.length(); i++) {
            boolean isDuplicate = false;
            // Check if already printed
            boolean alreadyPrinted = false;
            for (int k = 0; k < i; k++) {
                if (str.charAt(i) == str.charAt(k)) {
                    alreadyPrinted = true;
                    break;
                }
            }
            if (alreadyPrinted) continue;

            int count = 0;
            for (int j = 0; j < str.length(); j++) {
                if (str.charAt(i) == str.charAt(j)) {
                    count++;
                }
            }
            if (count > 1) {
                System.out.println("'" + str.charAt(i) + "' appears " + count + " times");
            }
        }
    }
}
```

---

### 🕔 Hour 5: String Formatting & Advanced Topics

#### String.format() and printf()

```java
public class StringFormatting {
    public static void main(String[] args) {
        String name = "Chandu";
        int age = 22;
        double salary = 50000.50;

        // String.format() — returns formatted String
        String info = String.format("Name: %s, Age: %d, Salary: ₹%.2f", name, age, salary);
        System.out.println(info);

        // Text Blocks (Java 13+)
        String json = """
                {
                    "name": "Chandu",
                    "age": 22,
                    "role": "Java Developer"
                }
                """;
        System.out.println(json);

        // Useful String methods for interviews
        System.out.println("  Hello  ".strip());           // "Hello" (Java 11+)
        System.out.println("Hello".repeat(3));              // "HelloHelloHello" (Java 11+)
        System.out.println("Hello World".isBlank());        // false (Java 11+)
        System.out.println("   ".isBlank());                // true (Java 11+)
    }
}
```

---

### 🕕 Hour 6: Revision & Mini Exercises

#### Quick Reference Card

| Operation | Method | Example |
|-----------|--------|---------|
| Length | `.length()` | `"Hello".length()` → 5 |
| Get char | `.charAt(i)` | `"Hello".charAt(1)` → 'e' |
| Substring | `.substring(start, end)` | `"Hello".substring(1,3)` → "el" |
| Search | `.indexOf(str)` | `"Hello".indexOf("ll")` → 2 |
| Compare | `.equals(str)` | `"Hi".equals("Hi")` → true |
| Replace | `.replace(old, new)` | `"abc".replace("b","x")` → "axc" |
| Split | `.split(regex)` | `"a,b,c".split(",")` → ["a","b","c"] |
| Trim | `.trim()` | `" Hi ".trim()` → "Hi" |

---

## 📝 After Study Session (Extra Practice)

### 10 Theory Questions

1. Why are Strings immutable in Java?
2. What is the String Pool?
3. What is the difference between `==` and `.equals()` for Strings?
4. When would you use StringBuilder vs StringBuffer?
5. What is the default capacity of StringBuilder?
6. What happens when you concatenate Strings in a loop?
7. What is the `intern()` method?
8. Is String a primitive or reference type?
9. What is the difference between `.trim()` and `.strip()`?
10. How does `compareTo()` work for Strings?

### 10 Coding Questions

1. Reverse a String without using StringBuilder.
2. Check if two strings are anagrams of each other.
3. Count the number of words in a sentence.
4. Remove all whitespace from a String.
5. Find the first non-repeating character in a String.
6. Check if a String is a valid palindrome (ignoring spaces and case).
7. Convert a String to title case ("hello world" → "Hello World").
8. Find the longest word in a sentence.
9. Compress a String ("aaabbc" → "a3b2c1").
10. Check if one String is a rotation of another.

### 5 Debugging Questions

**Debug 1:** `String s = null; System.out.println(s.length());` — NullPointerException!
**Debug 2:** Using `==` instead of `.equals()` for String comparison.
**Debug 3:** `"Hello" + 5 + 3` gives "Hello53", not "Hello8".
**Debug 4:** `str.toUpperCase()` doesn't modify `str` — Strings are immutable.
**Debug 5:** StringBuilder default capacity calculation.

### 2 Assignments

**Assignment 1:** Build a word frequency counter that reads a paragraph and counts occurrences of each word.
**Assignment 2:** Build a password strength checker (min 8 chars, has uppercase, lowercase, digit, special char).

---

## 📓 Daily Notes

### Interview Points
- String immutability is the #1 most asked String question
- `==` vs `.equals()` is asked in every Java interview
- String Pool and intern() are advanced interview topics
- StringBuilder vs StringBuffer — thread safety difference
- Know at least 10 String methods by heart

---

## 📚 Resources

- [String Class - Oracle Docs](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html)
- [String Problems - LeetCode](https://leetcode.com/tag/string/)
- [StringBuilder - Baeldung](https://www.baeldung.com/java-string-builder-string-buffer)

---

## ✅ End of Day Checklist

- [ ] I understood String immutability and String Pool
- [ ] I know 20+ String methods
- [ ] I understand == vs .equals() deeply
- [ ] I can use StringBuilder for efficient concatenation
- [ ] I completed all practice questions
- [ ] I am ready for Day 8
