package com.questionservice.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;

import java.util.Collections;
import java.util.List;

@Entity
@DiscriminatorValue("MCQ")
public class MultipleChoiceQuestion extends Question {
    @ElementCollection
    private List<String> choices;

    @Override
    public List<String> getChoices() {
        return choices;
    }

    @Override
    public void setChoices(List<String> choices) {
        this.choices = choices;
    }
}
