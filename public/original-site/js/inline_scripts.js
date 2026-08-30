
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
    


        $('.counting').each(function() {
            var $this = $(this),
                countTo = $this.attr('data-count');

            $({
                countNum: $this.text()
            }).animate({
                    countNum: countTo
                },

                {

                    duration: 5000,
                    easing: 'linear',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                        //alert('finished');
                    }

                });


        });
    


        $("#mobile").keyup(function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });

        $(document).ready(function() {

            // Send Appointment Request
            $('#appointment').submit(function(e) {
                e.preventDefault();

                $("#submit").attr('disabled', 'disabled');
                $("#submit").text("Sending...");

                var type = "post";
                var url = "https://www.alliancesquare.com/send-appointment";
                var data = new FormData($(this)[0]);
                var header = {
                    'X-CSRF-Token': csrf_token
                };

                $.ajax({
                    type: type,
                    url: url,
                    data: data,
                    headers: header,
                    contentType: false,
                    processData: false,

                    success: function(response) {
						// console.log(response);
						// return true;
                        swal({
                                title: "Your request successfully sent. Will get back to you soon.",
                                type: "success"
                            },
                            function() {
                                location.reload();
                            }
                        );

                        // Global site tag (gtag.js) - Google Ads: 693970216
                        window.dataLayer = window.dataLayer || [];

                        function gtag() {
                            dataLayer.push(arguments);
                        }
                        gtag('js', new Date());
                        gtag('config', 'AW-693970216');



                    },
                    error: function(xhr, status, error) {
                        console.log(xhr);
                        var err = jQuery.parseJSON(xhr.responseText);
                        toastr["error"](err.user_message);
                        $('#submit').removeAttr('disabled');
                        $("#submit").text("Send");
                    }

                });
            });

        });

        // Parse the URL
        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        // Give the URL parameters variable names
        var source = getParameterByName('utm_source');
        var medium = getParameterByName('utm_medium');
        var campaign = getParameterByName('utm_campaign');
        var utmterm = getParameterByName('utm_term');
        var utmcontent = getParameterByName('utm_content');

        // Put the variable names into the hidden fields in the form.
		$("#utm_source").val(source);
		$("#utm_medium").val(medium);
		$("#utm_campaign").val(campaign);
		$("#utm_term").val(utmterm);
		$("#utm_content").val(utmcontent);
		
        // document.getElementsByName("leadsquared-mx_UTM_Campaign").value = campaign;
        // document.getElementsByName("leadsquared-mx_UTM_Source").value = source;
		// document.getElementsByName("leadsquared-mx_UTM_Medium").value = medium;
        // document.getElementsByName("leadsquared-mx_UTM_term").value = utmterm;
		// document.getElementsByName("leadsquared-mx_UTM_Content").value = utmcontent;
    

 
		<div class="col-md-3 col-sm-3 col-xs-6">
			<div class="imageholder">
				<figure>
					<img src="${filePath}" alt="${fileName}"/>
				</figure>
			</div>
		</div>
	