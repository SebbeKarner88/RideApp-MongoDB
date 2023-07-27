package com.example.mongodbtestprogram.Security.Authentication;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthenticationRequest {

    String Username;
    String Password;

}