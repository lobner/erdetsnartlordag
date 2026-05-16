<?
  //blev nødt til at sætte en tidszone... den var to timer bagefter.
  //så det ikke blev lørdag før lørdag kl 02.00 !!! - det dutter ikke!
date_default_timezone_set("Europe/Copenhagen");

function hitcount(){
  $file = "visitors.log";
  if(!file_exists($file)) {
    touch($file);
    $handle = fopen($file, 'r+'); 
    $count = 0;
  } else {
    $handle = fopen($file, 'r+'); 
    $count = fread($handle, filesize ($file));
    settype($count,"integer");
  }
  rewind($handle);

  if(isset($_COOKIE['duHarJoVaeretHerKlovn']) == false) {
    fwrite($handle, ++$count);
    setcookie("duHarJoVaeretHerKlovn", "1000 gange", time()+3600);  /* expire in 1 hour */
  }
  fclose($handle);

  return $count;
  }

$hits = hitcount();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html lang="en"  xmlns="http://www.w3.org/1999/xhtml">
<head>
<?php
$weekday = date("w");
$weekdays = array(0 => "Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag");
?>

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-8813921-3']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>


<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<meta name="description" content="Her finder alt hvad hjertet kan begærer om emnet 'er det snart lørdag?'" />
<meta name="keywords" content="lørdag, øl, porn, er det snart, lørdagskylling" />
<meta name="author" content="malmo, kaares &amp; lobner" />
<title>Er det snart lørdag?</title>
<style type="text/css">
    b { color:red; }
 body { text-align:center; }
</style>
</head>
<?php
if($weekday == 6) {
?>

<body>

<h1>Det ER lørdag... fedtfjæs...</h1>

<?php
} else {
?>

<body>

<div>

<h1>NEJ!! - det er ikke LØRDAG din klaphat!<br />
...det er jo <?= strtolower($weekdays[$weekday]); ?>.</h1>

<img src="<?= strtolower($weekdays[$weekday]); ?>.jpg" alt="Billede af en fed lort!" /> <br />
<div>
<script type="text/javascript">
TargetDate = "<?= date('n/j/Y h:i A',strtotime('this Saturday')); ?>"
BackColor = "white";
ForeColor = "black";
CountActive = true;
CountStepper = -1;
LeadingZero = false;
<?php if($weekday > 4) { ?>
DisplayFormat = "%%H%% timer, %%M%%  minutter og %%S%%  sekunder.";
<?php } else { ?>
DisplayFormat = "%%D%% <?= ($weekday == 4 ? 'dag' : 'dage') ?>, %%H%% timer, %%M%%  minutter og %%S%%  sekunder.";
<?php } ?>
FinishMessage = "Det er lørdag!";
</script>
Det er lørdag om:&nbsp;&nbsp;
<script type="text/javascript" src="countdown.js"></script>
</div>

<h2>Kom endelig igen en anden gang!</h2>
</div>

<?php
}
echo "<div>Danne sidan er blivt fangat ". $hits ." gånga i ahlt</div>";
?>

<p>
<a href="http://validator.w3.org/check?uri=referer">
  <img src="valid-xhtml11-blue.png" 
       alt="Valid XHTML 1.1" 
       style="border:0;width:88px;height:31px;" />
</a>
<a href="http://jigsaw.w3.org/css-validator/check/referer">
  <img style="border:0;width:88px;height:31px"
       src="valid-css2-blue.png"
       alt="Valid CSS2.1!" />
</a>
</p>

<!-- <script type="text/javascript" src="http://www.erdetsnartlørdag.dk/snow.js" ></script> -->

</body>
</html>
