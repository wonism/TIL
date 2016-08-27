var Schema = {
  users: {
    id: { type: 'increments', nullable: false, primary: true },
    user_id: { type: 'string', maxlength: 150, nullable: false, unique: true },
    password: { type: 'string', nullable: false },
    salt: { type: 'string', nullable: false },
    created_at: { type: 'dateTime', nullable: false },
    updated_at: { type: 'dateTime', nullable: false },
    from: { type: 'string', maxlength: '50', nullable: false, defaultTo: 'organic' },
    other_informations: { type: 'text', nullable: true }
  }
};

module.exports = Schema;

