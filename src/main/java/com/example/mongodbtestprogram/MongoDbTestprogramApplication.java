package com.example.mongodbtestprogram;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@SpringBootApplication
@EnableMongoRepositories
public class MongoDbTestprogramApplication{

    public static void main(String[] args) {
        SpringApplication.run(MongoDbTestprogramApplication.class, args);

    }

}

