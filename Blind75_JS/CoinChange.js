var coinChange = function(coins, amount) {
    if(amount == 0) return 0;
    const mem = new Array(amount+1);
    mem[0] = 0;
    for(let i = 1; i < mem.length; i++){

        let minCoins = Number.MAX_VALUE;  

        for(let j = 0; j < coins.length; j++){
            
            if(i >= coins[j]) {
            let remainder = i - coins[j];
            if(mem[remainder] != -1) {
                minCoins = Math.min(minCoins, mem[remainder] + 1);  
            }
            }

        }

        mem[i] = (minCoins != Number.MAX_VALUE) ? minCoins : -1;

    }

    return mem[amount];
};