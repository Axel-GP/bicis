/**
 * @swagger
 * components:
 *   schemas:
 *     Bicicleta:
 *       type: object
 *       required:
 *         - id
 *         - color
 *         - modelo
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la bicicleta
 *         color:
 *           type: string
 *         modelo:
 *           type: string
 *         latitud:
 *           type: number
 *         longitud:
 *           type: number
 *       example:
 *         id: 1
 *         color: Rojo
 *         modelo: Trek
 *         latitud: 28.5037
 *         longitud: -13.8532
 */

/**
 * @swagger
 * tags:
 *   - name: Bicicletas
 *     description: Gestión de bicicletas
 */

/**
 * @swagger
 * /api/bicicletas:
 *   get:
 *     summary: Obtener todas las bicicletas
 *     tags: [Bicicletas]
 *     responses:
 *       200:
 *         description: Lista de bicicletas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bicicleta'
 */

/**
 * @swagger
 * /api/bicicletas/create:
 *   post:
 *     summary: Crear nueva bicicleta
 *     tags: [Bicicletas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Bicicleta'
 *     responses:
 *       201:
 *         description: Creada con éxito
 */

/**
 * @swagger
 * /api/bicicletas/delete:
 *   delete:
 *     summary: Eliminar bicicleta
 *     tags: [Bicicletas]
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       204:
 *         description: Eliminada
 */

/**
 * @swagger
 * /api/bicicletas/update:
 *   put:
 *     summary: Actualizar bicicleta
 *     tags: [Bicicletas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Bicicleta'
 *     responses:
 *       200:
 *         description: Actualizada
 */

let express = require('express');
let router = express.Router();
let BicicletaControllerAPI = require("../../controllers/api/BicicletaControllerAPI");

router.get("/", BicicletaControllerAPI.bicicleta_list);
router.post("/create", BicicletaControllerAPI.bicicleta_create);
router.delete("/delete", BicicletaControllerAPI.bicicleta_delete);
router.put("/update", BicicletaControllerAPI.bicicleta_update);

module.exports = router;