const IMAGENES = [
    { src: "../img/img1.jpg", punto: 1 },
    { src: "../img/img2.jpg", punto: 2 },
    { src: "../img/img3.jpg", punto: 3 },
    { src: "../img/img4.jpg", punto: 4 }
];

let indiceImg1Actual = 0; // índice actual de la imagen 1
let indiceImg2Actual = 0; // índice actual de la imagen 2
let contador = 0;
let record = 0;

function obtenerIndiceRandomDistinto(indiceActual) {
    let nuevoIndice;
    do {
        nuevoIndice = Math.floor(Math.random() * IMAGENES.length);
    } while (nuevoIndice === indiceActual);

    return nuevoIndice;
}

function cambiarImagen(valor) {
    let img1 = document.getElementById("img1");
    let img2 = document.getElementById("img2");

    const puntoImg1 = IMAGENES[indiceImg1Actual].punto;
    const puntoImg2 = IMAGENES[indiceImg2Actual].punto;

    document.getElementById("puntoimg2").innerHTML = `<p><span> Punto: </span><br>${puntoImg2}<p>`;

    const acerto =
        (valor === 0 && puntoImg2 < puntoImg1) ||
        (valor === 1 && puntoImg2 > puntoImg1);

    if (acerto) {
        contador++;
        document.getElementById("img2").classList.add("oscuro");
        setTimeout(() => {
            img1.src = img2.src;
            indiceImg1Actual = indiceImg2Actual;

            let nuevoIndice = obtenerIndiceRandomDistinto(indiceImg2Actual);
            img2.src = IMAGENES[nuevoIndice].src;
            indiceImg2Actual = nuevoIndice;

            document.getElementById("numero").innerHTML =
                `Numero: ${IMAGENES[indiceImg1Actual].punto}`;
            document.getElementById("puntoimg2").innerHTML = "";

            document.getElementById("img2").classList.remove("oscuro");
        }, 3000);
    } else {
        if (contador > record) {
            record = contador;
        }

        // document.getElementById("record").innerHTML =
        //     `Tu Record: ${record}`;

        document.getElementById("contador").innerHTML =
            `Totales Acertados: ${contador}`;

        contador = 0;

        let modal = new bootstrap.Modal(
            document.getElementById("modalFinal")
        );
        modal.show();
        empezarRandom();
    }
}

function empezarRandom() {
    let img1 = document.getElementById("img1");
    let img2 = document.getElementById("img2");

    let indice1 = Math.floor(Math.random() * IMAGENES.length);
    let indice2 = Math.floor(Math.random() * IMAGENES.length);

    if (indice1 != indice2) {
        img1.src = IMAGENES[indice1].src;
        img2.src = IMAGENES[indice2].src;
    }
    else {
        empezarRandom();
    }

    indiceImg1Actual = indice1;
    indiceImg2Actual = indice2;

    document.getElementById("numero").innerHTML =
        `Numero: ${IMAGENES[indiceImg1Actual].punto}`;
    document.getElementById("puntoimg2").innerHTML = "";
}

empezarRandom();