var Datbase = require('../main/datbase');
var datbase = new Datbase();
module.exports = function printInventory(inputs) {
	//console.log(inputs); 

	let selectedItem = [];
	let initialPrice = 0;	
	let itemsSum = '';
	let discount1 = {};
	let discounts = ''; 
	selectedItem = recordItems(inputs,datbase.loadAllItems());
	let promotionItems = datbase.loadPromotions()
	//console.log(selectedItem);	
	for (let k = 0; k < selectedItem.length; k++) {
		let temp1 = selectedItem[k].price * selectedItem[k].num;
		initialPrice += temp1;
		if (selectedItem[k].num != 0 ){
			if (promotionItems[0].barcodes.indexOf(selectedItem[k].barcode) != -1) temp1 -=  selectedItem[k].price; 
			itemsSum += '名称：'+selectedItem[k].name+'，数量：'+selectedItem[k].num+selectedItem[k].unit+'，单价：'+selectedItem[k].price.toFixed(2)+'(元)，小计：'+temp1.toFixed(2)+'(元)\n';
		}		
	}	
	discount1 = promotion( promotionItems,selectedItem);
	discounts = discount(discount1,initialPrice);
	console.log('***<没钱赚商店>购物清单***\n'+itemsSum+discounts);
};
	
	function recordItems(inputs, allItems) {
		let items = allItems.slice(0);
		for (let j = 0; j < items.length; j++){
			items[j].num = 0;
		}
		for (let i = 0; i < inputs.length; i++){
		let temp = inputs[i].split('-');			
		for (let j = 0; j < allItems.length; j++){				
			if (allItems[j].barcode == temp[0]) {
				if (temp[1]){
					items[j].num += parseInt(temp[1]);
				} else {
					items[j].num += 1;
				}
				break;
			}			
		}
		}
		return items;		
	};
	
	function promotion(promotionItems,selectedItem) {
		let discount = {value:0,item1:'',item2:'',item3:'',unit1:'',unit2:'',unit3:''};

		for (let i = 0; i < selectedItem.length; i++) {
			if (selectedItem[i].barcode == promotionItems[0].barcodes[0] && selectedItem[i].num != 0) {

				discount.value += (selectedItem[i].price)
				discount.item1 = selectedItem[i].name;
				discount.unit1 = selectedItem[i].unit;
			} else if (selectedItem[i].barcode == promotionItems[0].barcodes[1] && selectedItem[i].num != 0) {

				discount.value += (selectedItem[i].price)
				discount.item2 = selectedItem[i].name;
				discount.unit2 = selectedItem[i].unit;
			} else if (selectedItem[i].barcode == promotionItems[0].barcodes[2] && selectedItem[i].num != 0) {

				discount.value += (selectedItem[i].price)
				discount.item3 = selectedItem[i].name;
				discount.unit3 = selectedItem[i].unit;
			}
		}
		console.log(discount.value);
		return discount;
	};

	function discount(discount1,initialPrice){
		
		let discounts = '';
		if (discount1.value == 0) {
			discounts = '----------------------\n总计：'+initialPrice.toFixed(2)+
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
		let finalPrice = initialPrice-discount1.value;
		discounts = '----------------------\n'+
		'挥泪赠送商品：\n'+
		discountItem+
		'----------------------\n'+
		'总计：'+finalPrice.toFixed(2)+'(元)\n'+
		'节省：'+discount1.value.toFixed(2)+'(元)\n'+
		'**********************';
		
		return discounts;
		
	};
  
  /*TODO*/



