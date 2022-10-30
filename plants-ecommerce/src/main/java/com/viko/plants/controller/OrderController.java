package com.viko.plants.controller;

import com.viko.plants.entity.*;
import com.viko.plants.repository.*;
import com.viko.plants.request.OrderItemRequest;
import com.viko.plants.request.OrderRequestBody;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlantRepository plantRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private ParcelRepository parcelRepository;

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private OrderTypeRepository orderTypeRepository;

    @Autowired
    private CartSessionItemRepository cartSessionItemRepository;

    @Autowired
    private CartSessionRepository cartSessionRepository;

    @PostMapping("api/v1/takefromshop")
    public ResponseEntity<String> addTakeOrderType(@RequestParam Integer id, @RequestBody OrderRequestBody orderRequestBody) {
        try {
            // debugging
            System.out.println(orderRequestBody.getCartItems());
            System.out.println(orderRequestBody.getTotal());
            System.out.println(orderRequestBody.getUsername());
            System.out.println(orderRequestBody.getCartItems().size());
            //


            OrderType orderType = new OrderType();
            User user = userRepository.findByUsername(orderRequestBody.getUsername());

            Optional<Shop> optionalShop = shopRepository.findById(id);
            orderType.setShop(optionalShop.get());
            orderTypeRepository.save(orderType);
            // reik sutvarkyt, dublikuojanti funkcija cia test ir dadet order items ir pan :).
            Order order = new Order();
            Set<OrderItem> orderItems = new HashSet<>();
            for (CartItem cartTempItem : orderRequestBody.getCartItems()) {
                OrderItem orderItem = new OrderItem();
                //
                Optional optionalCartTempItem = plantRepository.findById(cartTempItem.getId());
                Plant realPlant = (Plant) optionalCartTempItem.get();

                //
                orderItem.setPlant(realPlant);
                orderItem.setQuantity(cartTempItem.getQuantity());
                orderItem.setPlantCategory(realPlant.getCategory());
                orderItem.setOrderType(orderType);
                orderItems.add(orderItem);
            }
            order.setOrderItems(orderItems);
            order.setTotal(orderRequestBody.getTotal());
            order.setUser(user);
            order.setOrderType(orderType);

            for(OrderItem orderItem : orderItems) {
                orderItem.setOrder(order);
            }

            orderRepository.save(order);

            // removing cart items and cart orders
            cartSessionItemRepository.deleteAllSessionCartItems(user.getId());
            cartSessionRepository.deleteCartSession(user.getId());




            return new ResponseEntity<>("Pridetas Order type take", HttpStatus.CREATED);
        }
        catch (Exception exc) {
            System.out.println(exc);
            return new ResponseEntity<>("An error occured", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("api/v1/takefromparcel")
    public ResponseEntity<String> addParcelOrderType(@RequestParam Integer id) {
        try {
            OrderType orderType = new OrderType();

            Optional<Parcel> optionalParcel = parcelRepository.findById(id);
            orderType.setParcel(optionalParcel.get());
            orderTypeRepository.save(orderType);
            return new ResponseEntity<>("Pridetas Order type parcel", HttpStatus.CREATED);
        }
        catch (Exception exc) {
            System.out.println(exc);
            return new ResponseEntity<>("An error occured", HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("api/v1/takefromdelivery")
    public ResponseEntity<String> addDeliveryOrderType(@RequestBody Delivery delivery) {
        try {
            OrderType orderType = new OrderType();
            orderType.setDelivery(delivery);
            deliveryRepository.save(delivery);
            orderTypeRepository.save(orderType);
            return new ResponseEntity<>("Pridetas Order type delivery", HttpStatus.CREATED);
        }
        catch(Exception exc) {
            System.out.println(exc);
            return new ResponseEntity<>("An error occured", HttpStatus.BAD_REQUEST);
        }
    }

//    @PostMapping("api/v1/createOrder")
//    public ResponseEntity<String> createOrder(@RequestBody OrderItemRequest orderItemRequest) {
//        try {
//            OrderItem orderItem = new OrderItem();
//            Set<OrderItem> orderItems = new HashSet<>();
//
//            User user = userRepository.findByUsername(orderItemRequest.getUsername());
//            Plant plant = plantRepository.findByName(orderItemRequest.getPlantName());
//
//            orderItem.setPlantCategory(plant.getCategory());
//            orderItem.setPlant(plant);
//            orderItem.setQuantity(orderItemRequest.getQuantity());
//            orderItem.set
//
//            cartItems.add(cartItem);
//            return new ResponseEntity<>("Nauja sesija sukurta", HttpStatus.CREATED);
//        } catch (Exception exc) {
//            System.out.println(exc);
//            return new ResponseEntity<>("An error occured", HttpStatus.BAD_REQUEST);
//        }
//    }
}
