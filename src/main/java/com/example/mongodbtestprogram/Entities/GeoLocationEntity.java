package com.example.mongodbtestprogram.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("geoLocation")
@AllArgsConstructor
@Getter
@Setter
public class GeoLocationEntity {

    Double latitude;
    Double longitude;
}
