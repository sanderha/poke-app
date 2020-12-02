
export const DOWN = 0;
export const UP = 1;
export const traverseFlatList = (list, startValue, direction = DOWN) => {
    // go up or down in list and return 1 item
    if(!list.length) return null;
    if(!startValue) return list[0];
    let result = null;
    list.forEach((item, index) => {
        if(item !== startValue) return;
        // we've found our start value! Now lets see if we need the next (DOWN) or the previous (UP)
        if(direction === DOWN) result = list[(index+1)];
        if(direction === UP) result = list[(index-1)];
    });

    return result;
}