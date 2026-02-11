import Realm from 'realm';

export class User extends Realm.Object<User> {
    _id!: Realm.BSON.UUID;
    name!: string;
    email!: string;
    password!: string;
    createdAt!: Date;

    static schema: Realm.ObjectSchema = {
        name: 'User',
        properties: {
            _id: 'uuid',
            name: 'string',
            email: 'string',
            password: 'string',
            createdAt: 'date',
        },
        primaryKey: '_id',
    };
}
