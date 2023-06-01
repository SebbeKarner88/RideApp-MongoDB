package com.example.mongodbtestprogram.Controller;

import com.example.mongodbtestprogram.Dto.UserDTO;
import com.example.mongodbtestprogram.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserDTO registerUser(@RequestBody UserDTO userDTO) {
        return userService.addUser(userDTO);
    }

    @GetMapping("/getAll")
    public List<UserDTO> getAllUsers() {
        return userService.getAll();
    }
}
