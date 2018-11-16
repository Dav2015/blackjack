// pcm 20172018a Blackjack oop

let game = null;
let dealer = null;

function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function buttons_initialization(){
    document.getElementById("card").disabled     = false;
    document.getElementById("stand").disabled     = false;
    document.getElementById("new_game").disabled = true;
}

function finalize_buttons(){
    document.getElementById("card").disabled     = true;
    document.getElementById("stand").disabled     = true;
    document.getElementById("new_game").disabled = false;
}


//FUNÇÕES QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
function new_game(){

    jogo = new BlackJack();

    while(document.getElementById("dealer").firstChild){
        document.getElementById("dealer").removeChild(document.getElementById("dealer").firstChild);
    }

    while(document.getElementById("player").firstChild){
        document.getElementById("player").removeChild(document.getElementById("player").firstChild);
    }

    dealer_new_card();
    dealer_new_card();

    player_new_card();

    buttons_initialization();


    document.getElementById("dealer1").innerHTML = "";
    document.getElementById("player1").innerHTML = "";


}

function update_dealer(state) {
    let deala = jogo.get_dealer_cards();
    console.log(deala);
    for (let i = 0; i < deala.length; i++){

        if (deala.length === 2){
            deala[1] = "X";
        }

        var image = document.createElement("img");
        image.setAttribute("src","imgs/" + deala[i] + ".png");
        image.setAttribute("height","150px");
        image.setAttribute("width","100px");
        if (document.getElementById("dealer").childElementCount <= i){
            document.getElementById("dealer").appendChild(image);
        }
    }
    if (jogo.state.gameEnded) {
        if(jogo.state.dealerWon){
            document.getElementById("dealer1").innerHTML = "Dealer won!";
            finalize_buttons();
        }
        else{
            document.getElementById("player1").innerHTML = "Player won!";
            finalize_buttons();
        }
    }
}

function update_player(state){
    let playa = jogo.get_player_cards();
    for (let i = 0; i < playa.length; i++){
        let image = document.createElement("img");
        image.setAttribute("src","imgs/" + playa[i] + ".png");
        image.setAttribute("height","150px");
        image.setAttribute("width","100px");
        if (document.getElementById("player").childElementCount <= i){
            document.getElementById("player").appendChild(image);
        }
    }

    if (jogo.state.gameEnded) {
        if (jogo.state.playerBusted){
            document.getElementById("dealer1").innerHTML = "Dealer won!";
            for(var i = 0; i < jogo.get_dealer_cards().length; i++){
                var image = document.createElement("img");
                image.setAttribute("src", "imgs/" + jogo.get_dealer_cards()[i] + ".png");
                image.setAttribute("height", "150");
                image.setAttribute("width", "100");
                if(i <= document.getElementById("dealer").childElementCount)
                    document.getElementById("dealer").replaceChild(image, document.getElementById("dealer").lastChild);
                else if(i >  document.getElementById("dealer").childElementCount) {
                    document.getElementById("dealer").appendChild(image);
                }
            }
            finalize_buttons();

        }
        else{
            document.getElementById("player1").innerHTML = "Player won!";

            for(var i = 0; i < jogo.get_dealer_cards().length; i++){
                var image = document.createElement("img");
                image.setAttribute("src", "imgs/" + jogo.get_dealer_cards()[i] + ".png");
                image.setAttribute("height", "150");
                image.setAttribute("width", "100");

                if(i <= document.getElementById("dealer").childElementCount)
                    document.getElementById("dealer").replaceChild(image, document.getElementById("dealer").lastChild);

                else if(i >  document.getElementById("dealer").childElementCount) {
                    document.getElementById("dealer").appendChild(image);
                }
            }

            finalize_buttons();
        }

    }


}

function dealer_new_card(){

    let state = jogo.dealer_move();

    update_dealer(state);

    return state;

}

function player_new_card(){

    let state = jogo.player_move();

    update_player(state);

    return state;


}

function dealer_finish() {

    jogo.setDealerTurn(true);
    jogo.get_game_state();


    let deala = jogo.get_dealer_cards();

    //???????????????????????????????????
    //deala[1] = dealer;

    while (!jogo.state.gameEnded) {
        dealer_new_card();
        jogo.get_game_state();
    }

    update_dealer();

    for(var i = 0; i < jogo.get_dealer_cards().length; i++) {

        let image = document.createElement("img");
        image.setAttribute("src", "imgs/" + jogo.get_dealer_cards()[i] + ".png");
        image.setAttribute("height", "150");
        image.setAttribute("width", "100");


        if (i <= document.getElementById("dealer").childElementCount){
            document.getElementById("dealer").removeChild(document.getElementById("dealer").childNodes[1]);
            document.getElementById("dealer").appendChild(image);
        }
        else if(i >  document.getElementById("dealer").childElementCount) {
            document.getElementById("dealer").appendChild(image);
        }
    }

    console.log(document.getElementById("dealer").childNodes);

}
