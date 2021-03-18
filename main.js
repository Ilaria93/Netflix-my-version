$(document).ready(function () {
    var film_tmdb = 'https://api.themoviedb.org/3/search/movie'
    var api_key = '1c1263bf902928bcba1cf9fb01d4296c'
    var img_poster_tmdb ='https://image.tmdb.org/t/p/w185'
    var html_template =$('#film-template').html();
    var template = Handlebars.compile(html_template);
    var serie_tmdb = 'https://api.themoviedb.org/3/search/tv'

    //attivo l'input di ricerca
    $('.first').click(function(){
        $('.first').addClass('hide');
        $('.second').removeClass('hide').addClass('on-click');
    });
    //chiudo l'input di ricerca
    $('.fas.fa-times').click(function(){
        $('.second').removeClass('on-click').addClass('hide');
        $('.first').removeClass('hide');
    });

    //funzione invio per far partire la chiamata ajax
    $('#search').keyup(function(event){
        if (event.which ==13){
            search_movie();        }
    })

    function reset(){
    //svuoto l'input testuale
    $('#search').val('');
    //svuoto il contenitore dei risultati
    $('#film-find').empty();
    //nascondo il titolo
    $('.title-search').removeClass('visible');
    }

    //funzione apperndere una card ai risultati
    function insertCard(dati, tipologia){
        if(tipologia == 'Movie'){
            var titolo_card = dati.title;
            var titolo_originale_card = dati.original_title;
        }else {
            var titolo_card = dati.name;
            var titolo_originale_card = dati.original_name;
        }
        //preparo i dati per il template
        var placeholder = {
            'titolo': titolo_card,
            'titolo_originale':titolo_originale_card,
            'lingua':dati.original_language,
            'voto': dati.vote_average,
            'stelle': voteIntoStar(dati),
            'tipo':tipologia,
            'imgPoster': img_poster_tmdb + dati.poster_path,
        };
        var set = template(placeholder);
        //appendo la card con i dati del risultati corrente
        $('#film-find').append(set);
    }
    //transformare il voto da decimale a intero da 1 a 5 e convertirlo in stelle
    function voteIntoStar(dati){
        var voteFilm = Math.round(dati.vote_average / 2);
        var stars ="";
        for (var i = 1; i < 6; i++) {
            //devo aggiungere una stella piena o una vuota ?
            if (i <= voteFilm) {
                stars += '<i class="fas fa-star"></i>';
            }else{
                //stella vuota
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }
    //chiamata ajax film
    function search_movie(){
        var searchResult = $('#search').val().trim().toLowerCase();
        //controllo che l'utente abbia digitato qualcosa
        if (searchResult.length > 1){
            reset();
            //faccio partire le chiamate ajax per cercare i film
            $.ajax({
                'url':film_tmdb,
                'method':'GET',
                'data':{
                    'api_key':api_key,
                    'query':searchResult,
                    'language':'it'
                },
                'success': function(risposta) {
                    //inserisco il testo cercato dall'utente nel titolo
                    $('#titleFind').text(searchResult);
                    //visualizzo il titolo della pagina
                    $('.title-search').addClass('visible');
                    risposta_ajax(risposta, 'Movie');
                },
                 'error': function() {
                    console.log("Errore nel caricamento della pagina");
                }
            });
            //faccio partire le chiamate ajax per cercare le serie tv
            $.ajax({
                'url':serie_tmdb,
                'method':'GET',
                'data':{
                    'api_key':api_key,
                    'query':searchResult,
                    'language':'it'
                },
                'success': function(risposta) {
                    //inserisco il testo cercato dall'utente nel titolo
                    $('#titleFind').text(searchResult);
                    //visualizzo il titolo della pagina
                    $('.title-search').addClass('visible');
                    risposta_ajax(risposta, 'Serie');
                },
                 'error': function() {
                    console.log("Errore nel caricamento della pagina");
                }
            });
        } else{
            alert('devi digiatare almeno due caratteri')
        }
    }
    //funzione che gestisce risposta dell'ajax
    function risposta_ajax(risposta_api, tipologia){
        var risultati = risposta_api.results;
        for (var i = 0; i < risultati.length; i++) {
            var risultatoCorrente = risultati[i];
            insertCard(risultatoCorrente, tipologia);
        };
    }
<<<<<<< HEAD
    //attivo carosello
    $('.carousel').carousel();
=======
>>>>>>> main
});
