package com.example.mongodbtestprogram.Security.Register;

import com.example.mongodbtestprogram.Entities.BikeEntity;
import com.example.mongodbtestprogram.Entities.RideEntity;
import com.example.mongodbtestprogram.Enum.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    UUID userId;

    String username;
    String password;
    Role role;

    String firstName;
    String lastName;
    String phoneNumber;
    String street;
    String streetNumber;
    String zipCode;
    String city;
    String country;
    BikeEntity[] bikeCollection;
    RideEntity[] userRides;
}