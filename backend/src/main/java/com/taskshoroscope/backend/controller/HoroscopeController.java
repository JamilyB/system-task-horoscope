package com.taskshoroscope.backend.controller;

import com.taskshoroscope.backend.entity.Horoscope;
import com.taskshoroscope.backend.repository.HoroscopeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://system-task-horoscope-frontend.onrender.com"
})
public class HoroscopeController {

    private final RestTemplate restTemplate = new RestTemplate();

    @Autowired
    HoroscopeRepository horoscopeRepository;

    @Autowired
    JdbcTemplate jdbcTemplate;


    @GetMapping("/proxy/horoscope")
    public ResponseEntity<String> getHoroscope(
            @RequestParam String sign,
            @RequestParam String period) {

        String url = "https://horoscope-app-api.vercel.app/api/v1/get-horoscope/" + period + "?sign=" + sign;

        try {
            String response = restTemplate.getForObject(url, String.class);
            System.out.println("Resposta da API externa: " + response);
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

    @GetMapping("/teste")
    public String teste() {
        List<Horoscope> lista = horoscopeRepository.findAll();
        String sql = "SELECT current_schema()";
        String schema = jdbcTemplate.queryForObject(sql, String.class);
        System.out.println("Schema atual: " + schema);
        return lista.isEmpty() ? "Lista vazia" : "Horóscopos: " + lista.size();
    }

    @GetMapping("/schemas")
    public List<String> getSchemas() {
        return jdbcTemplate.queryForList(
                "SELECT table_schema FROM information_schema.tables WHERE table_name = 'horoscope'",
                String.class);
    }

    @GetMapping("/horoscope-lista")
    public List<Map<String,Object>> listarHoroscopos() {
        return jdbcTemplate.queryForList("SELECT * FROM public.horoscope");
    }

    @GetMapping("/horoscope-data")
    public ResponseEntity<Horoscope> getHoroscopeData(@RequestParam String signo) {
        Optional<Horoscope> optionalHoroscope = horoscopeRepository.findBySignoIgnoreCase(signo);
        if (optionalHoroscope.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(optionalHoroscope.get());
    }

    @GetMapping("/clean-duplicates")
    public ResponseEntity<String> cleanDuplicates() {
        List<String> signos = horoscopeRepository.findAll()
                .stream()
                .map(Horoscope::getSigno)
                .distinct()
                .toList();

        int removedCount = 0;

        for (String signo : signos) {
            List<Horoscope> list = horoscopeRepository.findAllBySignoOrderByIdAsc(signo);
            if (list.size() > 1) {
                // manter o primeiro, remover os demais
                List<Horoscope> duplicates = list.subList(1, list.size());
                horoscopeRepository.deleteAll(duplicates);
                removedCount += duplicates.size();
            }
        }

        return ResponseEntity.ok("Duplicados removidos: " + removedCount);
    }


}
