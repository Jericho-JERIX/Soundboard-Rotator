import SoundService from "./services/sound.service";

const s = new SoundService()

let result = s.randomSound(7)
const record: { [soundName: string]: number } = {}

for (let i = 0; i < 10; i++) {
    result = s.randomSound(8)
    result.map(r => console.log(r.name))
    result.map(r => record[r.filename] = (record[r.filename] || 0) + 1)
    console.log("--------------------------------")
}

console.log(record)
console.log(Object.keys(record).length)
