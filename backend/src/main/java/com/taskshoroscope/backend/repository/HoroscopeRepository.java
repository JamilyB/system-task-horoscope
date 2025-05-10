package com.taskshoroscope.backend.repository;

import com.taskshoroscope.backend.entity.Horoscope;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HoroscopeRepository extends JpaRepository<Horoscope, Long> {

}
