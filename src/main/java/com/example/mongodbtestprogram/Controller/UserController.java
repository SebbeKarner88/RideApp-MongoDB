package com.example.mongodbtestprogram.Controller;

import com.example.mongodbtestprogram.Dto.BikeDTO;
import com.example.mongodbtestprogram.Dto.UserDTO;
import com.example.mongodbtestprogram.Entities.BikeEntity;
import com.example.mongodbtestprogram.Entities.UserEntity;
import com.example.mongodbtestprogram.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getAll")
    public List<UserDTO> getAllUsers() {
        return userService.getAll()
                .stream()
                .map(UserController::toUserDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/getByUsername")
    public UserDTO getById(@RequestHeader String username) {
        return toUserDTO(userService.getByUsername(username));
    }

    @GetMapping("/getBikeCollectionByUserId")
    public List<BikeDTO> getBikeCollectionByUserId(@RequestHeader String userId) {
        return userService.getBikeCollectionByUserId(userId)
                .stream()
                .map(UserController::toBikeDTO)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/deleteById")
    public Boolean deleteById(@RequestHeader UUID userId) {
        return userService.deleteById(userId);
    }

    private static UserDTO toUserDTO(UserEntity userEntity) {
        return new UserDTO(
                userEntity.getUserId(),
                userEntity.getUsername(),
                userEntity.getRole(),
                userEntity.getFirstName(),
                userEntity.getLastName(),
                userEntity.getPhoneNumber(),
                userEntity.getStreet(),
                userEntity.getStreetNumber(),
                userEntity.getZipCode(),
                userEntity.getCity(),
                userEntity.getCountry(),
                userEntity.getBikeCollection(),
                userEntity.getUserRides());
    }

    static BikeDTO toBikeDTO(BikeEntity bikeEntity) {
        return new BikeDTO(
                bikeEntity.getBikeId(),
                bikeEntity.getMaker(),
                bikeEntity.getModel(),
                bikeEntity.getSize(),
                bikeEntity.getPictures(),
                bikeEntity.getYear(),
                bikeEntity.getType(),
                bikeEntity.getColors(),
                bikeEntity.getMaterial(),
                bikeEntity.getWheelSize(),
                bikeEntity.getGears(),
                bikeEntity.getEBike()
        );
    }

}
