package com.rhannierey.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Student CRUD API is live! Access student endpoints at /bagsik/students";
    }
}
