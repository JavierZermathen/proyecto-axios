const d = document,
      $table = d.querySelector(".crud-table"),
      $form = d.querySelector(".crud-form"),
      $title = d.querySelector(".crud-title"),
      $template = d.getElementById("crud-template").content,
      $fragment = d.createDocumentFragment();

$hola = d.querySelector("tbody"),
axios.get ("http://localhost:3000/personas/")



//metodo GET
.then ( (res) => {

  console.log(res);

  let json = res.data;

  console.log(json);

  json.forEach(el => {
    $template.querySelector(".nombre").textContent = el.nombre;
    $template.querySelector(".apellido").textContent = el.apellido;
    $template.querySelector(".localidad").textContent = el.localidad;

    $template.querySelector(".edit").dataset.id = el.id;
    $template.querySelector(".edit").dataset.nombre = el.nombre;
    $template.querySelector(".edit").dataset.apellido = el.apellido;
    $template.querySelector(".delete").dataset.id = el.id;

    let $clone = d.importNode($template,true);
    $fragment.appendChild($clone);
  });

  $table.querySelector("tbody").appendChild($fragment);
  //$hola.appendChild($fragment)
} )

.catch ((err)=> {
  let message = err.statusText || "Ocurrió un error";
  $table.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
})


.finally()




d.addEventListener("submit", async e => {
if (e.target === $form) {
  e.preventDefault();

  if (!e.target.id.value) {
    //Crear - POST
    try {
      let options = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8"
        },
        data: JSON.stringify({
          nombre: e.target.nombre.value,
          apellido: e.target.apellido.value,
          localidad: e.target.localidad.value
        })
      },
        res = await axios("http://localhost:3000/personas", options),
        json = await res.data;

    
      location.reload();
    } 
    
    catch (err) {
      let message = err.statusText || "Ocurrió un error";
      $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
    }
  } else {


    //Editar - PUT
    try {
      let options = {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=utf-8"
        },
        data: JSON.stringify({
          nombre: e.target.nombre.value,
          apellido: e.target.apellido.value,
          localidad: e.target.localidad.value
        })
      },
        res = await axios(`http://localhost:3000/personas/${e.target.id.value}`, options),
        json = await res.data;

      

      location.reload();
    } catch (err) {
      let message = err.statusText || "Ocurrió un error";
      $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
    }
  }
}
});



d.addEventListener("click", async e => {
if (e.target.matches(".edit")) {
  $title.textContent = "Editar Persona";
  $form.nombre.value = e.target.dataset.nombre;
  $form.apellido.value = e.target.dataset.apellido;
  $form.localidad.value = e.target.dataset.localidad;
  $form.id.value = e.target.dataset.id;
}


if (e.target.matches(".delete")) {
  let isDelete = confirm(`¿Estás seguro de eliminarlo ${e.target.dataset.id}?`);

  if (isDelete) {
    //borrar - DELETE
    try {
      let options = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=utf-8"
        }
      },
        res = await axios(`http://localhost:3000/personas/${e.target.dataset.id}`, options),
        json = await res.data;

      
      location.reload();
    } 
    
    
    catch (err) {
      let message = err.statusText || "Ocurrió un error";
      alert(`Error ${err.status}: ${message}`);
    }
  }
}
})