package com.resultservice.repository;

import com.resultservice.model.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizResultRepository extends JpaRepository<QuizResult, Integer> {
    QuizResult findByUserIdAndQuizId(int userId,int quizId);

    QuizResult findByUserId(int userId);

    QuizResult findByQuizId(int quizId);

}
