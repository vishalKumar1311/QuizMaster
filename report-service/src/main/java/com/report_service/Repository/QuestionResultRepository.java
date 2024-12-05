package com.report_service.Repository;

import com.report_service.Model.QuestionResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionResultRepository extends JpaRepository<QuestionResult, Long> {
    List<QuestionResult> findByQuizResultId(Long quizResultId);
    List<QuestionResult> findByQuizResultUserId(Long userId);
}

