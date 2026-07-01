# 📅 Day 65: Building REST APIs with Spring Boot

## 📚 Topics Covered
1. @RestController vs @Controller
2. @GetMapping, @PostMapping, @PutMapping, @DeleteMapping
3. @RequestBody & @ResponseBody
4. @PathVariable & @RequestParam
5. ResponseEntity for custom responses
6. DTOs (Data Transfer Objects)

## ⏰ Key Code
```java
@RestController
@RequestMapping("/api/employees")
class EmployeeController {

    @GetMapping
    List<Employee> getAll() { return service.findAll(); }

    @GetMapping("/{id}")
    ResponseEntity<Employee> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    ResponseEntity<Employee> create(@Valid @RequestBody EmployeeDTO dto) {
        Employee saved = service.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    ResponseEntity<Employee> update(@PathVariable Long id, @RequestBody EmployeeDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

## ✅ Ready for Day 66
