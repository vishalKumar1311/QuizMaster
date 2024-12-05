package com.report_service.Controller;

import com.report_service.Service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // Endpoint for generating report for a specific user
    @GetMapping("/generateReport/{userId}")
    public ResponseEntity<Map<String, Object>> generateReportForUser(@PathVariable Long userId) {
        Map<String, Object> report = reportService.generateReportForUser(userId);
        return ResponseEntity.ok(report);
    }

    // Endpoint for generating report for a specific quiz
    @GetMapping("/generateQuizReport/{quizId}")
    public ResponseEntity<Map<String, Object>> generateQuizReport(@PathVariable Long quizId) {
        Map<String, Object> report = reportService.generateQuizReport(quizId);
        return ResponseEntity.ok(report);
    }

    // Endpoint for getting overall performance of a user across quizzes
    @GetMapping("/getOverallPerformance/{userId}")
    public ResponseEntity<Map<String, Object>> getOverallPerformance(@PathVariable Long userId) {
        Map<String, Object> performance = reportService.getOverallPerformance(userId);
        return ResponseEntity.ok(performance);
    }
}

