const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

router.get('/person', personController.getAllPersons.bind(personController));

router.get('/person/create', personController.createPersonForm.bind(personController));
router.post('/person', personController.createPerson.bind(personController));

router.get('/person/:id/edit', personController.editPersonForm.bind(personController));
router.put('/person/:id', personController.updatePerson.bind(personController));

router.get('/person/:id/delete', personController.deletePersonForm.bind(personController));
router.delete('/person/:id', personController.deletePerson.bind(personController));

module.exports = router;