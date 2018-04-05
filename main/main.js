var Datbase = require('../main/datbase');
var datbase = new Datbase();
module.exports = function printInventory(inputs) {
	let initialPrice = 0;	
	let itemsSum = '';
	let discount = ''; 
	let selectedItem = recordItems(inputs,datbase.loadAllItems());
	let promotionItems = datbase.loadPromotions();
	//console.log(selectedItem);	
	for (let k = 0; k < selectedItem.length; k++) {
		if (selectedItem[k].num){
			let temp1 = selectedItem[k].price * selectedItem[k].num;
			initialPrice += temp1;		
			if (promotionItems[0].barcodes.indexOf(selectedItem[k].barcode) != -1) temp1 -=  selectedItem[k].price; 
			itemsSum += `名称：${selectedItem[k].name}，数量：${selectedItem[k].num}${selectedItem[k].unit}，单价：${selectedItem[k].price.toFixed(2)}(元)，小计：${temp1.toFixed(2)}(元)
`;
		}		
	}	
	discount = promotion( promotionItems,selectedItem,initialPrice);
	
	console.log('***<没钱赚商店>购物清单***\n'+itemsSum+discount);
};
	
function recordItems(inputs, allItems) {				
	for (let i = 0; i < inputs.length; i++){
	let temp = inputs[i].split('-');			
		for (let j = 0; j < allItems.length; j++){				
			if (allItems[j].barcode == temp[0]) {
				if (!allItems[j].num) {
					allItems[j].num = 0;
				}
				if (temp[1]){
					allItems[j].num += parseInt(temp[1]);
				} else {
					allItems[j].num += 1;
				}
				break;
			}			
		}
	}
	return allItems;		
};
	
function promotion(promotionItems,selectedItem,initialPrice) {
	let discount = {value:0,item:[]};
	for (let i = 0; i < selectedItem.length; i++) {
		for (let j = 0; j < promotionItems[0].barcodes.length; j++){
			if (selectedItem[i].barcode == promotionItems[0].barcodes[j] && selectedItem[i].num) {
				discount.value += (selectedItem[i].price);
				discount.item.push(selectedItem[i]);
			}
		}
	}
	
	if (discount.value == 0) {
return `----------------------
总计：${initialPrice.toFixed(2)}(元)
**********************
`;
}
	
	let discountItem = '';
	for (let i = 0; i < discount.item.length; i++) {
		discountItem += `名称：${discount.item[i].name}，数量：1${discount.item[i].unit}
`;
	}
	
	let finalPrice = initialPrice-discount.value;
return `----------------------
挥泪赠送商品：
${discountItem}----------------------
总计：${finalPrice.toFixed(2)}(元)
节省：${discount.value.toFixed(2)}(元)
**********************`.trim();
	};

	