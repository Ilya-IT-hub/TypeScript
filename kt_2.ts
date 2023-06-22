class User {
  private _name: string;
  private _login: string;
  private _password: string;
  static count: number = 0;

  constructor(name: string, login: string, password: string) {
    this._name = name;
    this._login = login;
    this._password = password;
    User.count++;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get login(): string {
    return this._login;
  }

  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }

  showInfo(): void {
    console.log(`Name: ${this._name}, Login: ${this._login}`);
  }
}

class SuperUser extends User {
  private _role: string;
  static count: number = 0;

  constructor(name: string, login: string, password: string, role: string) {
    super(name, login, password);
    this._role = role;
    SuperUser.count++;
  }

  get role(): string {
    return this._role;
  }

  set role(role: string) {
    this._role = role;
  }

  showInfo(): void {
    console.log(`Name: ${this.name}, Login: ${this.login}, Role: ${this._role}`);
  }
}

const user1 = new User('Paul McCartney', 'paul', '1234');
const user2 = new User('George Harrison', 'george', '5678');
const user3 = new User('Richard Starkey', 'ringo', '8523');
const admin = new SuperUser('John Lennon', 'john', '0000', 'admin');

user1.showInfo();
admin.showInfo();

console.log(`Total users: ${User.count}`);
console.log(`Total superusers: ${SuperUser.count}`);

user3.name = 'Ringo Starr';
user1.password = 'Pa$$w0rd';

console.log(user3.name);
console.log(user2.password);
console.log(user2.login);

// user2.login = 'geo'; // Ошибка: нельзя изменять логин