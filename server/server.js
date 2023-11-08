const fs = require('fs');
const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const userData = require('../server/data/users');
const jsonFile = 'data/users/json/getUsers.json';



server.get('/api/users', (req, res, next) => {
  let existingData = { users: [] };
  try {
    const existingDataJSON = fs.readFileSync(jsonFile, 'utf8');
    existingData = JSON.parse(existingDataJSON);
  } catch (error) {
  }
  res.status(200).send(existingData);
});

server.post('/api/users', (req, res, next) => {
  try {
    const userData = req.body; 

    let existingData = { users: [] };
    try {
      const existingDataJSON = fs.readFileSync(jsonFile, 'utf8');
      existingData = JSON.parse(existingDataJSON);
    } catch (error) {
    }

    const objData = {
      id: Date.now(),
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      birthDate: userData.birthDate,
      address: {
        id: Date.now(),
        street: userData.street,
        city: userData.city,
        country: userData.country,
        postalcode: userData.postalcode,
      },
    };

    // Agregar los nuevos datos al array existente
    existingData.users.push(objData);

    // Guardar los datos actualizados en el archivo JSON
    fs.writeFileSync(jsonFile, JSON.stringify(existingData, null, 2), 'utf8');

    res.status(201).json({ message: 'Usuario guardado con éxito', user: objData });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: 'Ocurrió un error al guardar el usuario' });
  }
});

server.put('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10); // Obtener el ID del usuario desde la URL
    const userData = req.body; // Los datos enviados en la solicitud PUT

    // Leer el archivo JSON existente (si existe)
    let existingData = { users: [] };
    try {
      const existingDataJSON = fs.readFileSync(jsonFile, 'utf8');
      existingData = JSON.parse(existingDataJSON);
    } catch (error) {
      // Si el archivo no existe, simplemente continuamos con un objeto vacío
    }

    // Buscar al usuario por su ID y actualizar sus datos
    const userToUpdate = existingData.users.find((user) => user.id === userId);
    if (userToUpdate) {
      const objData = {
        ...userToUpdate,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        birthDate: userData.birthDate,
        address: {
          street: userData.street,
          city: userData.city,
          country: userData.country,
          postalcode: userData.postalcode,
        },
      };
      Object.assign(userToUpdate, objData); // Actualizar los datos del usuario
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    // Guardar los datos actualizados en el archivo JSON
    fs.writeFileSync(jsonFile, JSON.stringify(existingData, null, 2), 'utf8');

    res.json({ message: 'Usuario actualizado con éxito', user: userToUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar el usuario' });
  }
});

server.delete('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10); // Obtener el ID del usuario desde la URL

    // Leer el archivo JSON existente (si existe)
    let existingData = { users: [] };
    try {
      const existingDataJSON = fs.readFileSync(jsonFile, 'utf8');
      existingData = JSON.parse(existingDataJSON);
    } catch (error) {
      // Si el archivo no existe, simplemente continuamos con un objeto vacío
    }

    // Encontrar al usuario por su ID y eliminarlo del array
    const userIndex = existingData.users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      existingData.users.splice(userIndex, 1); // Eliminar al usuario
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    // Guardar los datos actualizados en el archivo JSON
    fs.writeFileSync(jsonFile, JSON.stringify(existingData, null, 2), 'utf8');

    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el usuario' });
  }
});


server.listen(3000, () => {
  console.log('JSON server listening on port 3000');
});

