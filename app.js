const express = require("express");
const paises = require("./paises.json");

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`

    <h1>API de Países 🌎</h1>

    <h2>Rutas disponibles:</h2>

    <ul>
      <li>
        <strong>GET /paises</strong><br>
        Devuelve todos los países
      </li>

      <br>

      <li>
        <strong>GET /paises/:nombre</strong><br>
        <a href="/paises/argentina">
          /paises/argentina
        </a>
      </li>

      <br>

      <li>
        <strong>GET /buscar?idioma=italiano</strong><br>
        <a href="/buscar?idioma=italiano">
          /buscar?idioma=italiano
        </a>
      </li>

    </ul>

  `);
});

// GET TODOS

app.get("/paises", (req, res) => {
  res.json(paises);
});

// GET POR NOMBRE

app.get("/paises/:nombre", (req, res) => {
  const nombrePais = req.params.nombre;

  const paisEncontrado = paises.find(
    (pais) => pais.pais.toLowerCase() === nombrePais.toLowerCase(),
  );

  if (!paisEncontrado) {
    return res.status(404).json({
      mensaje: "País no encontrado",
    });
  }

  res.json(paisEncontrado);
});
app.get("/buscar", (req, res) => {
  const idioma = req.query.idioma;

  const paisesFiltrados = paises.filter((pais) =>
    pais.idioma.some(
      (idiomaPais) => idiomaPais.toLowerCase() === idioma.toLowerCase(),
    ),
  );

  res.json(paisesFiltrados);
});

//position: // POST

app.post("/paises", (req, res) => {
  const nuevoPais = req.body;

  paises.push(nuevoPais);

  res.status(201).json({
    mensaje: "País agregado correctamente",
    paises,
  });
});

//delete
app.delete("/paises/:nombre", (req, res) => {
  const nombrePais = req.params.nombre;

  const indicePais = paises.findIndex(
    (pais) => pais.pais.toLowerCase() === nombrePais.toLowerCase(),
  );

  if (indicePais === -1) {
    return res.status(404).json({
      mensaje: "País no encontrado",
    });
  }

  paises.splice(indicePais, 1);

  res.json({
    mensaje: "País eliminado correctamente",
    paises,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
