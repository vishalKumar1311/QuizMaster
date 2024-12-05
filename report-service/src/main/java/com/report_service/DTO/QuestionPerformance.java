package com.report_service.DTO;

public class QuestionPerformance {
    private Long questionId;
    private boolean isCorrect;

    public QuestionPerformance(Long questionId, boolean isCorrect) {
        this.questionId = questionId;
        this.isCorrect = isCorrect;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }
    // Getters and Setters
}

