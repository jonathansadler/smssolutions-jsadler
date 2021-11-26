"use strict";

module.exports = function(sequelize, DataTypes) {
    var Card = sequelize.define("Card",
        {
            swid: { type: DataTypes.INTEGER, allowNull: true },
            person_url: { type: DataTypes.STRING, allowNull: false },
        },
        {
            timestamps: false,
            tableName: 'Cards'
        }
    );
    Card.associate = function(models) { 
        Card.belongsTo(
            models.Deck,
            {
                foreignKey: 'DeckId'
            }
        );
    };
    return Card;
};

