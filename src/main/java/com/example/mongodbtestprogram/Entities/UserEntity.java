package com.example.mongodbtestprogram.Entities;
import com.example.mongodbtestprogram.Enum.Role;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Document("users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity implements UserDetails{

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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
