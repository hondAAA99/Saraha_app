import { hashSync ,compareSync} from "bcrypt";

export function hash(data,salt=12){
    return hashSync(data,salt)
}

export function compare(plainText, hash) {
  return compareSync(plainText, hash);
}