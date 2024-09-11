function generateRandomAlphaNumericString(len = 13){
  const chars = []

  // digits: 0-9
  for(let i=0; i<=9; i++){
    chars.push(String.fromCharCode(48 + i))
  }

  // lowercase: a-z
  for(let i=0; i<26; i++){
    chars.push(String.fromCharCode(97 + i))
  }

  // uppercase: A-Z
  for(let i=0; i<26; i++){
    chars.push(String.fromCharCode(65 + i))
  }

  let randomStr = ''
  while(len-- > 0){
    const randomIdx = Math.floor(Math.random() * chars.length)
    randomStr += chars[randomIdx]
  }

  return randomStr
}

let count = 100
const len = 13
console.log(`Generating ${count} alpha-numeric strings of length ${len}...`)

for(let i=1; i<=count; i++){
  const id = generateRandomAlphaNumericString(len)
  console.log(i + ' -> ' + id)
}

console.log('--------------------------------')