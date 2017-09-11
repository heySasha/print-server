/*jquery DOM functions*/

$(function(){
	var pictureUrls = ['img/cover/1.jpg',
                       'img/cover/2.jpg',
                       'img/cover/3.jpg',
                       'img/cover/4.jpg',
                       'img/cover/5.jpg',
                       'img/cover/6.jpg',
                       'img/cover/7.jpg',
                       'img/cover/8.jpg'
                      ];
    var i = 1;
    var random = Math.floor(Math.random()*pictureUrls.length);
    
    //start picture is displayed randomly
    $('.header').css({
    	'background':'url('+pictureUrls[random]+')',
        'background-size':'cover'
    })

	
    function headerChange(){
        if(i > (pictureUrls.length-1)){
			$('.header').animate({'background-position':'-1300px'},100,function(){
				i=1;
				$('.header').css({
                    'background':'url('+pictureUrls[0]+')',
                    'background-size':'cover'
                });
			});
			$('.header').animate({'background-position':'0'},100);
		}else{
			$('.header').animate({'background-position':'-1300px'},100,function(){
				$('.header').css({'background':'url('+pictureUrls[i]+')', 'background-size':'cover'});
				i++;
			});
			$('.header').animate({'background-position':'0'},100);
		}
    }
    var intervalCsaHead = setInterval(headerChange,3000);



    $(".js-edit").on('click', function(e){
      console.log('click');
      e.preventDefault();
      $(this).parents().next('form.js-admin-form').toggleClass('none');
    })

    $(".js-admin-form").on('submit', function(e){
        e.preventDefault();
        $(this).toggleClass('none');
    })

    //counter page
    let DOM = {
      counterButton: $(this).find('input.js-counter'),
      counterEditionButton: $(this).find('input.js-counter-edition')
    };

    $('.js-cout-decr2').on('click', function(e){
      DOM.counterButton.val(parseInt(DOM.counterButton.val(),10)-2); //parse to int input value
    })
    $('.js-cout-decr10').on('click', function(e){
      DOM.counterButton.val(parseInt(DOM.counterButton.val(),10)-10);
    })
    $('.js-cout-incr2').on('click', function(e){
      DOM.counterButton.val(parseInt(DOM.counterButton.val(),10)+2);
    })
    $('.js-cout-incr10').on('click', function(e){
      DOM.counterButton.val(parseInt(DOM.counterButton.val(),10)+10);
    })

    $('.js-edition-incr').on('click', function(e){
      DOM.counterEditionButton.val(parseInt(DOM.counterEditionButton.val(),10)+10);
    })
    $('.js-edition-decr').on('click', function(e){
      DOM.counterEditionButton.val(parseInt(DOM.counterEditionButton.val(),10)-10);
    })




    /*NP check radio*/

    $("#js-np-true").on('change', function(e){
        $(this).siblings('.js-np-wrapper').slideToggle().removeClass('none').addClass('block');
    })

    $("#js-np-false").on('change', function(e){
        $(this).siblings('.js-np-wrapper').slideToggle().addClass('none').removeClass('block');
    })



    //NP query

    $(function() {
        var params = {
            "apiKey": "8c8f73f63c2007db6acd7c85305b7e82",
            "modelName": "AddressGeneral",
            "calledMethod": "getWarehouses",
        };
      
        $.ajax({
            url: "https://api.novaposhta.ua/v2.0/json/AddressGeneral/getWarehouses?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
            },
            type: "POST",
            dataType: 'jsonp',
            data: "{body}",
        })
        .done(function(data) {
            console.log(data);
        })
        .fail(function() {
            alert("error");
        });
    });


});


/*range slider*/

let blockPaperSlider, coverPaperSlider;

blockPaperSlider = document.getElementById('block-slider');
coverPaperSlider = document.getElementById('cover-slider');

noUiSlider.create(blockPaperSlider, {
  connect: true,
  behaviour: 'tap',
  start: [ 65 ],
  range: {
    'min': [ 65, 15 ],
    '25%': [ 80, 20 ],
    '50%': [ 100, 20 ],
    '75%': [ 120, 40 ],
    'max': [ 160 ]
  }
});

noUiSlider.create(coverPaperSlider, {
  connect: true,
  behaviour: 'tap',
  start: [ 115 ],
  range: {
    'min': [ 115, 15 ],
    '15%': [ 130, 20 ],
    '30%': [ 150, 20 ],
    '50%': [ 170, 30 ],
    '65%': [ 200, 50 ],
    '80%': [ 250, 50 ],
    'max': [ 300 ]
  }
});
