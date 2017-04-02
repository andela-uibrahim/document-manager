import faker from 'faker';

export default {
  adminUser: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: 'kratus043',
    RoleId: 2,
  },
  newRole: {
    role: 'admin',
  },
  publicDoc: {
    title: faker.random.word(),
    content: faker.lorem.paragraph(),
    access: 'public',
    UserId: 2,
  },
  privateDoc: {
    title: faker.random.word(),
    content: faker.lorem.paragraph(),
    UserId: 2,
  },
  user: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: faker.internet.password(),
    RoleId: 2
  },
  user2: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: faker.internet.password(),
    RoleId: 2
  },
  sharedDoc: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public',
  },
  shared: {
    email: faker.internet.email(),
    canEdit: true,
  },
  invalid: {
    emailEmpty: {
      firstname: 'freemile',
      lastname: 'baba',
      username: 'freemileBaba',
      email: '',
      password: '1234'
    },
    passwordEmpty: {
      firstname: 'freemile',
      lastname: 'baba',
      username: 'freemileBaba',
      email: 'freemile@yahoo.com',
    },
    emptyEmail: {
      email: '',
      canEdit: true,
      documentId: 1
    },
    noName: {
      email: 'usman@gmail.com',
      password: '1234',
      RoleId: 4,
    },
    noEmail: {
      firstname: 'free',
      username: 'free',
      lastname: 'mile',
      password: '12345678',
    },
    noUsername: {
      firstname: 'mile',
      lastname: 'free',
      email: 'free@hotmail.com',
      password: '1234',
    },
    shortPassword: {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      password: 'kratus',
      RoleId: 1
    },
    repeatedEmail: {
      username: 'usman',
      email: faker.internet.email(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      password: 'kratus043',
      roleId: 1
    },
    invalidEmail: {
      firstname: 'mike',
      lastname: 'usman',
      username: 'usmike',
      email: 'thou',
      password: '12345678'
    },
    invalidDataType: {
      firstname: true,
      lastname: 78,
      username: false,
      email: {},
      password: '12345678'
    },
    badRole: {
      role: 'fellow',
    },
    invalidDoc: {
      title: faker.random.word(),
      content: faker.lorem.paragraph(),
      access: 'random',
      UserId: 5,
    },
    nullEmail: {
      canEdit: true,
      documentId: 1
    },
  }
};
