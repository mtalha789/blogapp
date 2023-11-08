import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import  appwriteService  from '../../appwrite/config'
import { useSelector } from 'react-redux'
import { RealTimeEditor,Input,Button,Select } from '../'
import { useNavigate } from 'react-router-dom'



export default function PostForm({post}) {
    const { register,handleSubmit,control,setValue,getValues,watch } = useForm({
        defaultValues:{
            title : post?.title || "",
            slug : post?.$id || "",
            content : post?.content || "",
            status :post?.status || "active"
        }
    })
    const navigate = useNavigate()
    const userData = useSelector((state)=>state.userData)

    const slugTransform=useCallback((slug)=>{
        if(slug && typeof slug === 'string')
            return slug
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d]+/g, "-")
        return ''
    },[])

    const submit =async(data)=>{
        if(post){
            const file = data.image[0]? await appwriteService.uploadFile(data.image[0]) :null;
            if(file){
                await appwriteService.deleteFile(post.image)
            }
            const dbPost = await appwriteService.updatePost(post.$id,{
                ...data,
                image: file?file.$id:undefined
            })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }else{
            const file = await appwriteService.uploadFile(data.image[0])
            if(file){
                data.image = file.$id
                const dbPost =await appwriteService.createPost({
                    ...data,
                    userid:userData.$id
                })
                if (dbPost)
                navigate(`/post/${dbPost.$id}`)
            }
        }
    }

    React.useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title),{shouldValidate:true})
            }
        });
        return ()=>subscription.unsubscribe();
        
    },[slugTransform,setValue,watch])

  return (
    <>
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
        <div className="w-2/3 px-2">
            <Input
            label ='Title'
            placeholder = 'Title'
            {...register('title',{required:true})}
            />
            <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
            <RealTimeEditor 
            label='Content :'
            control={control} 
            name="content"
            defaultValue={getValues('content')}
            />
        </div>
        <div className="w-1/3 px-2">
            <Input
            label='Featured Image :'
            type='file'
            accept='image/png, image/jpg, image/jpeg, image/gif'
            {...register('image',{required:!post})}
            />
            {
                post && (
                    <div className="w-full-mb-4">
                        <img src={appwriteService.getFilePreview(post.image)}
                        alt={post.title}
                        />
                    </div>
                )
            }

            <Select
            options = {['active','inactive']}
            label = 'Status :'
            {...register('status')}
            />
            <Button  type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post? 'Update' :'Submit'}
            </Button>
        </div>
      </form>
    </>
  )
}
