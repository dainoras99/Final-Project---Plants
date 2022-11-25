package com.viko.plants.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonBackReference(value="plantPlantCategory")
    private Set<Plant> plants;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="plantCategory")
    @JsonBackReference(value="plantCategoryCartItems")
    private Set<CartItem> cartItems;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="plantCategory")
    @JsonIgnore
    private Set<OrderItem> orderItems;
}
