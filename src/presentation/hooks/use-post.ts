import React, { useState } from 'react'

import { AllUsersUseCase } from '@application/users/index';

import { CreatePublicationUseCase } from '@application/post/commands/create-post.usecase';
import { PostRequestDom, PostResponseDom } from '@domain/post';
import { UserDom } from '@domain/users';
import { NoParams } from '@core/index';

function usePost(  allUserUseCase: AllUsersUseCase, 
    createPostUseCase: CreatePublicationUseCase

) {
    //const allUsersUseCase = di.get<AllUsersUseCase>(USER_SYMBOLS.USER_LIST);
    const [users, setUsers] = useState<UserDom[]>([]); 
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<boolean>(false); 
     //new users 
     const [usersMemory, setUsersMemory] = useState<UserDom[]>([]); 
     async function allUsers() {
        const resultData = await allUserUseCase?.execute(NoParams)
        resultData.fold((data: UserDom[]) => {setUsers(data); setUsersMemory(data)}, (_: Failure) => setError(true))
       console.log("allusers",resultData.value)
        setLoading(false)
    }
     const searchUsers = async (value:string):Promise<UserDom[]>=>{
        
          if(!value){
            await allUsers()
            console.log("DENTRO DE ALLUSERS",)
            return users
          }  
          
          const resultUser = usersMemory.filter(users=>users.name?.toLowerCase().includes(value.toLowerCase()))
          console.log("USER SEARCH",resultUser)
          setUsers(resultUser)
          return resultUser
     }
 
   

    React.useEffect(() => {
        allUsers()
       
    },[allUserUseCase])

    const addPost = async (newPost: PostRequestDom) => {
        const result = await createPostUseCase?.execute(newPost)
        result.fold((_: PostResponseDom) => {console.log("post",_)}, (_: Failure) => console.log("fall",_))
    };

    return {
        users,
        loading,
        addPost,
        searchUsers,
        error
    };
}
export { usePost }