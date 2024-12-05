package com.questionservice.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("TF")
public class TrueFalseQuestion extends Question {
    // No extra fields needed for True/False, just inherits from Question
}
