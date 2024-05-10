package ru.letton.api.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import ru.letton.api.dto.response.CustomErrorResponse;
import ru.letton.api.dto.response.GetUserResponse;
import ru.letton.api.dto.request.UpdateUserRequest;
import ru.letton.api.exceptions.BadRequestException;
import ru.letton.api.exceptions.ForbiddenException;
import ru.letton.api.models.User;
import ru.letton.api.services.UserService;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final ModelMapper modelMapper;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("")
    ResponseEntity<HttpStatus> updateUser(@RequestBody @Valid UpdateUserRequest newUserData, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errors = new StringBuilder();
            for (ObjectError error : bindingResult.getAllErrors()) {
                errors.append(error.getDefaultMessage()).append(";");
            }
            throw new BadRequestException(errors.toString());
        }
        var currentUser = userService.getCurrentUser();
        userService.updateUser(currentUser.getId(), newUserData);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/me")
    GetUserResponse getUser() {
        var currentUser = userService.getCurrentUser();
        return convertUserToGetUserResponse(userService.getById(currentUser.getId()));
    }


    @ExceptionHandler
    private ResponseEntity<CustomErrorResponse> handleException(BadRequestException e) {
        return new ResponseEntity<>(new CustomErrorResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    private ResponseEntity<CustomErrorResponse> handleException(ForbiddenException e) {
        return new ResponseEntity<>(new CustomErrorResponse(e.getMessage()), HttpStatus.FORBIDDEN);
    }

    private GetUserResponse convertUserToGetUserResponse(User user) {
        return modelMapper.map(user, GetUserResponse.class);
    }

}
