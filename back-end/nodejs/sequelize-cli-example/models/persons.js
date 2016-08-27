'use strict';
module.exports = function(sequelize, DataTypes) {
  var persons = sequelize.define('persons', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        persons.hasOne(models.id_cards);
      }
    }
  });
  return persons;
};
