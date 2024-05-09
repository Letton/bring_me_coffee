package ru.letton.api.services;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.letton.api.dto.ProductDTO;
import ru.letton.api.dto.response.GetOrdersResponse;
import ru.letton.api.models.Order;
import ru.letton.api.models.Product;
import ru.letton.api.repositories.ProductRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {
    private final ProductRepository productRepository;

    private final ModelMapper modelMapper;


    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(this::convertOrderToOrderDTO).collect(Collectors.toList());
    }

    private ProductDTO convertOrderToOrderDTO(Product product) {
        return modelMapper.map(product, ProductDTO.class);
    }

}
