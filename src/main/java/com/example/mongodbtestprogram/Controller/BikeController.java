package com.example.mongodbtestprogram.Controller;

import com.example.mongodbtestprogram.Entities.BikeEntity;
import com.example.mongodbtestprogram.Service.BikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bike")
public class BikeController {

    private final BikeService bikeService;

    @Autowired
    public BikeController(BikeService bikeService) {
        this.bikeService = bikeService;
    }


    @PostMapping("/add")
    public BikeEntity addBike(@RequestBody BikeEntity bikeEntity) {
        return bikeService.addBike(bikeEntity);
    }

    @GetMapping("/getAll")
    public List<BikeEntity> getAllBikes() {
        return bikeService.getAllBikes();
    }

    @GetMapping("/getBikeByMaker")
    public List<BikeEntity> getBikeByMaker(@RequestHeader String maker) {
        return bikeService.getBikeByMaker(maker);
    }

    @GetMapping("/getBikeByModel")
    public List<BikeEntity> getBikeByModel(@RequestHeader String model) {
        return bikeService.getBikeByModel(model);
    }

    @GetMapping("/getBikeByType")
    public List<BikeEntity> getBikeByType(@RequestHeader String type) {
        return bikeService.getBikeByType(type);
    }

}
