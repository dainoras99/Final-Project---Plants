package com.viko.plants.entity;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name="take_from_shop_order_type")
@Data
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

}
