// EXPLICAÇÃO SOBRE JSON E LOCAL STORAGE

// let pessoa = {
//     nome: "Eduardo",
//     idade: 38
// }

// let stringPessoa = JSON.stringify(pessoa);

// console.log(pessoa);
// console.log(stringPessoa);

// localStorage.setItem("pessoa", pessoa);
// localStorage.setItem("stringPessoa", stringPessoa);


// console.log(JSON.parse(localStorage.getItem("stringPessoa")));
// localStorage.setItem("listaPessoas", 'teste');


// COMEÇO DO PROGRAMA
let listaPessoas; //undefined

if (localStorage.getItem("listaPessoas") == null) { //não tem dados
    listaPessoas = []; //inicializa com array vazio

} else { //não tem dados no localStorage
    //inicializa com os dados do storage
    listaPessoas = JSON.parse(localStorage.getItem("listaPessoas"));

}

exibeResultado(); //roda a função pra exibir os cadastros, caso existam

// funçao para calcular IMC
//recebe altura e pesoe retorna o cálculo
function calculaIMC(a, p) {
    return p / (a * a);
}

/*
    Resultado	        Situação
    Menor que 18.5      Magreza Severa
    Entre 18.5 e 24.99	Peso normal
    Entre 25 e 29.99	Acima do peso
    Entre 30 e 34.99	Obesidade I
    Entre 35 e 39.99	Obesidade II (severa)
    Acima de 40	        Cuidado!!! else
*/
function geraSituacao(imc) {

    if (imc < 18.5) {
        return 'Magreza Severa';
    } else if (imc >= 18.5 && imc <= 24.99) {
        return 'Peso normal';
    } else if (imc >= 25 && imc <= 29.99) {
        return "Acima do peso";
    } else if (imc >= 30 && imc <= 34.99) {
        return 'Obesidade I';
    } else if (imc >= 35 && imc <= 39.99) {
        return 'Obesidade II (severa)';
    } else { //a partir de 40
        return 'Cuidado!!!';
    }
}

function calcular() {

    //pegar os dados do formulário
    let nome = document.getElementById('nome').value;
    let altura = parseFloat(document.getElementById('altura').value);
    let peso = parseFloat(document.getElementById('peso').value);

    if (nome == "" || isNaN(altura) || isNaN(peso)) { //esqueceu campo sem preencher
        alert("Preencha todos os campos!");
    } else { //tudo preenchido

        //calcualar o imc
        let imc = calculaIMC(altura, peso);
        //gerar a situação, baseada no imc
        let situacao = geraSituacao(imc);


        //guardar o imc e a situação no objeto pessoa
        let pessoa = {};
        pessoa.nome = nome;
        pessoa.altura = altura;
        pessoa.peso = peso;
        pessoa.imc = imc;
        pessoa.situacao = situacao;

        //cadastra na lista de pessoas
        listaPessoas.push(pessoa);
        localStorage.setItem("listaPessoas", JSON.stringify(listaPessoas));
        //exibir a pessoa na tela
        exibeResultado();
    }

} //fim da função calcular

function exibeResultado() {
    let template = "";

    for (let i = 0; i < listaPessoas.length; i++) {
        template += `<tr>
                        <td>${listaPessoas[i].nome}</td>
                        <td>${listaPessoas[i].altura}</td>
                        <td>${listaPessoas[i].peso}</td>
                        <td>${listaPessoas[i].imc}</td>
                        <td>${listaPessoas[i].situacao}</td>
                    </tr>`;

    }


    //tbody da tabela
    document.getElementById('cadastro').innerHTML = template;
}