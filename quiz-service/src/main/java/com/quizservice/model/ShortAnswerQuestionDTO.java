package com.quizservice.model;

public class ShortAnswerQuestionDTO extends QuestionDTO {
    // Constructor
    public ShortAnswerQuestionDTO(Long id, String questionText, String correctAnswer,
            String category, String difficulty, String questionType) {
        super(id, questionText, correctAnswer, category, difficulty, questionType);
    }
}
