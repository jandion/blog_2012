// Modelos ORM

var path = require('path');

var Sequelize = require('sequelize');

// Usar BBDD definida en variables de entorno:
var sequelize = new Sequelize(process.env.DATABASE_NAME, 
                              process.env.DATABASE_USER, 
                              process.env.DATABASE_PASSWORD, 
            { dialect: process.env.DATABASE_DIALECT, 
              protocol: process.env.DATABASE_PROTOCOL, 
              port: process.env.DATABASE_PORT,
              host: process.env.DATABASE_HOST,
              storage: process.env.DATABASE_STORAGE,
              omitNull: true});

// Importar la definicion de los modelos:
//    - Post desde post.js.
//    - User desde user.js.
var Post = sequelize.import(path.join(__dirname,'post'));
var User = sequelize.import(path.join(__dirname,'user'));

// Relaciones

// La llamada User.hasMany(Post); 
//  - crea un atributo llamado userId en el modelo de Post  
//  - y en el prototipo de User se crean los metodos getPosts, setPosts,
//    addPost, removePost, hasPost y hasPosts.
// 
// Como el atributo del modelo Post que apunta a User se llama authorId 
// en vez de userId, he añadido una opcion que lo indica.
User.hasMany(Post, {foreignKey: 'authorId'});

// La llamada Post.belongsTo(User);
//  - crea en el modelo de Post un atributo llamado userId,
//  - y en el prototipo de Post se crean los metodos getUser y setUser.
//
// Como el atributo del modelo Post que apunta a User se llama authorId 
// en vez de userId, he añadido una opcion que lo indica. Asi la 
// foreignkey del modelo Post es authorId, y los metodos creados son 
// setAuthor y getAuthor. 
Post.belongsTo(User, {as: 'Author', foreignKey: 'authorId'});


// Exportar los modelos:
exports.Post = Post;
exports.User = User;