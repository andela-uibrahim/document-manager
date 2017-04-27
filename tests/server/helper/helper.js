import faker from 'faker';

export default {
  newRole1: {
    role: 'admin',
  },
  newRole2: {
    role: faker.company.catchPhrase(),
  },
  fakeUser: {
    email: 'admin@admin.com',
    password: faker.internet.password(),
  },
  publicDoc: {
    title: faker.random.word(),
    content: faker.lorem.paragraph(),
    access: 'public',
  },
   publicDoc2: {
    title: faker.random.word(),
    content: faker.lorem.paragraph(),
    access: 'public',
  },
   publicDoc3: {
    title: faker.random.word(),
    content: faker.lorem.paragraph(),
    access: 'public',
  },
   publicDoc1: {
    title: faker.random.word(),
    content: faker.lorem.paragraph(),
    access: 'public',
  },
   publicDoc4: {
    title: faker.random.word(),
    content: faker.lorem.paragraph(),
    access: 'public',
  },
  privateDoc: {
    title: faker.random.word(),
    content: faker.lorem.paragraph(),
    access: 'private'
  },
  user: {
    username: faker.internet.userName(),
    email: 'test@test.com',
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: process.env.USER_PASSWORD,
    RoleId: 2
  },
  regularUser: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: process.env.USER_PASSWORD,
    RoleId: 2
  },
  regularUser2: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: process.env.USER_PASSWORD,
    RoleId: 2
  },
  regularUser3: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: process.env.USER_PASSWORD,
    RoleId: 2
  },
  regularUser4: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: process.env.USER_PASSWORD,
    RoleId: 2
  },
  newAdmin: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: process.env.USER_PASSWORD,
    RoleId: 1
  },
  user2: {
    username: 'jane',
    email: 'jane@john.com',
    firstname: 'john',
    lastname: 'alimi',
    password: 'userPassword',
    RoleId: 2
  },
  admin: {
    username: faker.internet.userName(),
    email: 'admin@admin.com',
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: process.env.ADMIN_PASSWORD,
    RoleId: 1
  },
  sharedDoc: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public',
  },
  shared: {
    email: faker.internet.email(),
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
      documentId: 1
    },
    invalidToken: {
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjYsImlhdCI6MTQ4ODkyNzU1OSwiZXhwIjoxNDg5MDEzOTU5fQ.knnZeLlKhXkGX3AYeT3lUgJQlMqOVueDQC6BGkSgbY4`
    }
  }
};
