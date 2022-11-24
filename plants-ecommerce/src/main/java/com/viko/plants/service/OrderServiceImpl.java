package com.viko.plants.service;

import com.viko.plants.dto.CartSessionResponse;
import com.viko.plants.entity.*;
import com.viko.plants.repository.*;
import com.viko.plants.request.OrderRequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public OrderServiceImpl(OrderTypeRepository orderTypeRepository,
                            UserRepository userRepository,
                            PlantRepository plantRepository,
                            ShopRepository shopRepository,
                            ParcelRepository parcelRepository,
                            DeliveryRepository deliveryRepository,
                            OrderRepository orderRepository,
                            CartSessionRepository cartSessionRepositry,
                            CartSessionItemRepository cartSessionItemRepository) {
        this.orderTypeRepository = orderTypeRepository;
        this.userRepository = userRepository;
        this.plantRepository = plantRepository;
        this.shopRepository = shopRepository;
        this.parcelRepository = parcelRepository;
        this.deliveryRepository = deliveryRepository;
        this.orderRepository = orderRepository;
        this.cartSessionRepository = cartSessionRepositry;
        this.cartSessionItemRepository = cartSessionItemRepository;
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
            orderItem.setPlant(cartTempItem.getPlant());
            orderItem.setQuantity(cartTempItem.getQuantity());
            orderItem.setPlantCategory(cartTempItem.getPlant().getCategory());
            orderItem.setOrderType(orderType);
            orderItems.add(orderItem);
        }
        order.setOrderItems(orderItems);
        order.setTotal(request.getCartSession().getTotal_price());
        order.setUser(user);
        order.setOrderType(orderType);

        for(OrderItem orderItem : orderItems) {
            orderItem.setOrder(order);
        }

        orderRepository.save(order);

        cartSessionItemRepository.deleteAllSessionCartItems(user.getId());
        cartSessionRepository.deleteCartSession(user.getId());

        return new ResponseEntity<>("Užsakymas pateiktas!", HttpStatus.CREATED);
    }

    private OrderType setOrderType(String orderTypeName, Integer id, Delivery delivery) {

        OrderType orderType = new OrderType();

        if (orderTypeName == "shop") {

            Optional<Shop> optionalShop = shopRepository.findById(id);
            orderType.setShop(optionalShop.get());
            orderType.setOrderTypeName("shop");
        }

        if (orderTypeName == "parcel") {

            Optional<Parcel> optionalParcel = parcelRepository.findById(id);
            orderType.setParcel(optionalParcel.get());
            orderType.setOrderTypeName("parcel");
        }

        if (orderTypeName == "delivery") {
            orderType.setDelivery(delivery);
            orderType.setOrderTypeName("delivery");
            deliveryRepository.save(delivery);
        }

        orderTypeRepository.save(orderType);

        return orderType;
    }
}
