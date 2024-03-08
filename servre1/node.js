const express = require('express');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

// Connect to MySQL database
const sequelize = new Sequelize('gp', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define models for Project, Etape, and Tache
const Projet = sequelize.define('projet', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true // Allow null for now, adjust as needed
  },
  proprietaire_id: {
    type: DataTypes.INTEGER,
    allowNull: true // Allow null for now, adjust as needed
  }
});

const Etape = sequelize.define('etape', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true // Allow null for now, adjust as needed
  },
  ordre: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'etapes' // Specify the custom table name
});

const Tache = sequelize.define('tache', {
  titre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true // Allow null for now, adjust as needed
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  date_fin: {
    type: DataTypes.DATE,
    allowNull: true // Allow null for now, adjust as needed
  },
  priorite: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'taches' // Specify the custom table name
});

// Define associations between models
Projet.hasMany(Etape, { foreignKey: 'projet_id' });
Etape.belongsTo(Projet, { foreignKey: 'projet_id' });
Etape.hasMany(Tache, { foreignKey: 'etape_id' });
Tache.belongsTo(Etape, { foreignKey: 'etape_id' });

// Function to check if all tasks for the selected project's stages are marked as "termine"
async function checkProjectCompletion(selectedProjetId) {
  try {
    // Fetch all stages (etapes) for the selected project
    const stages = await Etape.findAll({ where: { projet_id: selectedProjetId } });

    // Check if all tasks for each stage are marked as "termine"
    for (const stage of stages) {
      const tasks = await Tache.findAll({ where: { etape_id: stage.id } });
      for (const task of tasks) {
        if (task.status !== 'termine') {
          return false; // If any task is not marked as "termine", return false
        }
      }
    }

    return true; // If all tasks are marked as "termine", return true
  } catch (error) {
    console.error('Error checking project completion:', error);
    throw error;
  }
}

// Express app
const app = express();

// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, 'client')));

// Middleware to parse JSON bodies
app.use(express.json());

// Backend API endpoint to fetch project progress
app.get('/api/project/progress', async (req, res) => {
  const { selectedProjetId } = req.query;

  try {
    // Check if all tasks for the selected project's stages are marked as "termine"
    const isProjectCompleted = await checkProjectCompletion(selectedProjetId);

    // Calculate progress percentage based on task completion status
    const progressPercentage = isProjectCompleted ? 100 : 50; // Example calculation

    // Send the progress percentage as a response
    res.json({ progressPercentage });
  } catch (error) {
    console.error('Error fetching project progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
