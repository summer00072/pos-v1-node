var loadAllItems = require('../main/datbase');
var loadPromotions = require('../main/datbase');
module.exports = function main() {
	console.log(inputs); 
   function printInventory(inputs) {
   console.log(inputs); 	
	let allItems = [];
	let promotionItems = [];
	let selectedItem = [];
	let initialPrice = 0;	
	let itemsSum = '';
	let discount1 = {};
	let discounts = ''; 
	let orderDetail = ''
	allItems = loadAllItems();
	promotionItems = loadPromotions();
	selectedItem = recordItems(inputs,allItems);	
	for (let k = 0; k < selectedItem.length; k++) {
		let temp2 = '';
		let temp1 = 0;
		temp1 = selectedItem[k].price * selectedItem[k].num;
		initialPrice += temp1;
		temp2 = '名称：'+selectedItem[k].name+'，数量：'+selectedItem[k].num+selectedItem[k].unit+'，单价：'+selectedItem[k].price+'(元)，小计：'+temp1+'(元)\n';
		itemsSum += temp2;
	}
	
	discount1 = promotion(selectedItem, promotionItems);
	discounts = discount(discount1,initialPrice);
	orderDetail = '***<没钱赚商店>购物清单***\n'+itemsSum+discounts;
	console.log(orderDetail);
};
	
	function recordItems(inputs, allItems) {
		let items = [];
		let barcode_value,price_value,name_value,num_value,unit_value;
		for (let i = 0; i < inputs.length; i++){
			let temp = [];
			let item = {};
			temp = inputs[i].split('-');
			barcode_value = temp[0];
			num_value = parseInt(temp[1]);
			for (let j = 0; j < allItems.length; j++){				
				if (allItems[j].barcode == barcode_value) {
					price_value = allItems[j].price;
					name_value = allItems[j].name;
					unit_value = allItems[j].unit;
					break;
				}			
			}
			item = {barcode:barcode_value,unit:unit_value, num:num_value, price:price_value, name:name_value};
			items.push(item);
		}
		return items;		
	}
	
	function promotion(selectedItem, promotionItems) {
		let discount = {value:0,item1:'',item2:'',item3:'',unit1:'',unit2:'',unit3:''};

		for (let i = 0; i < selectedItem.length; i++) {
			if (selectedItem[i].barcode == promotionItems[0].barcodes[0]) {
				discount.value += (selectedItem[i].price)
				discount.item1 = selectedItem[i].name;
				discount.unit1 = selectedItem[i].unit;
			} else if (selectedItem[i].barcode == promotionItems[0].barcodes[1]) {
				discount.value += (selectedItem[i].price)
				discount.item2 = selectedItem[i].name;
				discount.unit2 = selectedItem[i].unit;
			} else if (selectedItem[i].barcode == promotionItems[0].barcodes[2]) {
				discount.value += (selectedItem[i].price)
				discount.item3 = selectedItem[i].name;
				discount.unit3 = selectedItem[i].unit;
			}
		}
		
		return discount;
	}
	function discount(discount1,initialPrice){
		
		let discounts = '';
		if (discount1.value == 0) {
			discounts = '----------------------\n总计：'+initialPrice+
			'(元)\n**********************';
			return discounts;
		}
		
		let discountItem = '';
		if (discount1.item1 !='') {
			discountItem += '名称：'+discount1.item1+'，数量：1'+discount1.unit1+'\n';
		} 
		if (discount1.item2 !='') {
			discountItem += '名称：'+discount1.item2+'，数量：1'+discount1.unit2+'\n';
		}
		if (discount1.item3 !='') {
			discountItem += '名称：'+discount1.item3+'，数量：1'+discount1.unit3+'\n';
		}
		
		discounts = '----------------------\n'+
		'挥泪赠送商品：\n'+
		discountItem+
		'----------------------\n'+
		'总计：'+initialPrice+'(元)\n'+
		'节省：'+discount1.value+'(元)\n'+
		'**********************';
		
		return discounts;
		
	};
  /*TODO*/
module.exports = printInventory();

};
