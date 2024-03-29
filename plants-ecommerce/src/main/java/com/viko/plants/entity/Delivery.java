package com.viko.plants.entity;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name="delivery_order_type")
@Data
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "zip_code")
    private Integer zipCode;

    @Column(name = "special_instructions")
    private String specialInstructions;

    @Column(name = "courier_tips")
    private Float courierTips;
}
