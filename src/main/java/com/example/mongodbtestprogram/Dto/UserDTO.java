package com.example.mongodbtestprogram.Dto;


import com.example.mongodbtestprogram.Entities.BikeEntity;
import com.example.mongodbtestprogram.Enum.Role;
import lombok.Value;

@Value
public class UserDTO {

        String username;
        String password;
        Role role;

        String token;

        String firstName;
        String lastName;
        String phoneNumber;
        String street;
        String streetNumber;
        String zipCode;
        String city;
        String country;
        BikeEntity[] bikeCollection;

}