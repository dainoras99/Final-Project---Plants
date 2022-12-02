package com.viko.plants.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="order_table")
@Getter
@Setter
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "total")
    private Float total;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    @JsonManagedReference(value="orderOrderItems")
    @OrderBy
    private Set<OrderItem> orderItems;

    @ManyToOne
    @JoinColumn(name = "order_type_id", nullable = false)
    private OrderType orderType;
}
