const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const config = require('./config/index');

const app = express();

app.use(helmet());
app.use(cors({
    origin: config.whitelistOrigin,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'views/assets/uploads')));

const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const billingRoutes = require('./routes/billing');
const inventoryRoutes = require('./routes/inventory');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/billing', billingRoutes);
app.use('/api/v1/inventory', inventoryRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'HMS API' });
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: { message: err.message || 'Internal Server Error' }
    });
});

module.exports = app;
