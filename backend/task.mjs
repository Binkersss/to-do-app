import { uid } from 'uid';

export default class Task {
    /**
     * @param {string} name - Name of the task
     * @param {Date} [start_date] - Date the task is started
     * @param {Date} [end_date] - Date the task is ended
     * @param {string[]} [tags] - Optional array of tags
     */
    constructor(name, start_date = undefined, end_date = undefined, tags = []) {

        this._id = uid(24);
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.tags = tags;
    }
}