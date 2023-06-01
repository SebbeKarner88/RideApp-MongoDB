package com.example.mongodbtestprogram.Entities;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
@AllArgsConstructor
@Getter
@Setter
public class UserEntity {

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

}
