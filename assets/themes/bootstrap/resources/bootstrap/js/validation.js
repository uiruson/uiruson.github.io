$(document).ready(function() {
    var messageDelay = 2000;
  //validate form
  $("#contactForm").validate({
    rules: {
                name: {
                    required: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 5
                }
            },

            errorElement: "div",
            errorClass: "has-error",
            highlight: function(element, errorClass) {
                $(element).parents(".form-group").addClass(errorClass);
            },
            unhighlight: function(element, errorClass) {
                $(element).parents(".form-group").removeClass(errorClass);
            },
            errorPlacement: function(error, element) {
                
            },
            success: function(label) {
                label.html("\u2714").addClass("valid");
            },
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
                var fullNameInput = $("input[name='name']", this);
                var emailInput = $("input[name='email']", this);
                var messageInput = $("textarea[name='message']", this);
                if (errors) {
                        var message = errors == 1
                                ? 'Missing 1 field. '
                                : 'Missing ' + errors + ' fields.';

                        if (fullNameInput.length && !validator.element(fullNameInput)) {
                            message = "Invalid Name."
                        } else if (emailInput.length && !validator.element(emailInput)) {
                            message = "Invalid Email Address."
                        } else if (messageInput.length && !validator.element(messageInput)) {
                            message = "Invalid Message."
                        } 
                $(".error-message").html('<div class="alert alert-danger">' + message + '</div>');
                $(".error-message").show();
            } else {
                $(".error-message").errorhide();
            }
          },
            submitHandler: function(form) {
                
                  //$('#contactForm').submit( submitForm).addClass( 'positioned' );
                  var contactForm = $('#contactForm');
 
                  if ( !$('#senderName').val() || !$('#senderEmail').val() || !$('#senderMessage').val() ) {
                    $('.incompleteMessageDiv').fadeIn().delay(messageDelay).fadeOut();
                    contactForm.fadeOut().delay(messageDelay).fadeIn();
                 
                  } else {
                    $('#contactForm').hide();
                    $('#sendingMessageDiv').fadeIn();
                    
                    $.ajax( {
                      url: contactForm.attr( 'action' ) + "?ajax=true",
                      type: contactForm.attr( 'method' ),
                      data: contactForm.serialize(),
                      success: formSubmission
                    } );
                  }

                return false;
            }
    });

});//jQuery is loaded



function formSubmission( response ) {
    var msgDelay = 5000; 
    response = $.trim( response );

    $('#sendingMessageDiv').fadeOut();
     
    if ( response == "success" ) {
        $('#contactForm').hide();
        $('.thankYouMessageDiv').show();
    } else { 
        $('.failedMessageDiv').fadeIn().delay(msgDelay).fadeOut();
        $('#contactForm').delay(msgDelay+500).fadeIn();
    }
}