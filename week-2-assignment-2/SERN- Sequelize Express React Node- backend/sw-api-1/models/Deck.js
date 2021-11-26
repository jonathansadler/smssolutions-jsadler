"use strict";

module.exports = function(sequelize, DataTypes) {
    var Deck = sequelize.define("Deck",
        {
            name: { type: DataTypes.STRING, allowNull: false },
        },
        {
            timestamps: false,
            tableName: 'Decks'
        }
    );
    Deck.associate = function(models) { 
        Deck.belongsTo(
            models.Faction,
            {
                foreignKey: 'FactionId'
            }
        );
        Deck.hasMany(
            models.Card,
            {
                foreignKey: 'DeckId'
            }
        );
    };
    return Deck;
};

