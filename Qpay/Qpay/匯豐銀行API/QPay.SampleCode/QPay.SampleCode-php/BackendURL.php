<?php
	include "QPayToolkit.php";
	
	//取得豐收款 POST 內容	
	$data = file_get_contents('php://input');

	//Log 
	$file = fopen("AutoPush.txt","a+"); //開啟檔案
	fwrite($file,$str);
	fclose($file);

	//將取得 Json 轉換為物件使用
	$Request = new OrderPayQuery;	
	$Request = json_decode($data );

	//使用訊息查詢服務確認訂單結果
	$Service = new OrderPayQuery;
	$Service->ShopNo = $Request->ShopNo;
	$Service->PayToken = $Request->PayToken;
	
	//$Response 內有訂單資訊
	$Response = APIService("OrderPayQuery", $Service);	

	//確認訂單資訊正確回覆接收成功訊息
	echo '{"Status":"S"}';
?>
