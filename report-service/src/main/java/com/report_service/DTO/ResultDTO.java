package com.report_service.DTO;

import java.time.LocalDateTime;
import java.util.List;

public class ResultDTO {
    private int score;
    private LocalDateTime endTime;
    private List<QuestionResultDTO> questionResults;

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public List<QuestionResultDTO> getQuestionResults() {
        return questionResults;
    }

    public void setQuestionResults(List<QuestionResultDTO> questionResults) {
        this.questionResults = questionResults;
    }

    // Getters and setters
}
