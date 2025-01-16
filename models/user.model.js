const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
    }
});

// Al no usar => podemos acceder al contexto con this
// y como el save se llama con user.save(), será user
// luego puedo acceder a sus campos, los definidos en el schema
userSchema.pre("save", async function(next) {
    if(!this.isModified("password") || this.password.startsWith('$2b$'))
        return next();

    this.password = bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function(requestPassword) {
    return await bcrypt.compare(requestPassword, this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;