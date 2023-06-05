package com.example.mongodbtestprogram.Dto;


import com.example.mongodbtestprogram.Entities.BikeEntity;
import lombok.Value;

@Value
public class UserDTO {

        String userName;
        String password;

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