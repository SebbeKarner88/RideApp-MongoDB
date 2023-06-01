package com.example.mongodbtestprogram.Entities;

import com.example.mongodbtestprogram.Enum.Sizes;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("bikes")
@AllArgsConstructor
@Getter
@Setter
public class BikeEntity {

    String maker;
    String model;
    Sizes size;
    String[] pictures;
    Long year;
    String type;
    String[] colors;
    String material;
    Double wheelSize;
    String gears;
    Boolean eBike;



}
