$(document).ready(function () {
    var serie_tmdb = 'https://api.themoviedb.org/3/search/tv'
    var film_tmdb = 'https://api.themoviedb.org/3/search/movie'
    var api_key = '1c1263bf902928bcba1cf9fb01d4296c'
    var html_template =$('#film-template').html();
    var template = Handlebars.compile(html_template);

    //attivo l'input di ricerca
    $('.first').click(function(){
        $('.first').addClass('active');
        $('.second').removeClass('active').addClass('on-click');
    });
    //chiudo l'input di ricerca
    $('.fas.fa-times').click(function(){
        $('.second').removeClass('on-click').addClass('active');
        $('.first').removeClass('active');
    });

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
    function insertCard(dati){
        var placeholder = {
            'titolo': dati.title,
            'titolo_originale':dati.original_title,
            'lingua':dati.original_language,
            'voto':dati.vote_average,
            'stelle': voteIntoStar(dati)
        };
        var set = template(placeholder);
        $('#film-find').append(set);
    }
    //transformare il voto da decimale a intero da 1 a 5 e convertirlo in stelle
    function voteIntoStar(dati){
        var voteFilm = Math.round(dati.vote_average / 2);
        var stars ="";
        for (var i =0; i < voteFilm; i++)
            stars = stars + '<i class="fas fa-star"></i>';
        return stars;
    }
    //chiamata ajax film
    function search_movie(){
        var searchMovie = $('#search').val().trim().toLowerCase();
        //controllo che l'utente abbia digitato qualcosa
        if (searchMovie.length > 1){
            reset();
            //faccio partire le chiamate ajax
            $.ajax({
                'url':film_tmdb,
                'method':'GET',
                'data':{
                    'api_key':api_key,
                    'query':searchMovie,
                    'language':'it'
                },
                'success': function(risposta) {
                    //inserisco il testo cercato dall'utente nel titolo
                    $('#titleFind').text(searchMovie);
                    //visualizzo il titolo della pagina
                    $('.title-search').addClass('visible');

                    var filmTrovati = risposta.results;
                    for (var i = 0; i < filmTrovati.length; i++) {
                        var filmCorrente = filmTrovati[i];
                        insertCard(filmCorrente);
                    };
                },
                 'error': function() {
                    console.log("Errore nel caricamento della pagina");
                }
            });
        } else{
            alert('devi digiatare almeno due caratteri')
        }
    }
});
