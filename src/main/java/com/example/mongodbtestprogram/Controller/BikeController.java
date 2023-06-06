package com.example.mongodbtestprogram.Controller;

import com.example.mongodbtestprogram.Dto.BikeDTO;
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


    static BikeDTO toBikeDTO(BikeEntity bikeEntity) {
        return new BikeDTO(
                bikeEntity.getMaker(),
                bikeEntity.getModel(),
                bikeEntity.getSize(),
                bikeEntity.getPictures(),
                bikeEntity.getYear(),
                bikeEntity.getType(),
                bikeEntity.getColors(),
                bikeEntity.getMaterial(),
                bikeEntity.getWheelSize(),
                bikeEntity.getGears(),
                bikeEntity.getEBike()
        );
    }
    static BikeEntity toBikeEntity(BikeDTO bikeDTO) {
        return new BikeEntity(
                bikeDTO.getMaker(),
                bikeDTO.getModel(),
                bikeDTO.getSize(),
                bikeDTO.getPictures(),
                bikeDTO.getYear(),
                bikeDTO.getType(),
                bikeDTO.getColors(),
                bikeDTO.getMaterial(),
                bikeDTO.getWheelSize(),
                bikeDTO.getGears(),
                bikeDTO.getEBike()
        );
    }
}
