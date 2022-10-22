package com.viko.plants.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "plant_category")
@Getter
@Setter
public class PlantCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<Plant> plants;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="plantCategory")
    private Set<CartItem> cartItems;
}
