package com.example.mongodbtestprogram.Service;

import com.example.mongodbtestprogram.Entities.BikeEntity;
import com.example.mongodbtestprogram.Entities.UserEntity;
import com.example.mongodbtestprogram.Repositories.BikeRepository;
import com.example.mongodbtestprogram.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class BikeService {

    private final BikeRepository bikeRepository;
    private final UserRepository userRepository;

    @Autowired
    public BikeService(BikeRepository bikeRepository, UserRepository userRepository) {
        this.bikeRepository = bikeRepository;
        this.userRepository = userRepository;
    }

    public BikeEntity addBike(BikeEntity bikeEntity) {
        bikeEntity.setBikeId(UUID.randomUUID());
        bikeRepository.save(bikeEntity);
        return bikeEntity;
    }

    public BikeEntity addToBikeCollection(UUID userId, BikeEntity bikeEntity) {

        UserEntity user = userRepository.getByUserId(userId);

        List<BikeEntity> bikeList = bikeRepository.findAll();
        List<BikeEntity> filteredList = bikeList
                .stream()
                .filter(x -> x.getMaker().equals(bikeEntity.getMaker()))
                .filter(x -> x.getModel().equals(bikeEntity.getModel()))
                .filter(x -> x.getYear().equals(bikeEntity.getYear()))
                .filter(x -> x.getColors().equals(bikeEntity.getColors()))
                .toList();

        if (!filteredList.isEmpty()) {
            List<BikeEntity> userCollection = user.getBikeCollection();
            userCollection.add(filteredList.get(0)); // ADDING THE EXISTING BIKE TO COLLECTION.
            user.setBikeCollection(userCollection);
            userRepository.saveAll(List.of(user));

            return filteredList.get(0);
        }

        bikeEntity.setBikeId(UUID.randomUUID());

        List<BikeEntity> userCollection = user.getBikeCollection();
        userCollection.add(bikeEntity); // ADDING A NEW BIKE TO COLLECTION AND TO BIKEENTITY.
        user.setBikeCollection(userCollection);
        userRepository.saveAll(List.of(user));
        bikeRepository.save(bikeEntity);

        return bikeEntity;
    }

    public List<BikeEntity> getAllBikes() {
        return bikeRepository.findAll();
    }

    public List<BikeEntity> getBikeByType(String type) {
        return bikeRepository.findByType(type);
    }

    public List<BikeEntity> getBikeByMaker(String maker) {
        return bikeRepository.findByMaker(maker);
    }

    public List<BikeEntity> getBikeByModel(String model) {
        return bikeRepository.findByModel(model);
    }


}
