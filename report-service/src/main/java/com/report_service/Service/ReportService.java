package com.report_service.Service;

import com.report_service.DTO.QuestionPerformance;
import com.report_service.DTO.QuestionResultDTO;
import com.report_service.DTO.ResultDTO;
import com.report_service.Model.QuestionResult;
import com.report_service.Model.QuizResult;
import com.report_service.Repository.QuestionResultRepository;
import com.report_service.Repository.QuizResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    private RestTemplate restTemplate;  // Use RestTemplate to call the external service

    // Base URL of the existing quiz result service
    @Value("${quiz.result.service.url}")
    private String quizResultServiceUrl;

    // Generate Report for Specific User
    public Map<String, Object> generateReportForUser(Long userId) {
        List<ResultDTO> resultDTOs = fetchResultsForUser(userId);
        Map<String, Object> report = new HashMap<>();

        double averageScore = resultDTOs.stream()
                                        .mapToInt(ResultDTO::getScore)
                                        .average()
                                        .orElse(0.0);
        int totalQuizzes = resultDTOs.size();
        report.put("totalQuizzes", totalQuizzes);
        report.put("averageScore", averageScore);

        // Add detailed question-wise performance
        List<QuestionPerformance> questionPerformance = resultDTOs.stream()
                                                                  .flatMap(result -> result.getQuestionResults().stream()) // Assuming ResultDTO has a list of question results
                                                                  .map(this::mapToQuestionPerformance)
                                                                  .collect(Collectors.toList());

        report.put("questionPerformance", questionPerformance);

        return report;
    }

    // Fetch Results for a User (via external service)
    private List<ResultDTO> fetchResultsForUser(Long userId) {
        String url = quizResultServiceUrl + "/getResult/{userId}";

        // Call the external service for results (Note: assumes the service is already running)
        ResponseEntity<ResultDTO> response = restTemplate.exchange(url, HttpMethod.GET, null, ResultDTO.class, userId);

        if (response.getStatusCode() == HttpStatus.OK) {
            return Arrays.asList(response.getBody());
        } else {
            return Collections.emptyList();
        }
    }

    // Generate Aggregated Report for Specific Quiz
    public Map<String, Object> generateQuizReport(Long quizId) {
        // Fetch results using the external service
        List<ResultDTO> resultDTOs = fetchResultsForQuiz(quizId);
        Map<String, Object> report = new HashMap<>();

        double averageScore = resultDTOs.stream()
                                        .mapToInt(ResultDTO::getScore)
                                        .average()
                                        .orElse(0.0);
        report.put("averageScore", averageScore);

        return report;
    }

    // Fetch Results for a Quiz (via external service)
    private List<ResultDTO> fetchResultsForQuiz(Long quizId) {
        String url = quizResultServiceUrl + "/getResultByQ/{quizId}";

        ResponseEntity<ResultDTO> response = restTemplate.exchange(url, HttpMethod.GET, null, ResultDTO.class, quizId);

        if (response.getStatusCode() == HttpStatus.OK) {
            return Arrays.asList(response.getBody());
        } else {
            return Collections.emptyList();
        }
    }

    // Show Overall Performance for User across multiple Quizzes
    public Map<String, Object> getOverallPerformance(Long userId) {
        List<ResultDTO> resultDTOs = fetchResultsForUser(userId);
        Map<String, Object> performanceReport = new HashMap<>();

        List<Integer> scores = resultDTOs.stream().map(ResultDTO::getScore).collect(Collectors.toList());
        List<LocalDateTime> quizDates = resultDTOs.stream().map(ResultDTO::getEndTime).collect(Collectors.toList());

        performanceReport.put("scores", scores);
        performanceReport.put("quizDates", quizDates);

        // Performance Trend: Scores Over Time
        performanceReport.put("performanceTrend", getPerformanceTrend(scores, quizDates));

        return performanceReport;
    }

    // Helper to map question results to performance metrics
    private QuestionPerformance mapToQuestionPerformance(QuestionResultDTO questionResult) {
        boolean isCorrect = questionResult.getCorrectAnswer().equals(questionResult.getUserAnswer());
        return new QuestionPerformance(questionResult.getQuestionId(), isCorrect);
    }

    // Helper method to calculate performance trend (e.g., average scores over time)
    private List<Double> getPerformanceTrend(List<Integer> scores, List<LocalDateTime> quizDates) {
        List<Double> trend = new ArrayList<>();
        double runningAverage = 0;
        for (int i = 0; i < scores.size(); i++) {
            runningAverage = (runningAverage * i + scores.get(i)) / (i + 1);
            trend.add(runningAverage);
        }
        return trend;
    }
}
