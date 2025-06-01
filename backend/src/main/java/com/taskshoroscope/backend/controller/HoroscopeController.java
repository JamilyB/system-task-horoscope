package com.taskshoroscope.backend.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // liberar React
public class HoroscopeController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/proxy/horoscope")
    public ResponseEntity<String> getHoroscope(
            @RequestParam String sign,
            @RequestParam String period) {

        String url = "https://horoscope-app-api.vercel.app/api/v1/get-horoscope/" + period + "?sign=" + sign;

        try {
            String response = restTemplate.getForObject(url, String.class);
            System.out.println("Resposta da API externa: " + response);
            // Checa se resposta parece JSON (começa com { ou [)
            if (response == null || !(response.trim().startsWith("{") || response.trim().startsWith("["))) {
                return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                        .body("{\"error\":\"Resposta inválida do serviço externo\"}");
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            return new ResponseEntity<>(response, headers, HttpStatus.OK);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\":\"Erro ao buscar horóscopo\"}");
        }
    }
}
