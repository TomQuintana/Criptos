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


try {
  const respuesta = await fetch(url) ;
  const resultado = await respuesta.json();
  const resCriptomoneda = llenarSelect(resultado.Data);
} catch (error) {
  console.log(error);
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

const leerValor = (e) => {
  obj[e.target.name] = e.target.value;
}

const submitForm = (e) => {
  e.preventDefault();

  // Validar
  const {moneda, criptomoneda} = obj;
  if(moneda === '' || criptomoneda === ''){
    validarForm('Hay campos vacios')
  } 

  consultarApi();
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

  limpiarHtml();

  let lowSigno = '';
  let highSigno = '';
  let changeSigno = '';
  let priceSigno = '';
  let openSigno = '';

  const {LOWDAY, HIGHDAY, CHANGEHOUR, PRICE, OPENDAY} = cotizacion;


  if('ARS' === PRICE.split(' ')[0] || 'ARS' === LOWDAY.split(' ')[0] || 'ARS' === HIGHDAY.split(' ')[0] || 'ARS' === CHANGEHOUR.split(' ')[0] || 'ARS' === OPENDAY.split(' ')[0]) {

    lowSigno = `$ ${LOWDAY.split(' ')[1]}`;
    highSigno = `$ ${HIGHDAY.split(' ')[1]}`;
    changeSigno = `$ ${CHANGEHOUR.split(' ')[1]}`;
    priceSigno = `$ ${PRICE.split(' ')[1]}`;
    openSigno = `$ ${OPENDAY.split(' ')[1]}`;

  } else {

    lowSigno = LOWDAY;
    highSigno = HIGHDAY;
    changeSigno = CHANGEHOUR;
    priceSigno = PRICE;
    openSigno = OPENDAY;

  }

  const price = document.createElement('h1');
  price.innerHTML = `La cotizacion del actual es  <span>${priceSigno}</span>`;

  const open = document.createElement('h3');
  open.innerHTML = `La cotizacion al principio dia es <span>${openSigno}</span>`;

  const change = document.createElement('p');
  change.innerHTML = `Cambio por hora : <span>${changeSigno}</span>`;

  const high = document.createElement('p');
  high.innerHTML = `Cotizacion mas alta del dia  <span>${highSigno}</span>`;

  const low = document.createElement('p');
  low.innerHTML = `Cotizacion mas baja del dia  <span>${lowSigno}</span>`;


  resultado.appendChild(price);
  resultado.appendChild(open);
  resultado.appendChild(change);
  resultado.appendChild(high);
  resultado.appendChild(low);


}

const limpiarHtml = () => {
  while(resultado.firstChild) {
    resultado.removeChild(resultado.firstChild)
  }
}

const validarForm = (mensaje) => {

  const existeError = document.querySelector('.error');

  if (!existeError) {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('error');

    // Mensaje de error
    divMensaje.textContent = mensaje;

        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}
