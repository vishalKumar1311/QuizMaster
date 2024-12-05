package com.questionservice.repository;

import com.questionservice.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface QuestionRepository extends JpaRepository<Question, Long> {
    // Method to find questions by category
    List<Question> findByCategory(String category);

    // Method to find questions by question type
    List<Question> findByQuestionType(Question.QuestionType questionType);

}

