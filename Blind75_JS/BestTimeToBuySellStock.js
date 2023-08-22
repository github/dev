var maxProfit = function(prices) {

    let  profit = 0;
    let  boughtPrice = prices[0];
 
    for(let  i = 1; i< prices.length; i++){

        if(boughtPrice > prices[i]) {
            boughtPrice = prices[i];
        }

        let  currProfit = prices[i] - boughtPrice;
        if(currProfit > profit){
            profit = currProfit;
        }

    }
    
    return profit;

};