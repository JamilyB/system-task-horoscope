package com.taskshoroscope.backend.repository;

import com.taskshoroscope.backend.entity.Horoscope;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HoroscopeRepository extends JpaRepository<Horoscope, Long> {
    Optional<Horoscope> findBySigno(String signo);
    Optional<Horoscope> findBySignoIgnoreCase(String signo);
    List<Horoscope> findAllBySignoOrderByIdAsc(String signo);
}
