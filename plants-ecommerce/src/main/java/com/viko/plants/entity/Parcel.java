package com.viko.plants.entity;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name="parcel_locker_order_type")
@Data
public class Parcel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "city")
    private String city;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "zipCode")
    private String zipCode;

}
