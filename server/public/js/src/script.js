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
});
