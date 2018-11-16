// pcm 20172018a Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;


// Classe BlackJack - construtor
class BlackJack {
    constructor() {
        // array com as cartas do dealer
        this.dealer_cards = [];
        // array com as cartas do player
        this.player_cards = [];
        // variável booleana que indica a vez do dealer jogar até ao fim
        this.dealerTurn = false;

        // objeto na forma literal com o estado do jogo
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false
        };

        let naipes = ["C","D","H","S"];


        //métodos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)
        this.new_deck = function () {
            const suits = 4;
            const cards_per_suit = 13;
            let deck = [];

            for (let i = 0; i < suits * cards_per_suit; i++) {
                deck[i] = (i % cards_per_suit) + 1;
                for(let n = 0; n < 4; n++){
                    for(let m = 1; m <= 13; m++){
                        deck.push(m + "_" + naipes[n]);
                    }
                }
            }
            return deck;
        };

        this.shuffle = function (deck) {
            let indexes = []; // array de  indices
            let shuffled = []; // baralho de cartar baralhado.
            let index = null; // indice atual para onde ir a carta

            for (let i = 0; i < deck.length; i++) {// adicionar os indices a um array de indices
                indexes.push(i); //criar o array com todas as fotos
            }

            for (let i = 0; i < deck.length; i++) { //
                index = Math.floor(Math.random() * indexes.length); //indice atual para onde vai a carta
                shuffled.push(deck[indexes[index]]);//adicionar ao array shuffled a carta baralhada
                indexes.splice(index, 1);// retirar da lista de indices o indice utilizado
            }

            return shuffled;
        };
        // baralho de cartas baralhado
        this.deck = this.shuffle(this.new_deck());
    }

    // métodos
    // devolve as cartas do dealer num novo array (splice)
    get_dealer_cards() {
        return this.dealer_cards.slice();
    }

    // devolve as cartas do player num novo array (splice)
    get_player_cards() {
        return this.player_cards.slice();
    }

    // Ativa a variável booleana "dealerTurn"
    setDealerTurn(val) {
        this.dealerTurn = true;
    }

    //MÉTODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS

    get_cards_value(cards) {
        let baralho = [];
        for (let n = 0; n < cards.length; n++) {
            var carta = parseInt(cards[n].split("_")[0]);
            baralho.push(carta);
        }
        let noAces = baralho.filter(function (card) {
            return card != 1;
        });
        let figtrans = noAces.map(function (c) {
            return c > 10 ? 10 : c;
        });
        let sum = figtrans.reduce(function (sum, value) {
            return sum += value;
        }, 0); //0 é o valor inicial de sum
        let numAces = baralho.length - noAces.length;
        while (numAces > 0) {
            if (sum + 11 + (numAces - 1) > MAX_POINTS) {
                return sum + numAces;
            }
            sum += 11;
            numAces = 0;
        }
        return sum + numAces;
    }

    dealer_move() {
        let card = this.deck[0];
        this.deck.splice(0, 1);//um elemento a partir do 0;
        this.dealer_cards.push(card);
        return this.get_game_state();
    }

    player_move() {
        let card = this.deck[0];
        this.deck.splice(0, 1);//um elemento a partir do 0;
        this.player_cards.push(card);
        return this.get_game_state();
    }

    get_game_state() {

        let playerpoints = this.get_cards_value(this.player_cards);
        let dealerpoints = this.get_cards_value(this.dealer_cards);
        let playerBusted = playerpoints > MAX_POINTS;
        let playerWon = playerpoints === MAX_POINTS;
        let dealerBusted = this.dealerTurn && (dealerpoints > MAX_POINTS);
        let dealerWon = (this.dealerTurn && (dealerpoints > playerpoints) && !dealerBusted) || dealerpoints === MAX_POINTS;

        this.state.gameEnded = playerBusted||playerWon||dealerBusted||dealerWon;
        this.state.dealerWon = dealerWon;
        this.state.playerBusted = playerBusted;
    }

}

