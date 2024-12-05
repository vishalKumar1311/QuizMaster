package com.resultservice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.*;


@Entity
@Table(name = "question_results")
public class QuestionResult {

    @Id
    private Long id;

    @Column(nullable = false)
    private String questionId; // e.g., "q1", "q2", "q3"

    @Column(nullable = false)
    private String userAnswer; // e.g., "A", "B", "C"

    @Column(nullable = false)
    private String correctAnswer; // e.g., "A", "B", "C"

    // Many-to-one relationship with QuizResult
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_result_id", nullable = false)
    @JsonBackReference
    private QuizResult quizResult;

    // Constructors, getters, and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public QuizResult getQuizResult() {
        return quizResult;
    }

    public void setQuizResult(QuizResult quizResult) {
        this.quizResult = quizResult;
    }
}

