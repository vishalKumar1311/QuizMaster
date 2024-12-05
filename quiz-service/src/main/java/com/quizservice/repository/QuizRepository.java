package com.quizservice.repository;

import com.quizservice.model.Quiz;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends MongoRepository<Quiz, Long> {

    Optional<Quiz> findById(Long quizId);
    List<Quiz> findAll();
}
