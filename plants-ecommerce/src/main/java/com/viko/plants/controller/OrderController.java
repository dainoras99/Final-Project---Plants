package com.viko.plants.controller;

import com.viko.plants.dto.CartSessionResponse;
import com.viko.plants.dto.OrdersResponse;
import com.viko.plants.entity.*;
import com.viko.plants.repository.*;
import com.viko.plants.request.CartSessionRequest;
import com.viko.plants.request.OrderRequestBody;
import com.viko.plants.request.OrderRequestDeliveryBody;
import com.viko.plants.service.OrderService;
import com.viko.plants.service.SessionService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    private OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("api/v1/postOrder")
    public ResponseEntity<String> postOrder(@RequestBody OrderRequestBody request) {
        ResponseEntity<String> response = orderService.postOrder(request);
        return response;
    }

    @GetMapping("api/v1/{username}/orders")
    public OrdersResponse userSession(@PathVariable String username) {

        OrdersResponse response = orderService.LoadOrders(username);
        return response;
    }

    @GetMapping("api/v1/orders/{status}")
    public Set<Order> getOrdersByStatus(@PathVariable String status) {
        Set<Order> orders = orderService.loadOrdersByStatus(status);
        return orders;
    }

}
//    @Autowired
//    private OrderRepository orderRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PlantRepository plantRepository;
//
//    @Autowired
//    private OrderItemRepository orderItemRepository;
//
//    @Autowired
//    private ShopRepository shopRepository;
//
//    @Autowired
//    private ParcelRepository parcelRepository;
//
//    @Autowired
//    private DeliveryRepository deliveryRepository;
//
//    @Autowired
//    private OrderTypeRepository orderTypeRepository;
//
//    @Autowired
//    private CartSessionItemRepository cartSessionItemRepository;
//
//    @Autowired
//    private CartSessionRepository cartSessionRepository;
//
//    @PostMapping("api/v1/takefromshop")
//    public ResponseEntity<String> addTakeOrderType(@RequestParam Integer id, @RequestBody OrderRequestBody orderRequestBody) {
//        try {
//            OrderType orderType = new OrderType();
//            Optional<Shop> optionalShop = shopRepository.findById(id);
//            orderType.setShop(optionalShop.get());
//            orderType.setOrderTypeName("shop");
//            orderTypeRepository.save(orderType);
//
//            createOrder(orderRequestBody, orderType);
//
//            return new ResponseEntity<>("Užsakymas pateiktas su užsakymo tipu - atsiėmimas parduotuvėje", HttpStatus.CREATED);
//        }
//        catch (Exception exc) {
//            System.out.println(exc);
//            return new ResponseEntity<>("An error occured", HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @PostMapping("api/v1/takefromparcel")
//    public ResponseEntity<String> addParcelOrderType(@RequestParam Integer id, @RequestBody OrderRequestBody orderRequestBody) {
//        try {
//            OrderType orderType = new OrderType();
//            Optional<Parcel> optionalParcel = parcelRepository.findById(id);
//            orderType.setParcel(optionalParcel.get());
//            orderType.setOrderTypeName("parcel");
//            orderTypeRepository.save(orderType);
//
//            createOrder(orderRequestBody, orderType);
//
//            return new ResponseEntity<>("Užsakymas pateiktas su užsakymo tipu - atsiėmimas paštomate", HttpStatus.CREATED);
//        }
//        catch (Exception exc) {
//            System.out.println(exc);
//            return new ResponseEntity<>("An error occured", HttpStatus.BAD_REQUEST);
//        }
//    }
//    @PostMapping("api/v1/takefromdelivery")
//    public ResponseEntity<String> addDeliveryOrderType(@RequestBody OrderRequestDeliveryBody orderRequestDeliveryBody) {
//        try {
//            OrderType orderType = new OrderType();
//            orderType.setDelivery(orderRequestDeliveryBody.getDelivery());
//            orderType.setOrderTypeName("delivery");
//            deliveryRepository.save(orderRequestDeliveryBody.getDelivery());
//            orderTypeRepository.save(orderType);
//            createOrderDelivery(orderRequestDeliveryBody, orderType);
//            return new ResponseEntity<>("Užsakymas pateiktas su užsakymo tipu - pristatymas į namus", HttpStatus.CREATED);
//        }
//        catch(Exception exc) {
//            System.out.println(exc);
//            return new ResponseEntity<>("An error occured", HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    private void createOrderDelivery(OrderRequestDeliveryBody orderRequestBody, OrderType orderType) {
//        User user = userRepository.findByUsername(orderRequestBody.getUsername());
//        Order order = new Order();
//        Set<OrderItem> orderItems = new HashSet<>();
//        for (CartItem cartTempItem : orderRequestBody.getCartItems()) {
//            OrderItem orderItem = new OrderItem();
//            Optional optionalCartTempItem = plantRepository.findById(cartTempItem.getId());
//            Plant realPlant = (Plant) optionalCartTempItem.get();
//            orderItem.setPlant(realPlant);
//            orderItem.setQuantity(cartTempItem.getQuantity());
//            orderItem.setPlantCategory(realPlant.getCategory());
//            orderItem.setOrderType(orderType);
//            orderItems.add(orderItem);
//        }
//        order.setOrderItems(orderItems);
//        order.setTotal(orderRequestBody.getTotal());
//        order.setUser(user);
//        order.setOrderType(orderType);
//
//        for(OrderItem orderItem : orderItems) {
//            orderItem.setOrder(order);
//        }
//
//        orderRepository.save(order);
//
//        cartSessionItemRepository.deleteAllSessionCartItems(user.getId());
//        cartSessionRepository.deleteCartSession(user.getId());
//    }
//
//    private void createOrder(OrderRequestBody orderRequestBody, OrderType orderType) {
//        User user = userRepository.findByUsername(orderRequestBody.getUsername());
//        Order order = new Order();
//        Set<OrderItem> orderItems = new HashSet<>();
//        for (CartItem cartTempItem : orderRequestBody.getCartItems()) {
//            OrderItem orderItem = new OrderItem();
//            Optional optionalCartTempItem = plantRepository.findById(cartTempItem.getId());
//            Plant realPlant = (Plant) optionalCartTempItem.get();
//            orderItem.setPlant(realPlant);
//            orderItem.setQuantity(cartTempItem.getQuantity());
//            orderItem.setPlantCategory(realPlant.getCategory());
//            orderItem.setOrderType(orderType);
//            orderItems.add(orderItem);
//        }
//        order.setOrderItems(orderItems);
//        order.setTotal(orderRequestBody.getTotal());
//        order.setUser(user);
//        order.setOrderType(orderType);
//
//        for(OrderItem orderItem : orderItems) {
//            orderItem.setOrder(order);
//        }
//
//        orderRepository.save(order);
//
//        cartSessionItemRepository.deleteAllSessionCartItems(user.getId());
//        cartSessionRepository.deleteCartSession(user.getId());
//    }
//}
