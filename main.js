let target_id = 0;

    $(document).ready(function(){
        console.log("시작!")

    })

    $.ajax({
        url:"https://api.themoviedb.org/3/movie/popular?api_key=a595769a9681f20d1d1cb32e4cf645f1&language=en-US&page=1",
        data:{"key":"value"},
        type:"POST",
        success:function(json){
            console.log(json)
            $("#movie-list").html('');
            let movie_list = json.results;

            for(let i=0; i<movie_list.length; i++){
                let card = `
                    <div class="col mb-4">
                        <div class="card">
                            <img src="${'https://image.tmdb.org/t/p/w500/'+movie_list[i].poster_path}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${movie_list[i].original_title}</h5>
                                <button type="button" class="btn btn-success" id="review-btn" onclick="review(${movie_list[i].id})">리뷰 보기</button>
                            </div>
                        </div>
                    </div>
                </div>`

                $("#movie-list").append(card);
            }
        },
        error:function(err){

        }
    })

        function review(id) {
            target_id = id;
            $.ajax({
                url:`http://universeapi.net/review/list?movie_id=${id}`,
                data:{},
                type:"GET",
                success:function(json){
                    console.log(json.data)
                    let reviews = json.data;
                    $(".modal-body").html('')
                    for(let i=0; i<reviews.length; i++){
                        $(".modal-body").append(`<p>${reviews[i].review}</p>`)
                    }
                }
            })

            $('#review-modal').modal('show');
        }

        function addReview(){
            let review = $("#review").val();
            let review_html = `<p>${review}</p>`

            $.ajax({
                url:`http://universeapi.net/review/add"`,
                data:{
                    movie_id:target_id, //전협변수 지엽변수
                    review:review
                },
                type:"POST",
                success:function(json){
                    console.log(json);
                }
            })

            $(".modal-body").append(review_html);
            $("#review").val('');
        }