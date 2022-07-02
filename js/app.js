//http://127.0.0.1:5500/index.html?moneda=&criptomoneda=
const criptomonedaSelect = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const monedaSelect = document.querySelector('#moneda');
const resultado = document.querySelector('#resultado');

const obj = {
    moneda: '',
    criptomoneda: ''
}

document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomoneda();

    formulario.addEventListener('submit', submitForm);

    criptomonedaSelect.addEventListener('change', leerValor)
    monedaSelect.addEventListener('change', leerValor)
})


const consultarCriptomoneda = async () => {
    const url = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';

    try {
        const respuesta = await fetch(url) ;
        const resultado = await respuesta.json();
        const resCriptomoneda = llenarSelect(resultado.Data);
    } catch (error) {
        console.log(error);
    }
}

// llena select y toma un array
const llenarSelect = (criptomonedas) => {
    criptomonedas.forEach(criptomoneda => {

        let criptoArray = [];
        //console.log(criptomoneda)

        const {Name,FullName} = criptomoneda.CoinInfo
        const {PRICE, FROMSYMBOL} = criptomoneda.RAW.USD;
        

        //0,8900>PRICE && PRICE>1 ? console.log(PRICE) : console.log('no')
        if(0,900 > PRICE && PRICE < 2 ) {
            criptoArray.push(PRICE, FROMSYMBOL);    
            //console.log(criptoArray[1]);

            const option = document.createElement('option');
            option.textContent = criptoArray[1];
            criptomonedaSelect.appendChild(option);
        }
        
    });
}
//TODO: leer form, leer los datos y luego enviarlos para mostrar en pantalla

const leerValor = (e) => {
  obj[e.target.name] = e.target.value;
}

const submitForm = (e) => {
  e.preventDefault()
  consultarApi()
}

const consultarApi = async () => {
  const {moneda, criptomoneda} = obj; 

  const armarUrl = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`


  try {
    const respuesta = await fetch(armarUrl) ;
    const resultado = await respuesta.json();
    const criptInfo = cotizarValores(resultado.DISPLAY[criptomoneda][moneda])
  } catch (error) {
    console.log(error);
  }

}

const cotizarValores = (cotizacion) => {

  const {CHANGE24HOUR, CHANGEHOUR, CHANGEDAY, PRICE} = cotizacion

  }


