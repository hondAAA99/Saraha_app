import { hashSync ,compareSync} from "bcrypt";

export function hash(data,salt=12){
    return hashSync(data,salt)
}

export function compare(plainText, hashedText) {  
  return compareSync(plainText, hashedText);
}