import bcrypt from 'bcrypt'

export const HashPassword =async (password)=>{
    try{

        const SaltRounds =10
        const HashedPassword = await bcrypt.hash(password,SaltRounds)
        return HashedPassword
    }
    catch(error){
        console.log(error)
    }

}

export const ComparePassword =async(password,HashedPassword)=>{

    return bcrypt.compare(password,HashedPassword)

}