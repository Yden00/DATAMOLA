class Message {
    _user = "Vlad Teterev"
    constructor(text = '', to = null, id = null, createdAt = null, author = null, isPersonal = null, msgs = []) {
        this._id = id;
        this.text = text;
        this._createdAt = createdAt || new Date();
        this._author = author;
        this.isPersonal = isPersonal ?? !!to;
        this._to = to;
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
    get id() {
        return this._id;
    }

    get createdAt() {
        return this._createdAt;
    }

    get author() {
        return this._author;
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

    add(msgg) {
        if (validate(msgg) && this._user === msgg.author) {
            msg.id = `${+new Date()}`;
            msg.createdAt = new Date();
            messages.push(msgg);
            return true;
        }
        return false;
    }

    edit(id, msgg) {
        const messageToEdit = msg.find(item => item.id === id);
        if (this.validateMessage(messageToEdit) && this._user === msgg.author) {
            msg = msg.map(item => {
                return item.id === id ? {
                    ...messageToEdit,
                    ...msgg,
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



