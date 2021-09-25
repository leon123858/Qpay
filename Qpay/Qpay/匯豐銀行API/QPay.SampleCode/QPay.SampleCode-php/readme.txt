PHP SampleCode 使用方法

1.請開啟 QPayToolkit.php 調整參數
	(1) $targetUrl(行數 3)
		Sandbox環境使用, 請改成 ==> https://apisbx.sinopac.com/funBIZ/QPay.WebAPI/api/
		
	(2) $ShopNo (行數 5)
		請依信件內提供商店編號更改
	
	(3) $Hash (行數 7)
		請依信件內提供雜湊值, 更改陣列內 A1、A2、B1、B2 參數
		
2.完成參數調整後, 請將要使 API 服務 include QPayToolkit.php 進去, 呼叫方法請參考 SampleCode.php, 相關 Sample 如下
	(1) 建立信用卡訂單  ==>  OrderCreate4Card()
	(2) 建立虛擬帳號訂單  ==>  OrderCreate4ATM()
	(3) 訂單交易查詢  ==>  OrderQuery()
	(4) 訊息查詢服務  ==>  OrderPayQuery()
	
	PS.$Service 各欄位填寫限制請以API串接手冊為主