package com.viko.plants.service;

import com.viko.plants.dto.CartSessionResponse;
import com.viko.plants.dto.OrdersResponse;
import com.viko.plants.entity.*;
import com.viko.plants.repository.*;
import com.viko.plants.request.OrderRequestBody;
import com.viko.plants.request.OrdersStatusChangeRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class OrderServiceImpl implements OrderService {

    private OrderTypeRepository orderTypeRepository;
    private UserRepository userRepository;
    private PlantRepository plantRepository;
    private ShopRepository shopRepository;
    private ParcelRepository parcelRepository;
    private DeliveryRepository deliveryRepository;
    private OrderRepository orderRepository;
    private CartSessionRepository cartSessionRepository;
    private CartSessionItemRepository cartSessionItemRepository;
    private EmailSenderService emailSenderService;

    public OrderServiceImpl(OrderTypeRepository orderTypeRepository,
                            UserRepository userRepository,
                            PlantRepository plantRepository,
                            ShopRepository shopRepository,
                            ParcelRepository parcelRepository,
                            DeliveryRepository deliveryRepository,
                            OrderRepository orderRepository,
                            CartSessionRepository cartSessionRepositry,
                            CartSessionItemRepository cartSessionItemRepository,
                            EmailSenderService emailSenderService) {
        this.orderTypeRepository = orderTypeRepository;
        this.userRepository = userRepository;
        this.plantRepository = plantRepository;
        this.shopRepository = shopRepository;
        this.parcelRepository = parcelRepository;
        this.deliveryRepository = deliveryRepository;
        this.orderRepository = orderRepository;
        this.cartSessionRepository = cartSessionRepositry;
        this.cartSessionItemRepository = cartSessionItemRepository;
        this.emailSenderService = emailSenderService;
    }

    @Override
    @Transactional
    public OrdersResponse LoadOrders(String username) {
        User user = findUserByUsername(username);
        Set<Order> orders = orderRepository.findUserOrders(user.getId());
        return new OrdersResponse(orders);
    }

    @Override
    @Transactional
    public Set<Order> loadOrdersByStatus(String status) {
        Set<Order> orders = orderRepository.getOrdersByStatus(status);
        return orders;
    }

    @Override
    @Transactional
    public ResponseEntity<String> postOrder(OrderRequestBody request) {

        OrderType orderType = setOrderType(request.getOrderType(),
                request.getOrderTypeId(),
                request.getDelivery());

        User user = userRepository.findByUsername(request.getUsername());
        Order order = new Order();
        Set<OrderItem> orderItems = new HashSet<>();
        for (CartItem cartTempItem : request.getCartSession().getCartItems()) {
            OrderItem orderItem = new OrderItem();

            orderItem.setName(cartTempItem.getPlant().getName());
            orderItem.setDescription(cartTempItem.getPlant().getDescription());
            orderItem.setImageUrl(cartTempItem.getPlant().getImageUrl());
            orderItem.setPrice(cartTempItem.getPlant().getPrice());
            orderItem.setQuantity(cartTempItem.getQuantity());
            orderItem.setOrderType(orderType);
            orderItems.add(orderItem);
        }
        order.setOrderItems(orderItems);
        order.setTotal(request.getCartSession().getTotal_price());
        order.setUser(user);
        order.setOrderType(orderType);
        order.setStatus("Pateiktas");

        for(OrderItem orderItem : orderItems) {
            orderItem.setOrder(order);
        }

        orderRepository.save(order);

        cartSessionItemRepository.deleteAllSessionCartItems(user.getId());
        cartSessionRepository.deleteCartSession(user.getId());

        return new ResponseEntity<>("Užsakymas pateiktas!", HttpStatus.CREATED);
    }

    @Override
    @Transactional
    public Set<Order> setNewOrdersStatus(OrdersStatusChangeRequest ordersStatusChangeRequest) {

        for (Order order : ordersStatusChangeRequest.getOrders()) {
            orderRepository.updateOrderStatusById(ordersStatusChangeRequest.getStatus(), order.getId());
        }

        for (Order order : ordersStatusChangeRequest.getOrders()) {
            emailSenderService.sendOrderStatusInformationToUser(order, ordersStatusChangeRequest.getStatus());
        }

        Set<Order> orders = orderRepository.getOrdersByStatus(ordersStatusChangeRequest.getStatus());
        return orders;
    }

    private OrderType setOrderType(String orderTypeName, Integer id, Delivery delivery) {

        OrderType orderType = new OrderType();

        if (orderTypeName.equals("shop")) {

            Optional<Shop> optionalShop = shopRepository.findById(id);
            orderType.setShop(optionalShop.get());
        }

        if (orderTypeName.equals("parcel")) {

            Optional<Parcel> optionalParcel = parcelRepository.findById(id);
            orderType.setParcel(optionalParcel.get());
        }

        if (orderTypeName.equals("delivery")) {
            orderType.setDelivery(delivery);
            deliveryRepository.save(delivery);
        }
        orderType.setOrderTypeName(orderTypeName);
        orderTypeRepository.save(orderType);

        return orderType;
    }

    private User findUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return user;
    }
}
