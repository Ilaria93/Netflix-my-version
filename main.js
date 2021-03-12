$(document).ready(function () {

    var film_tmdb = 'https://api.themoviedb.org/3/search/movie'
    var api_key = '1c1263bf902928bcba1cf9fb01d4296c'
    var ricerca =  'batman' //search()
    var html_template =$('#film-template').html();
    var template = Handlebars.compile(html_template);

    $('.searchInput ').click(function(){

        $.ajax({
            'url':film_tmdb,
            'method':'GET',
            'data':{
                'api_key':api_key,
                'query':ricerca,
                'language':'it'
            },
            'success': function(risposta) {
                var filmTrovati = risposta.results;
                for (var i = 0; i < filmTrovati.length; i++) {
                    var filmCorrente = {
                        'titolo': filmTrovati[i].title,
                        'titolo originale':filmTrovati[i].original_title,
                        'lingua':filmTrovati[i].original_language,
                        'voto':filmTrovati[i].vote_average,
                    };
                    var set = template(filmCorrente);
    				$('#film-find').append(set);
                };
            },
             'error': function() {
    			console.log("Errore nel caricamento della pagina");

    		}
        });
    });

    $('.searchInput').keyup(function(event){
        if (event.which ==13){
            search();
        }
    })
    //funzione ricerca film per parola chiave
    function search(){
        $('.searchInput').keyup(function(){
            var searchFilm = $('.searchInput').val().trim().toLowerCase();
            //svuoto il contenitore dei risultati
            $('#film-find').empty();
            //svuoto l'nput testuale
            $('.searchInput').val('');

        })
    }
});
