package com.viko.plants;

import static org.assertj.core.api.Assertions.assertThat;

import com.viko.plants.entity.User;
import com.viko.plants.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import java.util.Date;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
public class UserRepositoryTests {

    @Autowired
    private UserRepository repository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void testCreateUser() {
        User user = new User();
        Date date = new Date();
        user.setEmail("tomas.tomauskas@gmail.com");
        user.setPassword("tomas-tomauskas");
        user.setUsername("tomasx");
        user.setFirstname("Tomas");
        user.setLastname("Tomauskas");
        user.setBirthdate(date);

        User savedUser = repository.save(user);
        User existUser = entityManager.find(User.class, savedUser.getId());

        assertThat(existUser.getEmail()).isEqualTo(user.getEmail());
    }
}
