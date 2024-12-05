package com.resultservice.dto;

public class QuestionAnswerDto {

    private String questionId;
    private String userAnswer;


    // Constructors, getters, and setters

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public String getUserAnswer() {
        return userAnswer;
    }

    public void setUserAnswer(String userAnswer) {
        this.userAnswer = userAnswer;
    }
}

