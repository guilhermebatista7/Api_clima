const apiKey = '9329a8d70d670f2a52e8e472692614f4';

/* Captura a localização atual */
window.addEventListener('load', ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }

    else{
        alert('Navegador não suporta geolocalização');
    }

    function showPosition(position){
        console.log(position);
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        coordResult(lat, long);
    }
})

function coordResult(lat, long){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`) 
        .then(response =>{
            if (!response.ok){
                throw new Error(`http erro: status ${response.status}`)
            }
            return response.json()
    })
    .catch(error =>{
        alert(error.message)
    })
    .then(response =>{
        mostrarResults(response)
    })
}

function mostrarResults(res){
    let dados = document.getElementById('dados').style.display='flex';

    console.log(res)

    let tempcelsius = document.getElementById('tempCelsius').innerHTML = (res.main.temp).toFixed(0);
    
    let velVento = document.getElementById('velocVento').innerHTML = (res.wind.speed * 3.6).toFixed(1) + ' km/h ';

    let sensTermica = document.getElementById('tempSens').innerHTML = (res.main.feels_like).toFixed(1) + ' ºC';

    let umidade = document.getElementById('umidade').innerHTML = res.main.humidity + ' %';

    let fotoClima = res.weather[0].main
    mostrarImagemClima(fotoClima);
    
}

function mostrarImagemClima(info) {
    const imagensClima = {
        'Clear': "https://img.icons8.com/fluency/100/clean.png",

        'Few clouds': "https://img.icons8.com/external-goofy-color-kerismaker/100/external-Cloud-Sun-weather-goofy-color-kerismaker.png",

        'Clouds':"https://img.icons8.com/plasticine/100/cloud.png",

        'Scattered clouds': "https://img.icons8.com/plasticine/100/cloud.png",

        'Broken clouds': "https://img.icons8.com/plasticine/100/cloud.png",

        'Shower rain': "https://img.icons8.com/arcade/100/rain.png",

        'Drizzle': "https://img.icons8.com/arcade/100/rain.png",

        'Rain': "https://img.icons8.com/arcade/100/rain.png",

        'Thunderstorm': "https://img.icons8.com/fluency/100/storm-with-heavy-rain.png",

        'Snow': "https://img.icons8.com/fluency/100/snowflake.png",

        'Mist': "https://img.icons8.com/plasticine/100/foggy-night-1.png"
    };

    let imagemContainer = document.getElementById('imagemClima');

    
    // Limpa o conteúdo anterior (se houver)
    imagemContainer.innerHTML = '';

    if (imagensClima[info]) {
        // Cria o elemento <img> dinamicamente
        let img = document.createElement('img');
        img.src = imagensClima[info];
        img.width = 140;
        img.height = 140;
        img.alt = info;

        // Adiciona a imagem ao contêiner
        imagemContainer.appendChild(img);
    } else {
        imagemContainer.innerHTML = 'Imagem não disponível';
    }
}
function encontrarCidade(){
    let cidade = document.getElementById('local').value;
    capturaDados(cidade);
}

const capturaDados = async(cidade) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}`)
        .then(response =>{
            if (!response.ok){
                if(response.status === 404){
                    throw new Error('Cidade não encontrada!');
                } else {
                    throw new Error(`http erro: status ${response.status}`)
            }   
        }
        return response.json()
        })
    .catch(error =>{
        alert(error.message)
    })
    .then(response =>{
        mostrarResults(response)
    })
}


 
