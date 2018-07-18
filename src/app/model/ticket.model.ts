import { User } from './user.model';
export class Ticket {
    constructor(
        public id: string,
        public number: number,
        public title: string,
        public status: string,
        public priority: string,
        public image: string,
        public user: User,
        public assigned: User,
        public date: string,
        private changes: Array<string>
    ){}
}