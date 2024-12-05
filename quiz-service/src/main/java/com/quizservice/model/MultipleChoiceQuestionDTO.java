package com.quizservice.model;

import java.util.List;

public class MultipleChoiceQuestionDTO extends QuestionDTO {
    private List<String> choices;

    // Constructor
    public MultipleChoiceQuestionDTO(Long id, String questionText, String correctAnswer,
            String category, String difficulty, String questionType,
            List<String> choices) {
        super(id, questionText, correctAnswer, category, difficulty, questionType);
        this.choices = choices;
    }

    // Getters and Setters
    public List<String> getChoices() {
        return choices;
    }

    public void setChoices(List<String> choices) {
        this.choices = choices;
    }
}
