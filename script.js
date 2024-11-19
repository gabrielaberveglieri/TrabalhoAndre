
const header = document.querySelector('.header');
const boxProfile = document.querySelector('.boxprofile');
const profile = document.querySelector('.profile');
const contadorCart = document.querySelector('.cart-contador');
const btnAddCart = document.querySelectorAll('.btn-item-produto');
const cart = document.querySelector('.cart');
let contador = 0;
let produtosComMaiorAvaliacao = [];
const produtosMaiorAvaliacaoMap = new Map();
const btnsMap = new Map();
const nomesItens = document.querySelectorAll('.name-product');
const precosItens = document.querySelectorAll('.price-product');
const imagemItens = document.querySelectorAll('.img-item');
const itensCart = document.querySelector('.produtos-cart');
const precoCart = document.querySelector('.preco-subtotal');
const cartProdutos = document.querySelector('.cart-itens');
const subtotalProdutos = document.querySelector('.subtotal-cart');
const btnMobile = document.querySelector('.btn-mobile')
let itensNoCarrinho = [];
let nomesProdutos = ["Bolsa Azul", "Blusa preta e branca", "Jaqueta masculina", "Pulseira dragão", "Pulseira de cristal", "Cartao SSD", "Drive", "Jaqueta Feminina"];
let imageItem;
let precoItem= 0;
let linhHr;
let precoSubtotal = 0;
let cartAberto = false;



profile.addEventListener('click', () => {
    if(window.innerWidth >= 1320){
        boxProfile.classList.toggle("active");
    }
})

for (let index = 0; index < btnAddCart.length; index++) {
        btnAddCart[index].addEventListener("click", () => {
            contadorCart.classList.add("active");
            contador++;
            contadorCart.innerHTML = contador;
    }) 
}

class Produto{
    constructor(id, nome, preco, image, avaliacao){
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.image = image;
        this.avaliacao = avaliacao;
    }
}

const urlApi = "https://fakestoreapi.com/products";

fetch(urlApi)
            .then(response => response.json())
            .then(data => {

                const produtos = data.map(item => new Produto(item.id, item.title, item.price, item.image, item.rating.rate))
                associandoProdutos(produtos);

            })

            function associandoProdutos(produtos){
                    
                produtos.forEach((produto, index) => {
                    if(produto.avaliacao >= 3.5){
                        produtosMaiorAvaliacaoMap.set(`Produto${index + 1}`, produto)    
                    }
                });

                const valoresProdutos  = Array.from(produtosMaiorAvaliacaoMap.values());
                

                btnAddCart.forEach((btn, index) => {
                    btnsMap.set("Botao" + (index + 1) + btn , valoresProdutos[index])      
                })

                console.log(btnsMap)

                nomesItens.forEach((nomes, index) => {
                    nomes.innerHTML = nomesProdutos[index];
                })

                precosItens.forEach((precos, index) => {
                    precos.innerHTML = "R$ " +  valoresProdutos[index].preco;
                })

                imagemItens.forEach((imagens, index) => {
                    imagens.src = valoresProdutos[index].image;
                })

            
                btnAddCart.forEach((btn, index) => {
                    btn.addEventListener("click", () => {                        
                        precoSubtotal += btnsMap.get("Botao" + (index + 1) + btn).preco;
                        precoCart.innerHTML = "R$ " + precoSubtotal.toFixed(2);

                        if(itensNoCarrinho.includes(btnsMap.get("Botao" + (index + 1) + btn))){
                            precoSubtotal += btnsMap.get("Botao" + (index + 1) + btn).preco;

                        } else {
                        itensNoCarrinho.push(btnsMap.get("Botao" + (index + 1) + btn));
                        imageItem = document.createElement('img');
                        quantidadeItem = document.createElement('p');
                        precoItem = document.createElement('p');
                        linhHr = document.createElement('hr');  
                        if(itensNoCarrinho.length > 1){
                            itensCart.prepend(linhHr);
                        }
                        itensCart.prepend(precoItem);
                        itensCart.prepend(imageItem);
                        itensCart.prepend(quantidadeItem);
                        imageItem.classList.add('img'); 
                        linhHr.classList.add('hr');

                        imageItem.src = btnsMap.get("Botao" + (index + 1) + btn).image;
                        precoItem.innerHTML = "R$ " + btnsMap.get("Botao" + (index + 1) + btn).preco;
                        mapProdutoPreco.set("Botao" + (index + 1) + btn, (precoItem.innerHTML = "R$ " + btnsMap.get("Botao" + (index + 1) + btn).preco));
                        }
                        itensCart.scrollTop = 0;
                    }) 
                })

                cart.addEventListener("click", () => {
                    if(itensNoCarrinho.length >= 1 && window.innerWidth > 1320){
                        cartProdutos.classList.toggle('active');
                        subtotalProdutos.classList.toggle('active');
                    } else if(itensNoCarrinho.length >= 1 && window.innerWidth < 1320){
                        cartProdutos.classList.toggle('activemobile');
                        subtotalProdutos.classList.toggle('activemobile');
                        itensCart.classList.toggle('activemobile');
                    }
                })

                btnMobile.addEventListener("click", () => {
                    btnMobile.classList.toggle('activemobile');
                    header.classList.toggle('activemobile');
                })
            }