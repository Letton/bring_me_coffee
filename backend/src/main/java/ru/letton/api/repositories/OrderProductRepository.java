package ru.letton.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.letton.api.models.OrderProduct;

import java.util.UUID;

public interface OrderProductRepository extends JpaRepository<OrderProduct, UUID> {
}
