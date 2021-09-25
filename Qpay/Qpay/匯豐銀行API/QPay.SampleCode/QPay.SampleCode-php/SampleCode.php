<?php
	include "QPayToolkit.php";
	
	AllotQuery();
	
	//建立信用卡訂單
	function OrderCreate4Card()
	{
		global $ShopNo;
	
		$Service = new OrderCreate;
		$Service->ShopNo = $ShopNo;
		$Service->Amount = '50000';
		$Service->OrderNo = 'C' . date("YmdHis");
		$Service->PayType = 'C';
		$Service->PrdtName = '信用卡訂單';
		$Service->ReturnURL = 'http://10.11.22.113:8803/QPay.ApiClient-Sandbox/Store/Return';
		$Service->BackendURL = 'https://sandbox.sinopac.com/funBIZ.ApiClient/AutoPush/PushSuccess';
		$Service->CardParam['AutoBilling'] = 'Y';
		
		echo APIService("OrderCreate", $Service);
	}
	
	//建立虛擬帳號訂單
	function OrderCreate4ATM()
	{
		global $ShopNo;
	
		$date = new DateTime(date('Y-m-d'));
		$date->add(new DateInterval('P10D'));
		$ExpireDate = $date->format('Ymd');
	
		$Service = new OrderCreate;
		$Service->ShopNo = $ShopNo;
		$Service->Amount = '50000';
		$Service->OrderNo = 'A' . date("YmdHis");
		$Service->PayType = 'A';
		$Service->PrdtName = '虛擬帳號訂單';
		$Service->ReturnURL = 'http://10.11.22.113:8803/QPay.ApiClient-Sandbox/Store/Return';
		$Service->BackendURL = 'https://sandbox.sinopac.com/funBIZ.ApiClient/AutoPush/PushSuccess';
		$Service->ATMParam['ExpireDate'] = $ExpireDate;
		
		echo APIService("OrderCreate", $Service);
	}
	
	//訂單交易查詢
	function OrderQuery()
	{
		global $ShopNo;
		
		$Service = new OrderQuery;
		$Service->ShopNo = $ShopNo;
		$Service->OrderNo = 'A20180706100451';
		
		echo APIService("OrderQuery", $Service);
	}
	
	//訊息查詢服務
	function OrderPayQuery()
	{
		global $ShopNo;
		
		$Service = new OrderPayQuery;
		$Service->ShopNo = $ShopNo;
		$Service->PayToken = 'c7b0d2b994251d730f4a2feb24e584c509264e92829c9194d1952da08898e44f';
		
		echo APIService("OrderPayQuery", $Service);
	}
?>

