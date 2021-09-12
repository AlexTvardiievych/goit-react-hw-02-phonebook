import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import nextId from 'react-id-generator';
import Container from './Utils/Container/Container';
import Title from './Utils/Title/Title';

export default class App extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };

    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value,
        });
    };

    addContact = data => {
        const { name, number } = data;
        const { contacts } = this.state;
        const id = nextId();
        const newContact = {
            name,
            id,
            number,
        };

        const checkOnSameContact = contacts.find(
            contact => contact.name.toLowerCase() === newContact.name.toLowerCase(),
        );

        if (checkOnSameContact) {
            alert(`${newContact.name} is already in contacts`);
        }
        else {
            if (name === '' && number === '') {
                return;
            }

            if (name === '' || number === '') {
                alert('Pleasy fill empty fields');
                return;
            } else {
                this.setState(prev => ({
                    contacts: [...prev.contacts, newContact],
                }));
            }
        }
    };

    deleteContact = contactId => {
        this.setState(prev => ({
            contacts: prev.contacts.filter(contact => contactId !== contact.id),
        }));
    };

    handleFilterChange = e => {
        const target = e.target.value;
        this.setState({
            filter: target,
        });
    };

    filterByName = () => {
        const { contacts, filter } = this.state;
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()),
        );
    };

    render() {
        const { contacts, filter } = this.state;

        const filteredContacts = this.filterByName();
        return (
            <Container>
                <Title color="#424242" size={30} text="Phonebook" />
                <ContactForm onSubmit={this.addContact} contacts={contacts} />
                <Filter value={filter} onChange={this.handleFilterChange} />

                <Title marginT={10} size={20} text="Contacts" />

                <ContactList
                    onDeleteContact={this.deleteContact}
                    contacts={filteredContacts}
                />
            </Container>
        );
    }
}