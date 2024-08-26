// import { useEffect, useState } from "react"

// export const useHttpGet = url => {
//     const [loading, setLoading] = useState(true)
//     const [result, setResult] = useState(null)

//     useEffect(() => {

//         fetch(url)
//         .then(res => res.json())
//         .then(data => setResult(data))
//         .finally(() => setLoading(false))

//     }, [])s

//     return [loading, result]

// }

// export const useForm = () => {
//     const [values, setValues] = useState({})
//     const [errors, setErrors] = useState({})
//     const rules = {}

//     const handleSubmit = callback => event =>  {
//         event.preventDefault()

//         let temp = {...errors}
//         for(let key in  rules){
//             if(rules[key].required && (!values[key] || !values[key].trim()) ){
//                 temp[key] = rules[key].required
//             }else{
//                 delete temp[key]
//             }
//         }

//         setErrors(temp)

//         if(Object.keys(temp).length == 0){
//             callback(values)
//         }
//     }

//     const register = (key, options = {}) => {
//         rules[key] = options
//         return {
//             value: values[key] || '',
//             onChange: e => setValues({...values, [key]: e.target.value})

//         }
//     }

//     return {handleSubmit, register, errors}
// }

import { useState } from "react";

type Values = {
  [key: string]: any;
};

type Errors = {
  [key: string]: string;
};

type RuleOptions = {
  required?: string;
};

type Rules = {
  [key: string]: RuleOptions;
};

type RegisterReturn = {
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const useForm = () => {
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Errors>({});
  const rules: Rules = {};

  const handleSubmit =
    (callback: (values: Values) => void) => (event: React.FormEvent) => {
      event.preventDefault();

      let tempErrors: Errors = { ...errors };
      for (let key in rules) {
        if (rules[key].required && (!values[key] || !values[key].trim())) {
          tempErrors[key] = rules[key].required!;
        } else {
          delete tempErrors[key];
        }
      }

      setErrors(tempErrors);

      if (Object.keys(tempErrors).length === 0) {
        callback(values);
      }
    };

  const register = (key: string, options: RuleOptions = {}): RegisterReturn => {
    rules[key] = options;
    return {
      value: values[key] || "",
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => setValues({ ...values, [key]: e.target.value }),
    };
  };

  return { handleSubmit, register, errors };
};
