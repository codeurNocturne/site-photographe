const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// rendre public le dossier public
app.use(express.static(path.join(__dirname, "public")));


// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
});

// Route pour les fichiers CSS et JS
app.get('/:file', (req, res) => {
    const file = req.params.file;
    const allowedFiles = ['style.css', 'script.js'];
    
    if (allowedFiles.includes(file)) {
        res.sendFile(path.join(__dirname, file));
    } else {
        res.status(404).send('Fichier non trouvé');
    }
});

// API Route pour le formulaire de contact
app.post('/api/contact', (req, res) => {
    const { name, email, service, message } = req.body;
    
    console.log('Nouveau message reçu:');
    console.log('Nom:', name);
    console.log('Email:', email);
    console.log('Service:', service);
    console.log('Message:', message);
    
    // Validation des données
    if (!name || !email || !service || !message) {
        return res.status(400).json({
            success: false,
            message: 'Tous les champs sont requis'
        });
    }
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Format d\'email invalide'
        });
    }
    
    // Ici, normalement, vous pourriez:
    // 1. Sauvegarder dans une base de données
    // 2. Envoyer un email de notification
    // 3. Envoyer une notification sur Slack/Discord/etc.
    
    // Pour cet exemple, on simule un traitement réussi
    setTimeout(() => {
        res.json({
            success: true,
            message: 'Message envoyé avec succès!',
            data: {
                name,
                email,
                service,
                message
            },
            whatsappUrl: `https://wa.me/237689034220?text=${encodeURIComponent(
                `Bonjour! Je m'appelle ${name}. 
J'ai soumis une demande via votre site web.
Service souhaité: ${service}
Message: ${message}
Email: ${email}`
            )}`
        });
    }, 1000); // Simule un délai de traitement
});

// Route pour obtenir les images du portfolio (exemple)
app.get('/api/portfolio', (req, res) => {
    const portfolioData = [
        { 
            id: 1, 
            category: 'mariage',
            title: 'Mariage à Paris',
            description: 'Cérémonie traditionnelle à Notre-Dame',
            image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        { 
            id: 2, 
            category: 'portrait',
            title: 'Portrait en studio',
            description: 'Séance portrait professionnelle avec éclairage studio',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        { 
            id: 3, 
            category: 'evenement',
            title: 'Événement corporate',
            description: 'Conférence annuelle pour une entreprise tech',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        { 
            id: 4, 
            category: 'mariage',
            title: 'Mariage champêtre',
            description: 'Cérémonie en pleine nature dans les Alpes',
            image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        { 
            id: 5, 
            category: 'portrait',
            title: 'Portrait famille',
            description: 'Séance en extérieur au coucher du soleil',
            image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        { 
            id: 6, 
            category: 'evenement',
            title: 'Soirée de gala',
            description: 'Événement caritatif au Grand Palais',
            image: 'https://images.unsplash.com/photo-1492684223066-dd23140edf6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        }
    ];
    
    // Filtrer par catégorie si fournie
    const category = req.query.category;
    if (category && category !== 'all') {
        const filteredData = portfolioData.filter(item => item.category === category);
        return res.json(filteredData);
    }
    
    res.json(portfolioData);
});

// Route pour obtenir les statistiques
app.get('/api/stats', (req, res) => {
    res.json({
        clients: 500,
        anneesExperience: 10,
        seances: 1500,
        satisfaction: 98
    });
});

// Route pour tester l'API
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Photographer Website API',
        version: '1.0.0'
    });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route non trouvée'
    });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error('Erreur serveur:', err);
    res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Démarrer le serveur
app.listen(PORT,'0.0.0.0', () => {
    console.log(`
    🚀 Serveur démarré avec succès!
    
    📍 Port: ${PORT}
    🌐 URL: http://localhost:${PORT}
    
    📊 API Endpoints disponibles:
        GET  /api/health          → Vérifier l'état du serveur
        GET  /api/portfolio       → Obtenir le portfolio
        POST /api/contact         → Envoyer un message
        GET  /api/stats           → Obtenir les statistiques
    
    📱 Redirection WhatsApp configurée
    ✅ Prêt à recevoir des connexions!
    `);
});