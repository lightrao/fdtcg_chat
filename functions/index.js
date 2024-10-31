// const { initializeApp } = require("firebase-admin/app");
// const { getMessaging } = require("firebase-admin/messaging");
// const { onDocumentCreated } = require("firebase-functions/firestore");

// initializeApp();

// exports.dispatchMessage = onDocumentCreated("chat/{messageId}", (event) => {
//     const snapshot = event.data;
//     const data = snapshot.data();
//     const message = getMessaging();
//     message.send({
//         topic: "chat",
//         notification: {
//             title: data["username"],
//             body: data["text"],
//         },
//         data: {
//             click_action: "FLUTTER_NOTIFICATION_CLICK",
//         },
//     });
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Cloud Firestore triggers ref: https://firebase.google.com/docs/functions/firestore-events
exports.myFunction = functions.firestore
    .document('chat/{messageId}')
    .onCreate((snapshot, context) => {
        // Return this function's promise, so this ensures the firebase function
        // will keep running, until the notification is scheduled.
        return admin.messaging().send({
            // Sending a notification message.
            notification: {
                title: snapshot.data()['username'],
                body: snapshot.data()['text'],
            },
            data: {
                // Data payload to be sent to the device.
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
            },
            topic: 'chat',
        });
    });