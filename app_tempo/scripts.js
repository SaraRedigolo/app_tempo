const key = "282da29d2adab14d0bcf0df911ad87de";

function colocarDadosNaTela(dados) {
    console.log(dados);  // Verifica a resposta no console
    if (dados.cod === 200) {  // Certifica-se de que a resposta é bem-sucedida
        document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
        document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
        document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
        document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
        document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    } else {
        alert("Cidade não encontrada! Verifique a digitação e tente novamente.");
    }
}

async function buscarCidade(cidade) {
    try {
        const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`)
            .then(resposta => resposta.json());
        colocarDadosNaTela(dados);
    } catch (error) {
        alert("Erro ao buscar os dados. Por favor, tente novamente.");
        console.error(error);
    }
}

document.querySelector(".botao-buscar").addEventListener("click", () => {
    const cidade = document.querySelector(".input-cidade").value.trim();
    if (cidade) {
        buscarCidade(cidade);
    } else {
        alert("Por favor, insira o nome de uma cidade.");
    }
});
