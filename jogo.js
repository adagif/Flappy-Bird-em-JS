const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas'); //Usando o canvas para desenhar usando linguagem de script.
const contexto = canvas.getContext('2d'); //Informando que se trata de um jogo em 2D.

//plano de fundo
const planoDeFundo = {
	spriteX:390,
	spriteY:0,            //Adicionado estrutura do plano de acordo com o sprite :)
	largura: 275,
	altura: 204,
	x:0,
	y: canvas.height - 204,

	
	desenho(){
		contexto.fillStyle = '#70c5ce'; //cor do fundo
		contexto.fillRect(0,0,canvas.width,canvas.height)
		
		contexto.drawImage(
			sprites,
			planoDeFundo.spriteX,planoDeFundo.spriteY,
			planoDeFundo.largura,planoDeFundo.altura,    //Estruturando o plano de fundo de acordo com o tamanho dado
			planoDeFundo.x,planoDeFundo.y,
			planoDeFundo.largura,planoDeFundo.altura
		);
		contexto.drawImage(
			sprites,
			planoDeFundo.spriteX,planoDeFundo.spriteY,
			planoDeFundo.largura,planoDeFundo.altura,        //Complementando o resto que faltou do plano de fundo
			(planoDeFundo.x+planoDeFundo.largura),planoDeFundo.y,
			planoDeFundo.largura,planoDeFundo.altura
		);

	}

	}

//Chão
  const chao = {
	spriteX:0,
	spriteY:610,
	largura:224,
	altura:112,
	x:0,
	y:canvas.height - 112 ,
	
	desenho(){
	contexto.drawImage(
		sprites, 
		chao.spriteX,chao.spriteY,//sprite x, sprite y
		chao.largura,chao.altura, //tamanho do recorte no sprite
		chao.x,chao.y,
		chao.largura,chao.altura,
	);

	contexto.drawImage(
		sprites,
		chao.spriteX,chao.spriteY,
		chao.largura,chao.altura,
		(chao.x + chao.largura),chao.y,
		chao.largura,chao.altura
	);
  },
};
	function fazColisao(flappyBird,chao){
		const flappyBirdY = flappyBird.y+ flappyBird.altura;
		const chaoY = chao.y;

		if(flappyBird.y>=chaoY){
			return true;
		}
		return false;
	}

	function criarFlappyBird(){

	const flappyBird = {
	spriteX:0,
	spriteY:0,
	largura:33,
	altura:24,
	x:10,
	y:50,
	pulo: 4.6,
	pula(){
		console.log('devo pular')
		console.log('antes',flappyBird.velocidade);
		flappyBird.velocidade = -flappyBird.pulo;
		console.log('depois',flappyBird.velocidade);
		
	},

	gravidade: 0.25,
	velocidade: 0,
	atualiza(){
		if(fazColisao(flappyBird,chao)){
			console.log ("Fez colisao");
			mudaParaTela(Telas.INICIO);
			return;
		}
		

		flappyBird.velocidade = flappyBird.velocidade+ flappyBird.gravidade
		flappyBird.y = flappyBird.y + flappyBird.velocidade ;
	
	},
	desenho(){
	contexto.drawImage(
		sprites, 
		flappyBird.spriteX,flappyBird.spriteY,//sprite x, sprite y
		flappyBird.largura,flappyBird.altura, //tamanho do recorte no sprite
		flappyBird.x,flappyBird.y,
		flappyBird.largura,flappyBird.altura,
	);
	}


	}
	return flappyBird;
}

//[mensagemGetReady]

const mensagemGetReady = {
	sX: 134,
	sY:0,
	w: 174,
	h:152,
	x:(canvas.width/2) - 174/2,
	y:50,
	desenho(){
		contexto.drawImage(
			sprites,
			mensagemGetReady.sX,mensagemGetReady.sY,
			mensagemGetReady.w,mensagemGetReady.h,
			mensagemGetReady.x,mensagemGetReady.y,
			mensagemGetReady.w,mensagemGetReady.h
		);
	}
}

//
//Telas
//
const globais = {};
let telaAtiva = { //let permite que se declare variaveis  limitando seu escopo no bloco

}
function mudaParaTela(novaTela){ 
	telaAtiva = novaTela;
	if (telaAtiva.inicializa){
		inicializa();
	}
}

//caguei o jogo em algum momento que nao sei qual foi, mas foi logo apos a colocação de globais, 
//onde eu fiz uma função para criar o flappybird possivelmente o erro esteja aqui e seja uma bobagem,
// se vira eu do futuro bjs<3  10:18

const Telas = {
	INICIO:{
		inicializa(){
			globais.flappyBird = criarFlappyBird();
		},
		desenho(){
			planoDeFundo.desenho(); // construindo a tela de inicio
	        chao.desenho();
        	globais.flappyBird.desenho();
			mensagemGetReady.desenho();
			},

			click(){
				mudaParaTela(Telas.JOGO); // ao clicar na tela de inicio ela ira mudar para a tela do jogo
			},

		atualiza(){

		}
	}
};

Telas.JOGO = {
	desenho(){
	planoDeFundo.desenho();
	chao.desenho();				//telas do jogo propriamente dito
	globais.flappyBird.desenho();
	  
	},

	click(){
		globais.flappyBird.pula();

		
	},

	atualiza(){
		globais.flappyBird.atualiza();  
	}

}

function loop(){
	telaAtiva.desenho();
	telaAtiva.atualiza();

requestAnimationFrame(loop);
}


window.addEventListener('click',function(){     //click da tela
if(telaAtiva.click){
	telaAtiva.click();

}



});

mudaParaTela(Telas.INICIO);
loop();