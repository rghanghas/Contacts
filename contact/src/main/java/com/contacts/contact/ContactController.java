package com.contacts.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/contacts")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    @Autowired
    ContactRepository contactrepo;

    @GetMapping("/{userId}")
    public List<Contact> getContactsByUserId(@PathVariable Integer userId) {
        return contactrepo.findByUserId(userId);
    }

    @PostMapping
    public Contact createContact(@RequestBody Contact contact) {
        return contactrepo.save(contact);
    }

    @PutMapping
    public Contact updateContact(@RequestBody Contact contact) {
        return contactrepo.save(contact);
    }

    @DeleteMapping("/{id}")
    public void deleteContact(@PathVariable Integer id) {
        contactrepo.deleteById(id);
    }
}