package com.resultservice.repository;

import com.resultservice.model.QuestionResult;
import com.resultservice.model.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionResultRepository extends JpaRepository<QuestionResult, Long> {
    List<QuestionResult> findByQuizResultId(int quizResultId);
}

