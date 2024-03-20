import { ref } from "vue";

export default ref<any>([
  {
    roomId: 1,
    title: "Test room",
    roomMessages: [
      {
        type: "text",
        data: {
          text: "Hello World",
        },
        time: new Date("04/03/2023"),
        isOwn: true,
        messageReactions: [],
        showTimeLabel: true,
      },
      {
        type: "text",
        data: {
          text: "Hello World",
        },
        time: new Date("04/07/2023"),
        isOwn: false,
        messageReactions: [],
        showTimeLabel: true,
      },
    ],
    startConversation: "04/03/2023",
    messagesLoaded: "04/07/2023",
    newMessageTime: "04/07/2023",
  },
  {
    roomId: 2,
    title: "Room 2",
    roomMessages: [],
    startConversation: "",
    messagesLoaded: "04/04/2023",
    newMessageTime: "04/07/2023",
  },
  {
    roomId: 3,
    startConversation: "",
    title: "Room 3",
    roomMessages: [],
    messagesLoaded: "04/04/2023",
    newMessageTime: "04/07/2023",
  },
]);
