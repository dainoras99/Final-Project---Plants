package com.viko.plants.service;

import com.viko.plants.entity.User;
import com.viko.plants.entity.UserRole;
import com.viko.plants.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class UsersServiceImpl implements UsersService {

    private UserRepository userRepository;

    public UsersServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public ResponseEntity<String> deleteUser(Integer userId) {

        Optional<User> user = userRepository.findById(userId);
        userRepository.delete(user.get());
        return new ResponseEntity<>("Naudotojas pašalintas", HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<String> changeRole(Integer userId, boolean roleChange) {

        Optional<User> optionalUser = userRepository.findById(userId);
        User user = optionalUser.get();
        if (roleChange) user.setUserRole(UserRole.ADMIN);
        else user.setUserRole(UserRole.USER);
        userRepository.save(user);
        return new ResponseEntity<>("Naudotojo teisės pakeistos", HttpStatus.OK);
    }

}
