package ru.letton.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetOrdersResponse {
    private UUID id;

    private String address;

    private String status;

    private Double total;

    private Date creationDate;
}
