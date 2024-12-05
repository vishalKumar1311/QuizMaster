package com.quizservice.model;

public class TrueFalseQuestionDTO extends QuestionDTO {
    // Constructor
    public TrueFalseQuestionDTO(Long id, String questionText, String correctAnswer,
            String category, String difficulty, String questionType) {
        super(id, questionText, correctAnswer, category, difficulty, questionType);
    }
}
