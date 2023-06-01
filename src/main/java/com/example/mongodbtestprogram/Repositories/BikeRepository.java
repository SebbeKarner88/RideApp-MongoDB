package com.example.mongodbtestprogram.Repositories;

import com.example.mongodbtestprogram.Entities.BikeEntity;
import com.example.mongodbtestprogram.Enum.Sizes;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BikeRepository extends MongoRepository<BikeEntity, String> {

    List<BikeEntity> findByMaker(String maker);
    List<BikeEntity> findByModel(String model);
    List<BikeEntity> findBySize(Sizes size);
    List<BikeEntity> findByYear(Long year);
    List<BikeEntity> findByType(String type);
    List<BikeEntity> findByColors(String[] colors);
    List<BikeEntity> findByMaterial(String material);
    List<BikeEntity> findByWheelSize(Double wheelSize);
    List<BikeEntity> findByGears(String gears);
    List<BikeEntity> findByEBike(Boolean eBike);



    }
