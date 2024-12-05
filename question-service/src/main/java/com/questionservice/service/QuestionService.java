package com.questionservice.service;

import com.questionservice.model.MultipleChoiceQuestion;
import com.questionservice.model.Question;
import com.questionservice.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    public Optional<Question> getQuestion(Long id) {
        return questionRepository.findById(id);
    }
    // Get all questions
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    // Get questions by category
    public List<Question> getQuestionsByCategory(String category) {
        return questionRepository.findByCategory(category);
    }

    // Get questions by question type
    public List<Question> getQuestionsByType(Question.QuestionType questionType) {
        return questionRepository.findByQuestionType(questionType);
    }

    public Question updateQuestion(Long id, Question questionDetails) {
        Question existingQuestion = questionRepository.findById(id).orElseThrow(() -> new RuntimeException("Question not found"));
        existingQuestion.setId(questionDetails.getId());
        existingQuestion.setQuestionText(questionDetails.getQuestionText());
        existingQuestion.setCorrectAnswer(questionDetails.getCorrectAnswer());
        existingQuestion.setCategory(questionDetails.getCategory());
        existingQuestion.setDifficulty(questionDetails.getDifficulty());
        existingQuestion.setQuestionType(questionDetails.getQuestionType());

        if (questionDetails instanceof MultipleChoiceQuestion) {
            ((MultipleChoiceQuestion) existingQuestion).setChoices(((MultipleChoiceQuestion) questionDetails).getChoices());
        }

        return questionRepository.save(existingQuestion);
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }
}
