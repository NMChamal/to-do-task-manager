require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import cors
const helmet = require('helmet'); // Import helmet
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Enable CORS for the frontend origin
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(helmet()); // Use helmet
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger documentation is available at http://localhost:${PORT}/api-docs`);
});
