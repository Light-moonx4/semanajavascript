const semana1 = () =>{
    const nombre = prompt("digite su nombre:")
    const edad = parseInt(prompt("digite su numero de edad:"))
    if(isNaN(edad)){
        alert("error la edad de debe ser un numero")
        return 
    }
    if (edad<18){
       alert("Nombre: " + nombre + "\nUsted es menor de edad\nEdad: " + edad);
    }
    if (edad>=18){
        alert("Nombre: " + nombre + "\nUsted es mayor de edad\nEdad: " + edad)
    }

}
semana1()