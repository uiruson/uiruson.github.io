<?php
header('Content-Type: text/html; charset=utf-8');
define( "RECIPIENT_NAME", "Wilson Mak" );
define( "RECIPIENT_EMAIL", "wilson@wilsonmak.com" );
define( "EMAIL_SUBJECT", "Email from your website uiruson.github.io" );
 
$success = false;
$senderName = isset( $_POST['name'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['name'] ) : "";
$senderEmail = isset( $_POST['email'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['email'] ) : "";
$senderMessage = isset( $_POST['message'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['message'] ) : "";

$message = "
<html>
  <head>
    <title>Email from your site</title>
  </head>
  <body>
    <p>Name: ".$senderName."</p>
    <p>Email: ".$senderEmail."</p>
    <p>Message:</p>
    <p>".$senderMessage."</p>
  </body>
  </html>
  ";

if ( $senderName && $senderEmail && $senderMessage ) {
  $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
  $headers .= "From: " . $senderName . " <" . $senderEmail . ">";
  $success = mail( $recipient, EMAIL_SUBJECT, $message, $headers );
}
 
if ( isset($_GET["ajax"]) ) {
  echo $success ? "success" : "error";
} else {
?>
<html>
  <head>
    <title>Thanks!</title>
  </head>
  <body>
  <?php if ( $success ) echo "<p>Thanks for sending your message! We'll get back to you shortly.</p>" ?>
  <?php if ( !$success ) echo "<p>There was a problem sending your message. Please try again.</p>" ?>
  <p>Click your browser's Back button to return to the page.</p>
  </body>
</html>
<?php
}
?>