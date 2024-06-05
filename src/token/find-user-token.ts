import Token from "./token-model"

export const findUserToken = async (token:string):Promise<Token | null>=>{
    const user = await Token.findOne({where:{token}})
    return user
  }