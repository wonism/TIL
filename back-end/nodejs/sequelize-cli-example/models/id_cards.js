'use strict';
module.exports = function(sequelize, DataTypes) {
  var id_cards = sequelize.define('id_cards', {
    birth: DataTypes.DATE,
    person_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        id_cards.belongsTo(models.persons, {
          foreignKey: 'person_id'
        });
      }
    }
  });
  return id_cards;
};
