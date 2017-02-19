 export const Party = {        
        Democrat: 1,
        Independent: 2,
        Green: 3,
        Libertarian: 4,
        Republican: 5
    }


export function StringOfEnum(en, value) {
  for (var k in en){
    if (en[k] == value) return k;
  } 
  return null;
} 
