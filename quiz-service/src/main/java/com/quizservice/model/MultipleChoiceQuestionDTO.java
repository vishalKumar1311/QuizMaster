package com.quizservice.model;

import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

public class MultipleChoiceQuestionDTO extends QuestionDTO {

    @Field("multiple_choices")
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
