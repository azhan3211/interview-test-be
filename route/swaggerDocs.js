/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for user authentication
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     summary: Create a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request (validation errors)
 *       500:
 *         description: Internal server error
 */
 router.post('/api/auth/sign-up', userController.register);

 /**
  * @swagger
  * /api/auth/sign-in:
  *   post:
  *     summary: Log in an existing user
  *     tags: [Auth]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               email:
  *                 type: string
  *                 format: email
  *               password:
  *                 type: string
  *                 format: password
  *     responses:
  *       200:
  *         description: Login successful
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                   type: string
  *                 accessToken:
  *                   type: string
  *                 user:
  *                   type: object
  *                   properties:
  *                     id:
  *                       type: integer
  *                     email:
  *                       type: string
  *                     username:
  *                       type: string
  *       401:
  *         description: Invalid email or password
  *       500:
  *         description: Internal server error
  */
 router.post('/api/auth/sign-in', userController.login);
 
 /**
  * @swagger
  * /api/auth/me:
  *   get:
  *     summary: Get the profile of the authenticated user
  *     tags: [Auth]
  *     security:
  *       - BearerAuth: []
  *     responses:
  *       200:
  *         description: User profile retrieved successfully
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 id:
  *                   type: integer
  *                 email:
  *                   type: string
  *                 username:
  *                   type: string
  *       401:
  *         description: Unauthorized (invalid or missing token)
  *       500:
  *         description: Internal server error
  */
 router.get('/api/auth/me', authenticateToken, userController.profile);


/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API for managing notes
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal server error
 */
 app.get('/api/notes', getAllNotes);

 /**
  * @swagger
  * /api/notes:
  *   post:
  *     summary: Create a new note
  *     tags: [Notes]
  *     security:
  *       - BearerAuth: []
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               title:
  *                 type: string
  *               content:
  *                 type: string
  *     responses:
  *       201:
  *         description: Note created successfully
  *       500:
  *         description: Internal server error
  */
 app.post('/api/notes', createNote);
 
 /**
  * @swagger
  * /api/notes/{id}:
  *   put:
  *     summary: Update an existing note
  *     tags: [Notes]
  *     security:
  *       - BearerAuth: []
  *     parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         description: The note ID
  *         schema:
  *           type: integer
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               title:
  *                 type: string
  *               content:
  *                 type: string
  *     responses:
  *       200:
  *         description: Note updated successfully
  *       404:
  *         description: Note not found
  *       500:
  *         description: Internal server error
  */
 app.put('/api/notes/:id', updateNote);
 
 /**
  * @swagger
  * /api/notes/{id}:
  *   delete:
  *     summary: Delete a note
  *     tags: [Notes]
  *     security:
  *       - BearerAuth: []
  *     parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         description: The note ID
  *         schema:
  *           type: integer
  *     responses:
  *       204:
  *         description: Note deleted successfully
  *       404:
  *         description: Note not found
  *       500:
  *         description: Internal server error
  */
 app.delete('/api/notes/:id', deleteNote);
 