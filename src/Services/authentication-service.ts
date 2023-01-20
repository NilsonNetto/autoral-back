import authenticationRepository from "@/Repositories/authentication-repositorie"

async function signIn(data: signInParams) {
  const created = await authenticationRepository.createUser(data);
  
  if(!created){
    return 
  }

}

export type signInParams = {
  email: string;
  password: string;
  name: string;
  username: string;
  profilePicture?: string;
}

const authenticationService = {
  signIn
};

export default authenticationService;