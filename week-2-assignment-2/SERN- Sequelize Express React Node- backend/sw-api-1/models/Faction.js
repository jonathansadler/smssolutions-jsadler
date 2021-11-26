"use strict";

module.exports = function(sequelize, DataTypes) {
    var Faction = sequelize.define("Faction",
        {
            galatic_empire: { type: DataTypes.BOOLEAN, allowNull: false },
            jedi_order: { type: DataTypes.BOOLEAN, allowNull: false },
            no_faction: { type: DataTypes.BOOLEAN, allowNull: false },
            rebel_alliance: { type: DataTypes.BOOLEAN, allowNull: false },
        },
        {
            timestamps: false,
            tableName: 'Factions'
        }
    );
    Faction.associate = function(models) { 
        Faction.hasMany(
            models.Deck,
            {
                foreignKey: 'FactionId'
            }
        );
    };
    return Faction;
};

