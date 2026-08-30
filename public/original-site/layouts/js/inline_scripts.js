
		var csrf_token = "JgbjPLVHNnQLU9JhGKwfpocwNyFdfOQrsLtdCqcm";
	

(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PDWXGS2');


      pidTracker('57474');



    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "hvfzy60m21");



!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
 fbq('init', '985715591474350'); 
fbq('track', 'PageView');



window.fbAsyncInit = function() {
  FB.init({
    xfbml            : true,
    version          : 'v3.2'
  });
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


        // The Phone numbers
        var phoneNumbers = [
            "+919902926006",
            "+919980145650"
        ];

		var randommobile = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
		// alert(randommobile);

        /**
         * Returns a random integer between min (inclusive) and max (inclusive)
         * Using Math.round() will give you a non-uniform distribution!
         */
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function call(event) {
			event.preventDefault();
			
            // Call the random number
            window.open("tel:" + randommobile);

        }

		function whatsappsend(event)
		{
			event.preventDefault();
			window.location.href="https://api.whatsapp.com/send?phone="+randommobile;
		}
    



	var sfrom = 0;
	var sto = 200000;

	$(document).ready(function(){
		  
		$(".js-range-slider").ionRangeSlider({
	        // type: "double",
	        min: 0,
	        max: 5000000,
	        step: 100,
	        onFinish: function (data) {
            sfrom = data.from;
            sto = data.to;
        	},
		});
	});

	$(document).on('click','.loc_area',function(){

		
		var array = $.map($('input[name="loc_area"]:checked'), function(c){return c.value; })


		var type = "post";
        var url  = "https://www.alliancesquare.com/checkbox-layout-filter";
        var data = {'ids':array};
        var header = {'X-CSRF-Token': csrf_token}; 

        $.ajax({
            type:type,
            url:url,
            data:data,
            headers: header,

            success: function (response) {

            	var filter_div = '';

            	if(response.filtered_layouts != 0) {

            	 $.each(response.filtered_layouts,function(i,v) {
            			filter_div += '<div class="property-listing-box sale-block">'+
						'<div class="property-main-box">'+
							'<div class="col-md-4 p_z">'+
								'<div class="layout-img-box">'+
									'<a href="https://www.alliancesquare.com/layouts/'+v.layout_name+'"><img src="https://www.alliancesquare.com/admin_assets/storage/layout_images/297X194/'+v.image+'" alt="Layout Cover Image" class="img-responsive" ></a>'+
								'</div>'+
								
							'</div>'+
							'<div class="col-md-8 p_z">'+
								'<div class="property-details inner-proerty-details">';
									if(v.layout_type == "featured") {

									}
					filter_div +='<a href="https://www.alliancesquare.com/layouts/'+v.layout_name+'">'+v.layout_name+'</a>'+
									'<h4>&#8377;'+v.sale_price+' ('+v.price_type+')</h4>'+
									'<p>'+v.intro_text+'</p>'+
									'<a href="https://www.alliancesquare.com/layouts/'+v.layout_name+'" class="list-read-more">View More</a>'+
								'</div>'+
							'</div>'+
							'<div class="clearfix"></div>'+
						'</div>'+
					'</div>';
					});
								
							

				} else {
					 filter_div += '<p> - No Layout Found - </p>';
				}

				$('#filter_div').html(filter_div);

            },
			error: function (xhr, status, error) {
                console.log(xhr);
                var err = jQuery.parseJSON(xhr.responseText);

                location.reload();
                
            }

        });

		
	});

	$('#range_ok').click(function(){

		var type = "post";
        var url  = "https://www.alliancesquare.com/range-layout-filter";
        var data = {'from_price':sfrom,'to_price':sto};
        var header = {'X-CSRF-Token': csrf_token}; 

        $.ajax({
            type:type,
            url:url,
            data:data,
            headers: header,

            success: function (response) {

            	var filter_div = '';

            	if(response.filtered_layouts != 0) {

            	 $.each(response.filtered_layouts,function(i,v) {

            	 	filter_div += '<div class="property-listing-box sale-block">'+
						'<div class="property-main-box">'+
							'<div class="col-md-4 p_z">'+
								'<div class="layout-img-box">'+
									'<a href="https://www.alliancesquare.com/layouts/'+v.layout_name+'"><img src="https://www.alliancesquare.com/admin_assets/storage/layout_images/297X194/'+v.image+'" alt="Layout Cover Image" class="img-responsive" ></a>'+
								'</div>'+
								
							'</div>'+
							'<div class="col-md-8 p_z">'+
								'<div class="property-details inner-proerty-details">';
									if(v.layout_type == "featured") {

									}
					filter_div +='<a href="https://www.alliancesquare.com/layouts/'+v.layout_name+'">'+v.layout_name+'</a>'+
									'<h4>&#8377;'+v.sale_price+' ('+v.price_type+')</h4>'+
									'<p>'+v.intro_text+'</p>'+
									'<a href="https://www.alliancesquare.com/layouts/'+v.layout_name+'" class="list-read-more">View More</a>'+
								'</div>'+
							'</div>'+
							'<div class="clearfix"></div>'+
						'</div>'+
					'</div>';
            						 
				 });
								

				} else {
					 filter_div += '<p> - No Layout Found - </p>';
				}

				$('#filter_div').html(filter_div);
                 
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                var err = jQuery.parseJSON(xhr.responseText);

                swal({title: "error! Please reload the page and try again.", type: "error"},
                   function(){ 
                       location.reload();
                   }
                 );
                
            }
            
        });
		
	});



 
		<div class="col-md-3 col-sm-3 col-xs-6">
			<div class="imageholder">
				<figure>
					<img src="${filePath}" alt="${fileName}"/>
				</figure>
			</div>
		</div>
	