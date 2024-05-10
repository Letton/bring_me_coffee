package ru.letton.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {
    @NotBlank(message = "Имя не может быть пустым")
    private String firstname;
    @NotBlank(message = "Фамилия не может быть пустой")
    private String lastname;
}
