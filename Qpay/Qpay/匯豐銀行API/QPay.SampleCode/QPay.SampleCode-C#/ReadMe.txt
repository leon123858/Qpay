==QPay.Sample ReadMe==

##���M�״���QPay Web API ����1.0.0���걵�Ѧ�

1.���M�רϥ�.NET Framework 4.5.2�ظm
2.���M�׻ݰѦ�dll�p�U:
	Newtonsoft.Json,
	System.Net.Http.Formatting,
	System.ComponentModel.DataAnnotations, 
	System.Configuration,
	System.Runtime.Serialization
  �e�ⶵ�w����M�פ���Dll��Ƨ����A��l���إi�b.NET Framework4.5.2�����
  (�Y���|����Sample Code�ܷs�M�ץi�H�������I)
3.QPayToolkit.cs�|�Ѧү��xappSettings.config������ơA�ѦҦp�U�A�i�A�ۦ�վ��ƨӷ�
	line 24	: ���o�ӷ~���IAPI ���}
	<add key="QPayWebAPIUrl" value="https://apisbx.sinopac.com/funBIZ/QPay.WebAPI/api/"/>
	line 117: �̰ө��s�����o�ө������(��A1, A2, B1, B2�Ƨ�, �ӷ~���I����)
	<add key="AA0001_001" value="A1A1A1A1A1A1A1A1,A2A2A2A2A2A2A2A2,B1B1B1B1B1B1B1B1,B2B2B2B2B2B2B2B2"/>
4.QPayToolkit.cs�å���@QPayCommon.InfoLog��QPayCommon.ExceptionLog
  �i�ۦ�P�_��������Log�O���άO�ۦ��@
5.�걵�覡�i�����ϥ�QPayToolkit���Ѥ����}��k (�� 26 �� 110 ��)
	�q��إ�:				public static CreOrder OrderCreate(CreOrderReq req)
	�q��d��:				public static QryOrder OrderQuery(QryOrderReq req)
	�ݽдڭq��d��:			public static QryOrderUnCaptured OrderUnCapturedQuery(QryOrderUnCapturedReq req)
	�H�Υd�q����@:			public static MaintainOrder OrderMaintain(MaintainOrderReq req)
	�I�ڵ��G�d�ߪA��:		public static QryOrderPay OrderPayQuery(QryOrderPayReq req)
	�C�馬(�h)�ڬd�ߪA��:	public static QryBill BillQuery(QryBillReq req)
	�����ɬd�ߪA��:			public static QryAllot AllotQuery(QryAllotReq req)
6.Request�U����g����ХHAPI�걵��U���D�A�{�����Ѭ���
	
	

