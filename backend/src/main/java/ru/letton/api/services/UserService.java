package ru.letton.api.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.letton.api.dto.request.UpdateUserRequest;
import ru.letton.api.models.User;
import ru.letton.api.exceptions.BadRequestException;
import ru.letton.api.repositories.UserRepository;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository repository;

    public void save(User user) {
        repository.save(user);
    }

    public void create(User user) {
        if (repository.existsByUsername(user.getUsername())) {
            throw new BadRequestException("Пользователь с таким username уже существует");
        }

        if (repository.existsByEmail(user.getEmail())) {
            throw new BadRequestException("Пользователь с таким email уже существует");
        }

        save(user);
    }

    public User getByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));

    }

    public User getById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));

    }

    public UserDetailsService userDetailsService() {
        return this::getByUsername;
    }

    public User getCurrentUser() {
        var username = SecurityContextHolder.getContext().getAuthentication().getName();
        return getByUsername(username);
    }

    public void updateUser(UUID id, UpdateUserRequest newUserData) {
        Optional<User> user = repository.findById(id);
        if (user.isPresent()) {
            var presentUser = user.get();
            presentUser.setLastname(newUserData.getLastname());
            presentUser.setFirstname(newUserData.getFirstname());
            repository.save(presentUser);
        } else {
            throw new BadRequestException("Пользователь не найден");
        }
    }

}