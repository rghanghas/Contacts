package com.contacts.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/contacts")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    @Autowired
    ContactRepository contactrepo;

    @GetMapping
    public List<Contact> getAllContacts() {
        return contactrepo.findAll();
    }

    @GetMapping("/{id}")
    public Contact getContactById(@PathVariable Integer id) {
        Optional<Contact> contact = contactrepo.findById(id);
        return contact.get();
    }

    @PostMapping
    public Contact createContact(@RequestBody Contact contact) {
        return contactrepo.save(contact);
    }

}
