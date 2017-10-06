import Mock from 'mockjs';

export var cartData = Mock.mock('g.cn/cart',{
    "status": 1,
    "message": "success",
    "result": {
		"list|5-10": [
			{
				"productId": '@id',
				"productName|1": ["黄鹤楼香烟","加多宝","和其正","百事可乐"],
				"productPrice|1-20": 6,
				"productQuantity|1-10": 5,
				"productImage": "@image('78x70')",
				"parts|2-4": [
					{
						"partsId": "@id",
						"partsName|1": ["打火机","吸管","指甲剪","梳子"],
						"imgSrc": "@dataImage"
					}
				]
			},
		]
    }
});

export var addressData = Mock.mock('g.cn/address',{
    "status": 0,
    "message": "success",
    "result|5-10":  [
		{
			"addressId": "@id",
			"userName|1": "@cname",
			"streetName": "@county(true)",
			"postCode": "@zip",
			"tel|1": ['13531544954','13632250649','15820292420','15999905612'],
			"isDefault": "@boolean(1, 9, true)"
		}
	]
});