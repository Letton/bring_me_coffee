package ru.letton.api.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import ru.letton.api.domain.dto.JwtAuthenticationResponse;
import ru.letton.api.domain.dto.SignInRequest;
import ru.letton.api.domain.dto.SignUpRequest;
import ru.letton.api.exceptions.BadRequestException;
import ru.letton.api.services.AuthenticationService;
import ru.letton.api.util.CustomErrorResponse;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;

    @PostMapping("/sign-up")
    public JwtAuthenticationResponse signUp(@RequestBody @Valid SignUpRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errors = new StringBuilder();
            for (ObjectError error : bindingResult.getAllErrors()) {
                errors.append(error.getDefaultMessage());
            }
            throw new BadRequestException(errors.toString());
        }
        return authenticationService.signUp(request);
    }

    @PostMapping("/sign-in")
    public JwtAuthenticationResponse signIn(@RequestBody @Valid SignInRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errors = new StringBuilder();
            for (ObjectError error : bindingResult.getAllErrors()) {
                errors.append(error.getDefaultMessage());
            }
            throw new BadRequestException(errors.toString());
        }
        return authenticationService.signIn(request);
    }

    @ExceptionHandler
    private ResponseEntity<CustomErrorResponse> handleException(BadRequestException e) {
        return new ResponseEntity<>(new CustomErrorResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

}