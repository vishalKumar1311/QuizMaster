package com.report_service.Repository;

import com.report_service.Model.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
        List<QuizResult> findByUserId(Long userId);
        List<QuizResult> findByQuizId(Long quizId);
}

