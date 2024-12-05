package com.questionservice.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("SA")
public class ShortAnswerQuestion extends Question {
    // No extra fields needed for Short Answer, just inherits from Question


}
