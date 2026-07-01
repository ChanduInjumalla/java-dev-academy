# 📅 Day 78: JUnit 5 Fundamentals

## 🎯 Begin **Phase 18: Testing**. Write professional tests.

## 📚 Topics
1. Why Testing? Testing pyramid
2. JUnit 5 setup
3. @Test, @BeforeEach, @AfterEach, @BeforeAll, @AfterAll
4. Assertions (assertEquals, assertTrue, assertThrows, assertAll)
5. @DisplayName, @Disabled
6. Parameterized Tests (@ParameterizedTest)

## ⏰ Key Code
```java
@Test
@DisplayName("Should add two numbers correctly")
void testAdd() {
    Calculator calc = new Calculator();
    assertEquals(5, calc.add(2, 3));
    assertThrows(ArithmeticException.class, () -> calc.divide(10, 0));
}

@ParameterizedTest
@ValueSource(ints = {2, 4, 6, 8, 10})
void testEvenNumbers(int number) {
    assertTrue(number % 2 == 0);
}
```

## ✅ Ready for Day 79
