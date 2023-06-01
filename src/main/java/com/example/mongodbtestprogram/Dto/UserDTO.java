package com.example.mongodbtestprogram.Dto;


public record UserDTO(String userName, String password, String firstName, String lastName, String phoneNumber,
                      String street, String streetNumber, String zipCode, String city, String country) {
}
