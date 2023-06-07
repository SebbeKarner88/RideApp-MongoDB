package com.example.mongodbtestprogram.Controller;

import com.example.mongodbtestprogram.Dto.BikeDTO;
import com.example.mongodbtestprogram.Dto.LoginDTO;
import com.example.mongodbtestprogram.Dto.UserDTO;
import com.example.mongodbtestprogram.Entities.UserEntity;
import com.example.mongodbtestprogram.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
        return UserController.toUserDTO(
                userService.addUser(UserController.toUserEntity(userDTO)
                ));
    }

    @PostMapping("/login")
    public LoginDTO loginUser(@RequestBody LoginDTO loginDTO) {
    return userService.loginUser(loginDTO);
    }

    @GetMapping("/getAll")
    public List<UserDTO> getAllUsers() {
        return userService.getAll()
                .stream()
                .map(UserController::toUserDTO)
                .collect(Collectors.toList());
    }


    @GetMapping("/getCollectionByUsername")
    public List<BikeDTO> getCollectionByUsername(@RequestHeader String userName) {
        return userService.getCollectionByUsername(userName)
                .stream()
                .map(BikeController::toBikeDTO)
                .collect(Collectors.toList());
    }

    private static UserEntity toUserEntity(UserDTO userDTO) {
        return new UserEntity(
                userDTO.getUserName(),
                userDTO.getPassword(),
                userDTO.getFirstName(),
                userDTO.getLastName(),
                userDTO.getPhoneNumber(),
                userDTO.getStreet(),
                userDTO.getStreetNumber(),
                userDTO.getZipCode(),
                userDTO.getCity(),
                userDTO.getCountry(),
                userDTO.getBikeCollection());
    }
    private static UserDTO toUserDTO(UserEntity userEntity) {
        return new UserDTO(
                userEntity.getUserName(),
                userEntity.getPassword(),
                userEntity.getFirstName(),
                userEntity.getLastName(),
                userEntity.getPhoneNumber(),
                userEntity.getStreet(),
                userEntity.getStreetNumber(),
                userEntity.getZipCode(),
                userEntity.getCity(),
                userEntity.getCountry(),
                userEntity.getBikeCollection());
    }

}
