import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'

import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { uploadVideo } from '../services/fetchvideos';


const Uploadvideo = () => {

const { register, handleSubmit, formState: { errors }, setValue } = useForm();

const navigate = useNavigate()
const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: (data) => uploadVideo(data),
  onSuccess: () => {
   
    queryClient.invalidateQueries({ queryKey: ["videos"] })
    navigate("/")
  }
})



function onSubmit(data){
  const formData = new FormData()
  formData.append("title", data.title)
  formData.append("description", data.description)
  formData.append("category", data.category)
  if(data.thumbnail){
    formData.append("thumbnail", data.thumbnail[0])
  }
  if(data.upload_video){
    formData.append("upload_video", data.upload_video[0])
  }
  

  mutation.mutate(formData)
}


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Video</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            id="title"
            {...register("title",{required: "Video title is required"})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter video title"
          />
          {errors?.title?.message && <small className='text-red-600'>{errors.title.message}</small>}
        </div>

        
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            rows="8"            
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter video description"
            id="description"
            {...register("description",{required: "Video description is required"})}
          />
          {errors?.description?.message && <small className='text-red-600'>{errors.description.message}</small>}
        </div>

        
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select id="category"
            {...register("category",{required: "Video category is required"})}  onChange={(e) => setValue("category", e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select a category</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Vlog</option>
            <option value="news">Tech</option>
            <option value="other">Others</option>
          </select>
          {errors?.category?.message && <small className='text-red-600'>{errors.category.message}</small>}
        </div>

        <div>
          <label className="block font-medium mb-1">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            id="thumbnail"
            {...register("thumbnail", {
              required: "Video thumbnail is required",
            })}
            className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white file:rounded-lg hover:file:bg-blue-700"
          />
          {errors?.thumbnail?.message && <small className='text-red-600'>{errors.thumbnail.message}</small>}
        </div>

        
        <div>
          <label className="block font-medium mb-1">Video File</label>
          <input
            type="file"
            accept="video/*"
            id="upload_video"
            {...register("upload_video", {
              required: "Video is required",
            })}
            className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-green-600 file:text-white file:rounded-lg hover:file:bg-green-700"
          />
          {errors?.upload_video?.message && <small className='text-red-600'>{errors.upload_video.message}</small>}
        </div>

       
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="private" className="w-5 h-5" />
          <label htmlFor="private" className="text-gray-700">
            Private
          </label>
        </div>

        
        <div className="text-center">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-200"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default Uploadvideo;