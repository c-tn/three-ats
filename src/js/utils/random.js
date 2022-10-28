
export class PseudoRandom {
    seed = ''
	a = 16807
	c = 0
	m = Math.pow(2, 31) - 1

    constructor(seed) {
        this.seed = this.getSeed(seed)
    }

    getSeed(seed) {
        let s = 34737
    
        for(let i = 0; i < seed.length; i++){
            s += (i + 1) * seed.charCodeAt(i)
        }
        
        return s
    }
    
    getValue() {
        this.seed = (this.a * this.seed + this.c) % this.m
    
        return this.seed / (this.m - 1)
    }
    
    getStringValue() {
        this.seed = (this.a * this.seed + this.c) % this.m
    
        return (this.seed / (this.m - 1)).toString(36).substr(2)
    }
}

export class RandomBetween {
    generator = null

    constructor(generator) {
        this.generator = generator
    }

    getValue(min, max) {
        return (this.generator.getValue() * (max - min) + min).toFixed(2)
    }   
}