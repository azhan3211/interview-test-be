const Note = require('../model/note');

const noteController = {
    create: async (req, res) => {
        const { title, content } = req.body;
        const userId = req.user.id;
        try {
            const note = await Note.create({ title, user_id: userId, content });
            res.status(201).json({ note: note});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const userId = req.user.id;
            const notes = await Note.findAll({
                where: { user_id: userId },
                order: [['createdAt', 'DESC']]
            });
            res.status(200).json({ notes : notes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getNoteById: getNote = async (req, res) => {
        const { id } = req.params;
        try {
            const userId = req.user.id;
            const note = await Note.findByPk(id);
            if (!note) return res.sendStatus(404);
            if (note.user_id != userId) return res.sendStatus(401);
            res.status(200).json(note);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { title, content } = req.body;
        try {
            const userId = req.user.id;
            const note = await Note.findByPk(id);
            if (!note) return res.sendStatus(404);
            if (note.user_id != userId) return res.sendStatus(401);
            note.title = title;
            note.content = content;
            await note.save();
            res.status(200).json(note);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const userId = req.user.id;
            const note = await Note.findByPk(id);
            if (!note) return res.sendStatus(404);
            if (note.user_id != userId) return res.sendStatus(401);
            await note.destroy();
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }    
}

module.exports = noteController;