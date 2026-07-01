# 📅 Day 79: Mockito & Integration Testing

## 📚 Topics
1. What is Mocking?
2. Mockito: @Mock, @InjectMocks, @MockBean
3. when().thenReturn() for stubbing
4. verify() for behavior verification
5. MockMvc for controller testing
6. @WebMvcTest, @DataJpaTest, @SpringBootTest

## ⏰ Key Code
```java
@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {
    @Mock EmployeeRepository repository;
    @InjectMocks EmployeeService service;

    @Test
    void testFindById() {
        when(repository.findById(1L)).thenReturn(Optional.of(employee));
        Employee found = service.findById(1L);
        assertEquals("Chandu", found.getName());
        verify(repository).findById(1L);
    }
}
```

## ✅ Ready for Day 80
