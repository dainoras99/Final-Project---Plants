package com.viko.plants.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="order_item")
@Getter
@Setter
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "plants_id", nullable = false)
    @JsonBackReference
    private Plant plant;

    @ManyToOne
    @JoinColumn(name = "plants_plants_category_id", nullable = false)
    @JsonBackReference
    private PlantCategory plantCategory;

    @ManyToOne
    @JoinColumn(name="order_id", nullable = false)
    @JsonBackReference
    private Order order;

    @ManyToOne
    @JoinColumn(name="order_order_type_id", nullable = false)
    @JsonBackReference
    private OrderType orderType;
}
