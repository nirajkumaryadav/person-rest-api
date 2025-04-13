const Person = require('../models/personModel');

class PersonController {
    async getAllPersons(req, res) {
        try {
            const persons = await Person.find();
            res.render('list', { persons: persons || [] });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async createPersonForm(req, res) {
        res.render('create');
    }

    async createPerson(req, res) {
        const { name, age, gender, mobile } = req.body;
        try {
            const newPerson = new Person({ 
                name, 
                age, 
                gender, 
                mobileNumber: mobile 
            });
            await newPerson.save();
            res.redirect('/person');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async editPersonForm(req, res) {
        try {
            const person = await Person.findById(req.params.id);
            if (!person) {
                return res.status(404).send('Person not found');
            }
            res.render('edit', { person });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async updatePerson(req, res) {
        const { name, age, gender, mobile } = req.body;
        try {
            await Person.findByIdAndUpdate(req.params.id, { 
                name, 
                age, 
                gender, 
                mobileNumber: mobile 
            });
            res.redirect('/person');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async deletePersonForm(req, res) {
        try {
            const person = await Person.findById(req.params.id);
            if (!person) {
                return res.status(404).send('Person not found');
            }
            res.render('delete', { person });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async deletePerson(req, res) {
        try {
            await Person.findByIdAndDelete(req.params.id);
            res.redirect('/person');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = new PersonController();