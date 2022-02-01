const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    message: {
        text: { type: String, required: true }
        // you can add any other properties to the message here.
        // for example, the message can be an image ! so you need to tweak this a little
    },

    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    read: { type: Date }
},
    {
        timestamps: true
    });

// you can fetch the chats by this query:

// Message.find(({ users: { "$in" : [#user1#,#user2#]} })
// .sort({ updatedAt: -1 })
// .limit(20)


module.exports = mongoose.model('Message', MessageSchema); 