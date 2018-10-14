<?

$inputJSON = file_get_contents('php://input');
$item = json_decode($inputJSON);
$n = count($item);

$filename = "items.txt";
$myfile = fopen($filename, "a");
if (!$myfile) {
   die("Unable to open $filename.");
}

echo "<p>The following items were recorded:</p>";
echo "<ul>";

for ($x = 0; $x < $n; $x++) {
	$name = $item[$x];
	echo "<li>".$name."</li>";
	fwrite($myfile, $name.",");
}
fclose($myfile);
echo "</ul>";

?>
