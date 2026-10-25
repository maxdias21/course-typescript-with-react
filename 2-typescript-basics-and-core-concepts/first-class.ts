// Criar uma variável com um tipo de dado, ele vai tipar com o dado criado
let stringType = "Eu vou ser uma string";
let booleanType = true;
let numberType = 27;

// Criar vários tipos em uma variável
let userId: string | number = '123';
userId = 123;

// Trabalhando com objetos
let user: {
    name: string,
    age: number,
    isAdmin: boolean,
    id: string | number
};

user = {
    name: 'Max',
    age: 27,
    isAdmin: true,
    id: 'abc'
};


// Trabalhando com arrays
let hobbies: Array<string | number>;  // Posso fazer assim: let hobbies: string[] | number[];
hobbies = ['Sports', 'Cooking', 'Reading'];
hobbies.push(1)

// Trabalhando com funções
function add(a: number, b: number): number {
    return a + b;
}

add(2, 2)


function calculate(a: number, b: number, calcFn: (a: number, b: number) => number) {
    calcFn(a, b);
}

calculate(10, 20, add);


// Trabalhando com type alias
// Basicamente, eu crio uma tipagem e uso ela em algum outro lugar
type TypeUser2 = {
    name: string,
    age: number,
    isAdmin: boolean,
    id: string | number
}

const user2: TypeUser2 = {
    name: 'Max',
    age: 27,
    isAdmin: true,
    id: 'abc'
}

// Trabalhando com interfaces
// Quase sempre, vamos usar para criar objetos e para usar métodos obrigatórios em classes
interface Credentials {
    password: string;
    email: string;
}

let creds: Credentials;
creds = {
    password: '123',
    email: 'udemy@udemy.com'
}

class Auth implements Credentials {
    password: string;
    email: string;
}

function Authenticated(credentials: Credentials) {

}

function login(credentials: Credentials) {

}

login(creds)


// Criei um type que tem que ser tanto Admin quanto AppUser
type Admin = {
    permissions: string[];
}

type AppUser = {
    userName: string;
}

type AppAdmin = Admin & AppUser;
let admin: AppAdmin = {
    permissions: ['remove'],
    userName: 'Max'
}


// Tipos literais, significa que só posso armazenar o que eu quero que armazene
type Role = 'admin' | 'user' | 'editor';
let role: Role = 'admin';

// Type guards
function performAction(action: string, role: Role) {
    // Se eu colocar role === id ou outra coisa, dá erro, pois o TS sabe que Role não tem o parâmetro id
    if (role === 'admin') {
    }
}


// Tipos gerericos
let roles1: Array<Role>;
roles1 = ['admin', 'user'];

type DataStorage<T> = {
    storage: T[];
    add: (data: T) => void;
}

const textStorage: DataStorage<string> = {
    storage: [''],
    add(data) {
        this.storage.push(data)
    }
}

function merge<T, U>(a: T, b: U): T & U {
    return {
        ...a,
        ...b
    }
}

const userGeneric = merge<{ name: string }, { age: number }>({name: 'Max'}, {age: 27});

