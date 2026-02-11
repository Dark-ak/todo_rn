import Realm from 'realm';

export class Task extends Realm.Object<Task> {
    _id!: Realm.BSON.UUID;
    name!: string;
    description!: string;
    priority!: string;
    isComplete!: boolean;
    createdAt!: Date;
    userId!: Realm.BSON.UUID;

    static schema: Realm.ObjectSchema = {
        name: 'Task',
        properties: {
            _id: 'uuid',
            name: 'string',
            description: 'string',
            priority: { type: 'string', default: 'Low' },
            isComplete: { type: 'bool', default: false },
            createdAt: 'date',
            userId: 'uuid',
        },
        primaryKey: '_id',
    };
}
