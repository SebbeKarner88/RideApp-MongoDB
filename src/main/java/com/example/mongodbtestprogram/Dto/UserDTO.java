package com.example.mongodbtestprogram.Dto;


import com.example.mongodbtestprogram.Entities.BikeEntity;
import com.example.mongodbtestprogram.Entities.RideEntity;
import com.example.mongodbtestprogram.Enum.Role;
import lombok.Value;

import java.util.List;
import java.util.UUID;


@Value
public class UserDTO {

        UUID userId;

        String username;
        Role role;

        String firstName;
        String lastName;
        String phoneNumber;
        String street;
        String streetNumber;
        String zipCode;
        String city;
        String country;
        List<BikeEntity> bikeCollection;
        List<RideEntity> userRides;
}