const messages = [
    {
      id: '1',
      text: ' You guys, you guys! Chef is going away.',
      createdAt: new Date('October 28, 2020 12:32:00'),
      author: 'Stan Marsh',
      isPersonal: false,
    },
    {
      id: '2',
      text: ' Going away? For how long?',
      createdAt: new Date('October 28, 2020 12:33:00'),
      author: 'Kyle Broflovski',
      isPersonal: false,
    },
    {
      id: '3',
      text: 'Forever.',
      createdAt: new Date('October 28, 2020 12:34:00'),
      author: 'Stan Marsh',
      isPersonal: false,
    },
    {
      id: '4',
      text: "I'm sorry boys.",
      createdAt: new Date('October 28, 2020 12:35:00'),
      author: 'Chef',
      isPersonal: true,
      to: '',
    },
    {
      id: '5',
      text:
        "Chef said he's been bored, so he joining a group called the Super Adventure Club.",
      createdAt: new Date('October 28, 2020 12:36:00'),
      author: 'Stan Marsh',
      isPersonal: false,
    },
    {
      id: '6',
      text: 'Wow!',
      createdAt: new Date('October 28, 2020 12:37:00'),
      author: 'Chef',
      isPersonal: false,
    },
    {
      id: '7',
      text:
        'Chef?? What kind of questions do you think adventuring around the world is gonna answer?!',
      createdAt: new Date('October 28, 2020 12:38:00'),
      author: 'Mrs. Garrison',
      isPersonal: true,
      to: 'Chef',
    },
    {
      id: '8',
      text: "What's the meaning of life? Why are we here?",
      createdAt: new Date('October 28, 2020 12:39:00'),
      author: 'Chef',
      isPersonal: true,
      to: 'Mrs. Garrison',
    },
    {
      id: '9',
      text: "I hope you're making the right choice.",
      createdAt: new Date('October 28, 2020 12:40:00'),
      author: 'Mrs. Garrison',
      isPersonal: true,
      to: 'Chef',
    },
    {
      id: '10',
      text:
        "I'm gonna miss him. I'm gonna miss Chef and I...and I don't know how to tell him!",
      createdAt: new Date('October 28, 2020 12:41:00'),
      author: 'Eric Cartman',
      isPersonal: false,
    },
    {
      id: '11',
      text: 'Dude, how are we gonna go on? Chef was our fuh...f-ffriend.',
      createdAt: new Date('October 28, 2020 12:42:00'),
      author: 'Stan Marsh',
      isPersonal: true,
      to: 'Kyle Broflovski',
    },
    {
      id: '12',
      text:
        'And we will all miss you, Chef, but we know you must do what your heart tells you..',
      createdAt: new Date('October 28, 2020 12:43:00'),
      author: 'Mayor McDaniels',
      isPersonal: true,
      to: 'Chef',
    },
    {
      id: '13',
      text: 'Bye-bye!',
      createdAt: new Date('October 28, 2020 12:44:00'),
      author: 'Jimbo',
      isPersonal: false,
    },
    {
      id: '14',
      text: 'Good-bye!',
      createdAt: new Date('October 28, 2020 12:45:00'),
      author: 'Gerald',
      isPersonal: false,
    },
    {
      id: '15',
      text: 'So long!',
      createdAt: new Date('October 28, 2020 12:46:00'),
      author: 'Mr. Mackey',
      isPersonal: false,
    },
    {
      id: '16',
      text: 'Good-bye, Chef!',
      createdAt: new Date('October 28, 2020 12:47:00'),
      author: 'Sign-Holder',
      isPersonal: false,
    },
    {
      id: '17',
      text: 'Good-bye, Chef! Have a good time at the Super Adventure Club!',
      createdAt: new Date('October 28, 2020 12:48:00'),
      author: 'Randy',
      isPersonal: false,
    },
    {
      id: '18',
      text: 'Good-bye!',
      createdAt: new Date('October 28, 2020 12:49:00'),
      author: 'Chef',
      isPersonal: false,
    },
    {
      id: '19',
      text: 'Hello there, children!',
      createdAt: new Date('October 29, 2020 14:13:00'),
      author: 'Chef',
      isPersonal: false,
    },
    {
      id: '20',
      text: "He's back!",
      createdAt: new Date('October 28, 2020 12:51:00'),
      author: 'Stan',
      isPersonal: false,
    },
  ];

const Message = require('./messageContainer');

class MessageList {
    constructor(msgs) {
        this.msgs = msgs;
    }
    _filterObj = {
        author: (item, author) => !author || item.author.toLowerCase().includes(author.toLowerCase()),
        text: (item, text) => !item || item.text.toLowerCase().includes(text.toLowerCase()),
        dateTo: (item, dateTo) => !dateTo || item.dateTo < dateTo,
        dateFrom: (item, dateFrom) => !dateFrom || item.dateFrom > dateFrom
    }
    _validateObj = {
        text: (item) => item.text && item.text.length <= 200
    }

    getPage(skip = 0, top = 10, filterConfig) {
        msg = messages.slice();
        Object.keys(filterConfig).forEach(key => {
            this.msg = msg.filter(item => this._filterObj[key](item, filterConfig[key]));
        })
        return [...msg.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))].slice(skip, skip + top);
    }

    get(id) {
        return msg.find(item => item.id === id);
    }

    add(Message) {
        if (validate(Message) && this._user === Message.author) {
            msg.id = `${+new Date()}`;
            msg.createdAt = new Date();
            messages.push(Message);
            return true;
        }
        return false;
    }

    edit(id, Message) {
        const messageToEdit = msg.find(item => item.id === id);
        if (this.validateMessage(messageToEdit) && this._user === Message.author) {
            msg = msg.map(item => {
                return item.id === id ? {
                    ...messageToEdit,
                    ...Message,
                } : item;
            });
            return true;
        } else {
            return false;
        }
    }
    remove(id) {
        const newMessages = msg.filter(item => item.id !== id);
        if (newMessages.length !== msg.length && this._user === msg.author) {
            msg = newMessages;
            return true;
        } else {
            return false;
        }
    }

    static validate(msg) {
        return Object.keys(_validateObj).every(key => _validateObj[key](msg));
    }
}



