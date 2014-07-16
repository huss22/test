<?
require_once("http://expenseapp.domytaxreturn.com.au/connect.php/connect.php");	

$sql = "SELECT * FROM DynamicSelect"; 

$result = mysqli_query($con,$sql); 

WHILE ($row = mysqli_fetch_array($result)){

echo "<option value = '".$row['Options']."'>".$row['Options']."</option>";

}

?> 
