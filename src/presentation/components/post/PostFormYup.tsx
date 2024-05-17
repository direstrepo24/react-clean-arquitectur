import { PostRequestDom } from "@domain/post";
import { UserDom } from "@domain/users"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next";
import * as Yup from 'yup';
import Button from "../atomic/atoms/Button";
import CheckIcon from "@presentation/assets/icons/CheckIcon";

import Select, { InputActionMeta, SingleValue } from 'react-select'
import AsyncSelect from "react-select/async";
import { Debounce, debounce, debounceUtil } from "@core/index";


interface PostFormProps {
    users: UserDom[],
    onClick: (_:PostRequestDom) => void;
    onSearchUser: (value:string)=> Promise<UserDom[]>;
    allUsersLoad:()=>void;
}

  //let callbacklocal = 
 // const debounce = new Debounce<string, Promise<UserDom[]>>(200);
     

const PostFormYup =({users=[],onClick, onSearchUser, allUsersLoad}:Readonly<PostFormProps>)=> {

    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        userid: Yup.string().required('user is required'),
        title: Yup.string()
          .required(t("titleRequired")?? '')
          .min(6, (t("titleMin")?? ''))
          .max(20, (t("titleMax")?? '')),
        body: Yup.string()
          .required('body is required')
          .min(6, 'body must be at least 6 characters')
          .max(20, 'body must not exceed 20 characters'),
    /*    email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
         password: Yup.string()
          .required('Password is required')
          .min(6, 'Password must be at least 6 characters')
          .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
          .required('Confirm Password is required')
          .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'), */
       // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
      });

  const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm<PostRequestDom>({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = (data:PostRequestDom) => onClick(data)
  const exampleAmount = 1000; // Ejemplo de cantidad monetaria
 
   const loadOptions = (
    inputValue: string,
    callback: (options: UserDom[]) => void
  ) => {
    
     console.log("llego al formyup", users)
     //debounce(onSearchUser(inputValue),300) 

     debounceUtil.$debounce(async() => {
    const result=await onSearchUser(inputValue)
    callback(result)
   
    },300)

   /* debounce(async (query: string) => {
      const result=await onSearchUser(query)
      callback(result)
  }, 1000)(inputValue)*/
    

  }; 



  //const promiseOptions = (inputValue: string) =>new Promise<UserDom[]>((resolve) => {resolve(onSearchUser(inputValue))});
 
  const promiseOptions = (inputValue: string) =>
    new Promise<UserDom[]>((resolve) => {
      setTimeout(() => {
        resolve(onSearchUser(inputValue));
      }, 1000);
    });
 
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full max-w-xs mx-auto text-white">
      <div className="grid grid-cols-1 gap-4">
        {/* Usuario */}
        <div>
          <label htmlFor="userid" className="label text-black">Usuario</label>
         {/*  <select id="userid" {...register("userid", { required: true })} className="select select-bordered w-full">
            {users.map(user => (
              <option key={user.id} value={user.id ?? ""}>{user.name}</option>
            ))}
          </select> */}
          <AsyncSelect onMenuClose={allUsersLoad} isClearable={true} loadOptions={loadOptions} defaultOptions={users} getOptionLabel={(value)=>value.name ?? ''} getOptionValue={(value)=>value.id ?? ''} />
          <div className="invalid-feedback  text-black">{errors.userid?.message}</div>
        </div>
  
        {/* Titulo */}
        <div>
          <label htmlFor="title" className="label text-black">Título</label>
          <input className="input input-bordered w-full"
            id="title"
            aria-invalid={errors.title ? "true" : "false"}
            {...register("title", { required: true })}
          />
           <div className="invalid-feedback text-black">{errors.title?.message}</div>
        </div>
  
        {/* Body */}
        <div>
          <label htmlFor="body" className="label text-black">Body</label>
          <input className="input input-bordered w-full"
            id="body"
            aria-invalid={errors.body ? "true" : "false"}
            {...register("body", { required: true })}
          />
           <div className="invalid-feedback  text-black">{errors.body?.message}</div>
        </div>

         {/* Valor monetario de ejemplo */}
         <div>
          <label htmlFor="amount" className="label text-black">Valor Monetario</label>
          <div id="amount" className="text-black">
             {t('currencyFormat', { value: exampleAmount, number: 'number' })} 
         </div>
        </div>
  
        {/* Botón de envío */}
       {/*  <div>
          <input type="submit" className="btn btn-success w-full" />
        </div> */}
        <Button
            onClick={handleSubmit(onSubmit)}
            color="primary"
        >
            Register {/* texto del botón */}
            <CheckIcon className="ml-2 h-5 w-5 text-white" /> {/* ícono con margen y tamaño */}
        </Button>
      </div>
    </form>
  );
  
}

export default PostFormYup