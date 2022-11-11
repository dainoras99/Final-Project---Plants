package com.viko.plants.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="order_type")
@Getter
@Setter
@NoArgsConstructor
public class OrderType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "order_type_name")
    private String orderTypeName;

    @ManyToOne
    @JoinColumn(name = "parcel_locker_order_type_id", nullable = true)
    @JsonBackReference
    private Parcel Parcel;

    @ManyToOne
    @JoinColumn(name="delivery_order_type_id", nullable = true)
    @JsonBackReference
    private Delivery delivery;

    @ManyToOne
    @JoinColumn(name="take_from_shop_order_type_id", nullable = true)
    @JsonBackReference
    private Shop shop;
}
