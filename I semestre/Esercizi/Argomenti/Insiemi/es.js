function reverseRecursive(v1,v2, i = 0, j = v2.length - 1){
    
    if(j == -1)
        return 1
    if(i == v1.length)
        return 0                    
    if(v1[i] == v2[j]){
        return reverseRecursive(v1,v2, i + 1, j - 1)
    }
    else
        return reverseRecursive(v1,v2,i + 1,j)
}

const testCases = [
    // Test 1: Caso base - V2 vuoto (sempre vero)
    {
        V1: [1, 2, 3, 4, 5],
        V2: [],
        expected: 1,
        description: "V2 vuoto - dovrebbe restituire 1"
    },
    
    // Test 2: Elementi consecutivi in ordine inverso
    {
        V1: [1, 2, 3, 4, 5],
        V2: [3, 2, 1],
        expected: 1,
        description: "Elementi consecutivi invertiti: [3,2,1] in [1,2,3,4,5]"
    },
    
    // Test 3: Elementi non consecutivi in ordine inverso
    {
        V1: [1, 2, 3, 4, 5, 6],
        V2: [5, 3, 1],
        expected: 1,
        description: "Elementi non consecutivi invertiti: [5,3,1] in [1,2,3,4,5,6]"
    },
    
    // Test 4: Tutti gli elementi in ordine inverso
    {
        V1: [1, 2, 3, 4],
        V2: [4, 3, 2, 1],
        expected: 1,
        description: "Tutto V1 invertito in V2"
    },
    
    // Test 5: Un solo elemento presente
    {
        V1: [1, 2, 3, 4, 5],
        V2: [3],
        expected: 1,
        description: "Singolo elemento presente"
    },
    
    // Test 6: Ordine NON inverso (stesso ordine)
    {
        V1: [1, 2, 3, 4, 5],
        V2: [1, 2, 3],
        expected: 0,
        description: "Stesso ordine - dovrebbe fallire"
    },
    
    // Test 7: Elemento mancante
    {
        V1: [1, 2, 3, 4, 5],
        V2: [6, 3, 1],
        expected: 0,
        description: "Elemento 6 non presente in V1"
    },
    
    // Test 8: Ordine parzialmente sbagliato
    {
        V1: [1, 2, 3, 4, 5],
        V2: [3, 4, 1],
        expected: 0,
        description: "Ordine non completamente inverso"
    },
    
    // Test 9: V1 e V2 identici con un elemento
    {
        V1: [5],
        V2: [5],
        expected: 1,
        description: "Array di un solo elemento identico"
    },
    
    // Test 10: Elementi duplicati in V1
    {
        V1: [1, 2, 2, 3, 3, 4],
        V2: [3, 2, 1],
        expected: 1,
        description: "V1 con duplicati, V2 in ordine inverso"
    },
    
    // Test 11: V2 più lungo di V1 (invalido)
    {
        V1: [1, 2],
        V2: [3, 2, 1],
        expected: 0,
        description: "V2 più lungo di V1"
    },
    
    // Test 12: Numeri negativi
    {
        V1: [-5, -3, -1, 0, 1, 3],
        V2: [1, -1, -3],
        expected: 1,
        description: "Con numeri negativi in ordine inverso"
    },
    
    // Test 13: Fine di V1
    {
        V1: [1, 2, 3, 4, 5],
        V2: [5, 4],
        expected: 1,
        description: "Ultimi elementi di V1 invertiti"
    },
    
    // Test 14: Inizio di V1
    {
        V1: [1, 2, 3, 4, 5],
        V2: [2, 1],
        expected: 1,
        description: "Primi elementi di V1 invertiti"
    },
    
    // Test 15: Elementi sparsi
    {
        V1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        V2: [9, 5, 2],
        expected: 1,
        description: "Elementi molto distanziati in ordine inverso"
    },
    
    // Test 16: Ordine inverso ma elemento ripetuto causa fallimento
    {
        V1: [1, 2, 3, 2, 1],
        V2: [2, 3, 2],
        expected: 0,
        description: "Ordine che sembra inverso ma non lo è completamente"
    },
    
    // Test 17: Array grandi
    {
        V1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        V2: [12, 8, 4, 2],
        expected: 1,
        description: "Array più grande con sottoseq inversa"
    },
    
    // Test 18: Tutti zeri
    {
        V1: [0, 0, 0, 0],
        V2: [0, 0],
        expected: 1,
        description: "Array con tutti zeri"
    },
    
    // Test 19: Ultimo elemento di V2 non trovato
    {
        V1: [1, 2, 3, 4, 5],
        V2: [4, 3, 0],
        expected: 0,
        description: "Ultimo elemento di V2 mancante"
    },
    
    // Test 20: Sequenza complessa che fallisce
    {
        V1: [5, 4, 3, 2, 1],
        V2: [1, 2, 3],
        expected: 0,
        description: "V1 decrescente, V2 crescente - dovrebbe fallire"
    }
];

// Esegui tutti i test
console.log("ESECUZIONE TEST:\n");
let passed = 0;
let failed = 0;

testCases.forEach((test, index) => {
    const result = reverseRecursive(test.V1, test.V2);
    const status = result === test.expected ? "✓ PASS" : "✗ FAIL";
    
    if (result === test.expected) {
        passed++;
    } else {
        failed++;
    }
    
    console.log(`Test ${index + 1}: ${status}`);
    console.log(`  ${test.description}`);
    console.log(`  V1: [${test.V1}]`);
    console.log(`  V2: [${test.V2}]`);
    console.log(`  Expected: ${test.expected}, Got: ${result}\n`);
});

console.log(`\nRISULTATI: ${passed}/${testCases.length} test passati, ${failed} falliti`);