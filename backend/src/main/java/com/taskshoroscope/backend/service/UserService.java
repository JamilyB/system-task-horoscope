package com.taskshoroscope.backend.service;

import com.taskshoroscope.backend.dto.LoginDTO;
import com.taskshoroscope.backend.dto.RegisterDTO;
import com.taskshoroscope.backend.entity.Horoscope;
import com.taskshoroscope.backend.entity.User;
import com.taskshoroscope.backend.repository.HoroscopeRepository;
import com.taskshoroscope.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.MonthDay;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HoroscopeRepository horoscopeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User create(User user) {
        return userRepository.save(user);
    }

    public User register(RegisterDTO dto) {
        validateRegisterData(dto);

        User user = new User();
        user.setNome(dto.getNome());
        user.setEmail(dto.getEmail());
        user.setSenha(passwordEncoder.encode(dto.getSenha()));
        user.setDt_nasc(dto.getBirthdate());

        Horoscope horoscope = getHoroscopeByBirthdate(dto.getBirthdate());
        user.setHoroscope(horoscope);

        return userRepository.save(user);
    }

    public User authenticate(LoginDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado!"));

        if (!passwordEncoder.matches(dto.getSenha(), user.getSenha())) {
            throw new IllegalArgumentException("Senha incorreta!");
        }

        return user;
    }

    private void validateRegisterData(RegisterDTO dto) {
        if (!dto.getSenha().equals(dto.getConfirmarSenha())) {
            throw new IllegalArgumentException("Senhas não coincidem!");
        }

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado!");
        }
    }

    private Horoscope getHoroscopeByBirthdate(LocalDate birthdate) {
        String signo = calcularSigno(birthdate);
        return horoscopeRepository.findBySigno(signo)
                .orElseThrow(() -> new IllegalArgumentException("Signo não encontrado: " + signo));
    }

    private String calcularSigno(LocalDate birthdate) {
        MonthDay date = MonthDay.of(birthdate.getMonth(), birthdate.getDayOfMonth());

        if (!date.isBefore(MonthDay.of(3, 21)) && !date.isAfter(MonthDay.of(4, 19))) return "aries";
        if (!date.isBefore(MonthDay.of(4, 20)) && !date.isAfter(MonthDay.of(5, 20))) return "taurus";
        if (!date.isBefore(MonthDay.of(5, 21)) && !date.isAfter(MonthDay.of(6, 20))) return "gemini";
        if (!date.isBefore(MonthDay.of(6, 21)) && !date.isAfter(MonthDay.of(7, 22))) return "cancer";
        if (!date.isBefore(MonthDay.of(7, 23)) && !date.isAfter(MonthDay.of(8, 22))) return "leo";
        if (!date.isBefore(MonthDay.of(8, 23)) && !date.isAfter(MonthDay.of(9, 22))) return "virgo";
        if (!date.isBefore(MonthDay.of(9, 23)) && !date.isAfter(MonthDay.of(10, 22))) return "libra";
        if (!date.isBefore(MonthDay.of(10, 23)) && !date.isAfter(MonthDay.of(11, 21))) return "scorpio";
        if (!date.isBefore(MonthDay.of(11, 22)) && !date.isAfter(MonthDay.of(12, 21))) return "sagittarius";
        if (!date.isBefore(MonthDay.of(12, 22)) || !date.isAfter(MonthDay.of(1, 19))) return "capricorn";
        if (!date.isBefore(MonthDay.of(1, 20)) && !date.isAfter(MonthDay.of(2, 18))) return "aquarius";
        return "pisces";
    }
}
